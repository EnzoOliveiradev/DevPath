'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react';
import type { SupabaseClient, User } from '@supabase/supabase-js';
import {
  ArrowRight, BarChart3, BookOpen, CalendarClock, CalendarDays, Check, CheckCircle2, ChevronRight,
  Clock3, Compass, ExternalLink, Flag, GraduationCap, LayoutDashboard, Library, ListChecks, LogOut,
  Menu, Plus, RotateCcw, Sparkles, Target, X
} from 'lucide-react';
import { addDays, currentPhase, intervalFromRecall, phaseProgress, planDay, streakDays, todayInSaoPaulo } from '@/lib/planner';
import { TRACKS, type StudyMode, type StudySession, type StudyTopic, type Track } from '@/lib/model';
import { supabaseClient } from '@/lib/supabase';
import { guideFor } from '@/lib/exercises';
import { accuracy } from '@/lib/guided';
import { PHASES, TRAIL, catalogRows, phaseById, planTrailSync, upcomingClasses, weeklyReading, type Book, type ReadingStatus } from '@/lib/trail';
import { GuidedSession, type GuidedResult } from './guided-session';
import { PdfReader } from './pdf-reader';
import { TrailView, type PhaseFilter } from './trail-view';
import { LibraryView, WeeklyReadingCard } from './library-view';
import { IconTrack, dateTitle, niceDate, phaseLabel } from './ui';

type Tab = 'today' | 'tracks' | 'library' | 'history' | 'insights';
const NAV: {id:Tab;title:string;icon:typeof LayoutDashboard}[] = [
  {id:'today',title:'Meu dia',icon:LayoutDashboard},
  {id:'tracks',title:'Trilha de estudos',icon:BookOpen},
  {id:'library',title:'Biblioteca',icon:Library},
  {id:'history',title:'Histórico',icon:CalendarDays},
  {id:'insights',title:'Evolução',icon:BarChart3}
];

// Banco ainda sem as migrações: indica qual arquivo SQL executar.
const MIGRATION_HINTS: [RegExp, string][] = [
  [/\b(code|phase|kind|optional|practice|evidence|prerequisite_codes|class_on|reading_progress|study_topics_user_code_key)\b/, 'supabase/v3_trilha.sql'],
  [/\b(source|correct_count|total_count|exercise_attempts)\b/, 'supabase/v2_guided_sessions.sql']
];
function errorMessage(e: unknown, fallback: string): string {
  const message = typeof e === 'object' && e !== null && 'message' in e ? String((e as {message: unknown}).message) : '';
  if (!message) return fallback;
  if (/column|relation|schema cache|does not exist|not find|no unique|constraint matching/i.test(message)) {
    const hint = MIGRATION_HINTS.find(([pattern]) => pattern.test(message));
    if (hint) return `${message} — execute ${hint[1]} no SQL Editor do Supabase.`;
  }
  return message;
}

/** Cria/atualiza os 160 itens da trilha 2.1 sem tocar em status e revisões. */
async function syncTrail(db: SupabaseClient, userId: string, existing: StudyTopic[]): Promise<boolean> {
  const plan = planTrailSync(existing);
  if (!plan.needsUpsert && plan.adopt.length === 0) return false;
  for (const { id, code } of plan.adopt) {
    const { error } = await db.from('study_topics').update({ code }).eq('id', id);
    if (error) throw error;
  }
  const { error } = await db.from('study_topics').upsert(catalogRows(userId), { onConflict: 'user_id,code' });
  if (error) throw error;
  return true;
}

function AuthScreen({onReady}:{onReady:()=>void}) {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [signUp,setSignUp] = useState(false);
  const [busy,setBusy] = useState(false);
  const [message,setMessage] = useState('');
  async function submit(event:FormEvent) {
    event.preventDefault(); setBusy(true);setMessage('');
    try {
      const client = supabaseClient();
      if(signUp){
        const {data,error}=await client.auth.signUp({email,password});
        if(error) throw error;
        setMessage(data.session ? 'Conta criada. Abrindo seu painel...' : 'Conta criada! Confira seu e-mail para confirmar o cadastro, se a confirmação estiver ativada.');
        if(data.session) onReady();
      }else{
        const {error}=await client.auth.signInWithPassword({email,password});
        if(error) throw error;
        onReady();
      }
    }catch(err){setMessage(err instanceof Error?err.message:'Não foi possível autenticar.');}
    finally{setBusy(false);}
  }
  return <main className="auth-shell"><section className="auth-card">
    <div className="brand-logo large"><GraduationCap size={25}/></div>
    <div className="eyebrow">SEU AMBIENTE DE APRENDIZAGEM</div>
    <h1>Estude com direção.<br/><span>Progrida com evidências.</span></h1>
    <p>Uma trilha clara para programação e pós-graduação, construída para desenvolver sua autonomia.</p>
    <form onSubmit={submit} className="auth-form">
      <label>E-mail<input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="voce@exemplo.com"/></label>
      <label>Senha<input required minLength={6} type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Mínimo de 6 caracteres"/></label>
      <button disabled={busy} className="btn primary full" type="submit">{busy?'Aguarde...':signUp?'Criar minha conta':'Entrar no meu painel'} <ArrowRight size={17}/></button>
    </form>
    {message&&<p className="form-message" role="status">{message}</p>}
    <button className="text-button" onClick={()=>{setSignUp(!signUp);setMessage('')}}>{signUp?'Já tenho conta. Entrar':'Primeiro acesso? Criar conta'}</button>
    <div className="auth-foot">Seus dados ficam na sua conta Supabase, protegidos por RLS.</div>
  </section></main>;
}

export default function Page(){
  const db=useMemo(()=>{try{return supabaseClient()}catch{return null}},[]);
  const [configError,setConfigError]=useState('');
  const [user,setUser]=useState<User|null>(null);
  const userId = user?.id;
  const [authReady,setAuthReady]=useState(false);
  const [tab,setTab]=useState<Tab>('today');
  const [dailyBudget,setDailyBudget]=useState(60);
  const [mobileMenu,setMobileMenu]=useState(false);
  const [topics,setTopics]=useState<StudyTopic[]>([]);
  const [sessions,setSessions]=useState<StudySession[]>([]);
  const [readingProgress,setReadingProgress]=useState<Map<string,ReadingStatus>>(()=>new Map());
  const [readingReady,setReadingReady]=useState(false);
  const [readerBook,setReaderBook]=useState<Book|null>(null);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState('');
  const synced=useRef(false);
  const [studyTopic,setStudyTopic]=useState<StudyTopic|null>(null);
  const [studyMode,setStudyMode]=useState<StudyMode>('learn');
  const [duration,setDuration]=useState(25);
  const [recall,setRecall]=useState(3);
  const [autonomy,setAutonomy]=useState(1);
  const [notes,setNotes]=useState('');
  const [saving,setSaving]=useState(false);
  const [guidedTopic,setGuidedTopic]=useState<StudyTopic|null>(null);
  const [guidedError,setGuidedError]=useState('');
  const [addOpen,setAddOpen]=useState(false);
  const [newTrack,setNewTrack]=useState<Track>('JavaScript');
  const [newTitle,setNewTitle]=useState('');
  const [newDescription,setNewDescription]=useState('');
  const [newDue,setNewDue]=useState('');
  const [newPriority,setNewPriority]=useState(2);
  const [phaseFilter,setPhaseFilter]=useState<PhaseFilter>('all');
  const [trackFilter,setTrackFilter]=useState<Track|'Todas'>('Todas');
  const today=todayInSaoPaulo();

  useEffect(()=>{
    if(!db){setConfigError('Configuração ausente: copie .env.example para .env.local e informe URL + chave publicável do Supabase.');setLoading(false);return;}
    db.auth.getUser().then(({data,error})=>{if(error&&error.name!=='AuthSessionMissingError')setError(error.message);setUser(data.user);setAuthReady(true)});
    const {data:listener}=db.auth.onAuthStateChange((_event,session)=>{setUser(session?.user??null);setAuthReady(true)});
    return ()=>listener.subscription.unsubscribe();
  },[db]);

  const refresh=useCallback(async ()=>{
    if(!db||!userId)return;
    setLoading(true);setError('');
    try{
      const loadTopics=async()=>{
        const {data,error}=await db.from('study_topics').select('*').order('sort_order',{ascending:true});
        if(error)throw error;
        return (data??[]) as StudyTopic[];
      };
      const [list,{data:activity,error:sErr},{data:reading,error:rErr}] = await Promise.all([
        loadTopics(),
        db.from('study_sessions').select('*').order('studied_on',{ascending:false}).limit(400),
        db.from('reading_progress').select('item_id,status')
      ]);
      if(sErr)throw sErr;
      let current=list;
      if(!synced.current){
        synced.current=true;
        try{ if(await syncTrail(db,userId,list)) current=await loadTopics(); }
        catch(e){ setError('Não foi possível carregar a trilha 2.1: '+errorMessage(e,'erro desconhecido')); }
      }
      setTopics(current);
      setSessions((activity??[]) as StudySession[]);
      if(rErr){ setReadingReady(false); }
      else { setReadingReady(true); setReadingProgress(new Map((reading??[]).map(r=>[r.item_id as string, r.status as ReadingStatus]))); }
    }catch(e){setError(errorMessage(e,'Não foi possível buscar o conteúdo.'));}
    finally{setLoading(false);}
  },[db,userId]);
  useEffect(()=>{if(userId){synced.current=false;void refresh()}else{setTopics([]);setSessions([])}},[userId,refresh]);

  const plan=useMemo(()=>planDay(topics,today,3,dailyBudget),[topics,today,dailyBudget]);
  const phaseNow=useMemo(()=>currentPhase(topics),[topics]);
  const progressByPhase=useMemo(()=>phaseProgress(topics),[topics]);
  const weekly=useMemo(()=>weeklyReading(phaseNow,readingProgress),[phaseNow,readingProgress]);
  const classes=upcomingClasses(today,2);
  const completed=topics.filter(t=>t.status==='done').length;
  const last7=sessions.filter(s=>s.studied_on>=addDays(today,-6)&&s.studied_on<=today);
  const daysStudied=new Set(last7.map(s=>s.studied_on)).size;
  const weeklyMinutes=last7.reduce((sum,s)=>sum+s.duration_minutes,0);
  const recentAverage=last7.length ? (last7.reduce((sum,s)=>sum+s.recall_score,0)/last7.length).toFixed(1):'—';
  const streak=streakDays(sessions,today);
  const guidedAccuracy=accuracy(last7.filter(s=>s.source==='guided'));
  const guidedLast7=last7.filter(s=>s.source==='guided').length;
  const dueReviews=topics.filter(t=>t.next_review_on && t.next_review_on<=today).length;

  async function toggleComplete(topic:StudyTopic){
    if(!db)return;
    const next=topic.status==='done'?'in_progress':'done';
    const {error}=await db.from('study_topics').update({status:next, next_review_on: next==='done' ? (topic.next_review_on??addDays(today,3)) : topic.next_review_on}).eq('id',topic.id);
    if(error)setError(error.message);else await refresh();
  }
  function startStudy(topic:StudyTopic){
    setStudyTopic(topic);setDuration(topic.estimated_minutes);setStudyMode(topic.next_review_on&&topic.next_review_on<=today?'review':'learn');
    setRecall(3);setAutonomy(1);setNotes('');setError('');
  }
  async function saveSession(event:FormEvent){
    event.preventDefault();if(!db||!user||!studyTopic)return;setSaving(true);setError('');
    try{
      const {error:insertError}=await db.from('study_sessions').insert({
        user_id:user.id,topic_id:studyTopic.id,studied_on:today,duration_minutes:duration,mode:studyMode,
        recall_score:recall,autonomy_level:autonomy,notes
      });
      if(insertError)throw insertError;
      const {error:updateError}=await db.from('study_topics').update({
        status:studyTopic.status==='todo'?'in_progress':studyTopic.status,
        next_review_on:addDays(today,intervalFromRecall(recall))
      }).eq('id',studyTopic.id);
      setStudyTopic(null);
      if(updateError)setError('A sessão foi registrada, mas a data da próxima revisão não foi atualizada: '+updateError.message);
      await refresh();
    }catch(e){setError(errorMessage(e,'Falha ao salvar a sessão.'));}
    finally{setSaving(false);}
  }
  function startGuided(topic:StudyTopic){setGuidedTopic(topic);setGuidedError('');setError('');}
  async function saveGuided(result:GuidedResult){
    if(!db||!user||!guidedTopic)return;
    const topic=guidedTopic;
    setSaving(true);setGuidedError('');
    try{
      const reviewing=Boolean(topic.next_review_on&&topic.next_review_on<=today);
      const {data:session,error:insertError}=await db.from('study_sessions').insert({
        user_id:user.id,topic_id:topic.id,studied_on:today,duration_minutes:result.durationMinutes,
        mode:reviewing?'review':'practice',recall_score:result.score.recall,autonomy_level:result.score.autonomy,
        notes:result.notes,source:'guided',correct_count:result.score.correct,total_count:result.score.total
      }).select('id').single();
      if(insertError)throw insertError;
      const problems:string[]=[];
      if(result.outcomes.length){
        const {error:attemptsError}=await db.from('exercise_attempts').insert(result.outcomes.map(o=>({
          user_id:user.id,session_id:session.id,topic_id:topic.id,exercise_id:o.exerciseId,kind:o.kind,correct:o.correct,
          hints_used:Math.min(10,o.hintsUsed),solution_viewed:o.solutionViewed,answer:o.answer.slice(0,20000)
        })));
        if(attemptsError)problems.push('as respostas dos exercícios ('+errorMessage(attemptsError,'erro desconhecido')+')');
      }
      const {error:updateError}=await db.from('study_topics').update({
        status:topic.status==='todo'?'in_progress':topic.status,
        next_review_on:addDays(today,intervalFromRecall(result.score.recall))
      }).eq('id',topic.id);
      if(updateError)problems.push('a próxima revisão ('+updateError.message+')');
      setGuidedTopic(null);
      if(problems.length)setError('A sessão guiada foi registrada, mas não foi possível salvar '+problems.join(' e ')+'.');
      await refresh();
    }catch(e){setGuidedError(errorMessage(e,'Falha ao salvar a sessão guiada.'));}
    finally{setSaving(false);}
  }
  async function createTopic(event:FormEvent){
    event.preventDefault();if(!db||!user||!newTitle.trim())return;setSaving(true);setError('');
    const {error}=await db.from('study_topics').insert({
      user_id:user.id,track:newTrack,title:newTitle.trim(),description:newDescription.trim(),priority:newPriority,
      sort_order:(topics.reduce((n,t)=>Math.max(n,t.sort_order),0)+1), estimated_minutes:25,due_on:newDue||null
    });
    setSaving(false);
    if(error){setError(errorMessage(error,'Não foi possível criar o assunto.'));return;}
    setAddOpen(false);setNewTitle('');setNewDescription('');setNewDue('');await refresh();
  }
  async function setReading(itemId:string,status:ReadingStatus|null){
    if(!db||!user)return;
    const previous=readingProgress;
    const next=new Map(previous);
    if(status)next.set(itemId,status);else next.delete(itemId);
    setReadingProgress(next);
    const {error}=status
      ? await db.from('reading_progress').upsert({user_id:user.id,item_id:itemId,status,updated_at:new Date().toISOString()},{onConflict:'user_id,item_id'})
      : await db.from('reading_progress').delete().eq('user_id',user.id).eq('item_id',itemId);
    if(error){setReadingProgress(previous);setError(errorMessage(error,'Não foi possível salvar a leitura.'));}
  }
  function openPhase(phase:number){setPhaseFilter(phase);setTrackFilter('Todas');setTab('tracks');}
  async function logout(){if(db)await db.auth.signOut();setUser(null);}

  if(configError)return <main className="config-error"><h1>DevPath — configuração inicial</h1><p>{configError}</p><code>cp .env.example .env.local</code><p>Confira o README.md.</p></main>;
  if(!authReady)return <div className="splash">Preparando seu espaço de estudos...</div>;
  if(!user)return <AuthScreen onReady={()=>setTab('today')}/>;

  const phaseInfo=phaseById(phaseNow);
  const phaseStats=progressByPhase.find(p=>p.phase===phaseNow);

  return <div className="app-shell">
    <aside className={`sidebar ${mobileMenu?'open':''}`}>
      <div className="brand"><div className="brand-logo"><GraduationCap size={22}/></div><div><b>devpath<span className="brand-point">.</span></b><small>STUDY WORKSPACE</small></div></div>
      <div className="side-label">ESPAÇO DE TRABALHO</div>
      <nav>{NAV.map(n=><button key={n.id} onClick={()=>{setTab(n.id);setMobileMenu(false)}} className={`nav-link ${tab===n.id?'active':''}`}><n.icon size={18}/>{n.title}{tab===n.id&&<ChevronRight className="push-right" size={15}/>}</button>)}</nav>
      <div className="side-label side-label-lower">SUAS ÁREAS</div>
      <div className="sidebar-tracks">{TRACKS.filter(track=>topics.some(t=>t.track===track)).map(track=><button key={track} onClick={()=>{setTrackFilter(track);setPhaseFilter('all');setTab('tracks');setMobileMenu(false)}}><IconTrack track={track}/><span>{track}</span><small>{topics.filter(t=>t.track===track&&t.status==='done').length}/{topics.filter(t=>t.track===track).length}</small></button>)}</div>
      <div className="sidebar-bottom"><div className="sidebar-note"><Sparkles size={16}/><strong>{phaseInfo?`${phaseLabel(phaseInfo.id)}: seu foco agora`:'Seu foco agora'}</strong><p>{phaseInfo?phaseInfo.title:'Pequenos avanços, consistência e raciocínio independente.'}</p></div><button className="profile-button" onClick={logout}><div className="avatar">{(user.email??'D').slice(0,1).toUpperCase()}</div><span><b>Minha conta</b><small>{user.email}</small></span><LogOut size={17}/></button></div>
    </aside>
    <main className="workspace">
      <header className="topbar"><button className="mobile-toggle" onClick={()=>setMobileMenu(v=>!v)} aria-label="Abrir menu"><Menu size={21}/></button><span className="breadcrumb">Meu workspace <ChevronRight size={14}/> <strong>{NAV.find(n=>n.id===tab)?.title}</strong></span><span className="topbar-right"><span className="online-dot"/>Trilha {TRAIL.version} · dados no Supabase</span></header>
      <div className="page-container">
        {error&&<div className="error-banner" role="alert"><span>{error}</span><button onClick={()=>setError('')} aria-label="Fechar alerta"><X size={17}/></button></div>}
        {loading&&topics.length===0?<div className="loading-state">Carregando seu plano de estudos...</div>:<>
          {tab==='today'&&<>
            <section className="page-heading"><div><div className="eyebrow">{dateTitle(today).toUpperCase()}</div><h1>Seu próximo passo começa <span>hoje.</span></h1><p>Uma tarefa de cada vez. Foque em aprender, não apenas concluir.</p></div><button onClick={()=>{setAddOpen(true)}} className="btn secondary"><Plus size={18}/> Novo assunto</button></section>
            <div className="metric-grid">
              <Metric icon={<Target size={19}/>} label="Sessões esta semana" value={`${daysStudied} / 5`} sub="dias com estudo" tone="blue"/>
              <Metric icon={<Clock3 size={19}/>} label="Tempo estudado" value={`${weeklyMinutes} min`} sub="últimos 7 dias" tone="purple"/>
              <Metric icon={<RotateCcw size={19}/>} label="Revisões pendentes" value={String(dueReviews)} sub="revisar é aprender" tone="orange"/>
              <Metric icon={<CheckCircle2 size={19}/>} label="Conteúdos concluídos" value={`${completed} / ${topics.length}`} sub="trilha, pós e personalizados" tone="green"/>
            </div>
            <section className="content-two-col"><div>
              <div className="section-heading"><div><div className="eyebrow">PLANO INTELIGENTE</div><h2>O que estudar hoje</h2></div><div className="budget-switch" aria-label="Tempo disponível hoje">{[30,60,90].map(n=><button key={n} className={dailyBudget===n?"selected":""} onClick={()=>setDailyBudget(n)}>{n} min</button>)}</div></div>
              <div className="task-list">{plan.length?plan.map(({topic,reason},i)=>{const guide=guideFor(topic);return <div className="task-card" key={topic.id}>
                <div className="task-index">{String(i+1).padStart(2,'0')}</div><div className="task-content"><div className="task-meta">{topic.code&&<span className="code-chip">{topic.code}</span>}<span className="topic-category"><IconTrack track={topic.track}/>{topic.track}</span><span className={`reason-pill ${reason==='Entrega próxima'?'urgent':reason==='Desafio de saída'?'gate':reason==='Pós em paralelo'?'pos':''}`}>{reason}</span></div><h3>{topic.title}</h3><p>{topic.description}</p>{topic.practice&&<p className="task-practice"><b>Prática:</b> {topic.practice}</p>}<div className="task-foot"><span><Clock3 size={14}/>{topic.estimated_minutes} minutos</span>{topic.due_on&&<span><CalendarDays size={14}/>Entrega {niceDate(topic.due_on)}</span>}{topic.class_on&&<span><CalendarClock size={14}/>Aula {niceDate(topic.class_on)}</span>}{topic.resource_url&&<a href={topic.resource_url} target="_blank" rel="noopener noreferrer">Material <ExternalLink size={13}/></a>}</div></div>
                <div className="task-actions">{guide?<><button className="btn primary small" onClick={()=>startGuided(topic)}>Sessão guiada <ArrowRight size={15}/></button><button className="btn secondary small" onClick={()=>startStudy(topic)}>Registrar</button></>:<button className="btn primary small" onClick={()=>startStudy(topic)}>Estudar <ArrowRight size={15}/></button>}<button className="btn-icon" onClick={()=>toggleComplete(topic)} title={topic.status==='done'?'Reabrir':'Marcar como concluído'} aria-label={topic.status==='done'?'Reabrir':'Marcar como concluído'}><Check size={16}/></button></div>
              </div>}):<div className="empty-state">Tudo em dia! Adicione um novo tópico para continuar.</div>}</div>
              <div className="section-footnote"><Sparkles size={16}/>Planejado: {plan.reduce((n,p)=>n+p.topic.estimated_minutes,0)} min. A ordem é: prazos em até 14 dias, revisões, assuntos em andamento, pós (terças, quintas e sábados) e o próximo conteúdo liberado da trilha. Uma entrega urgente pode ultrapassar seu limite.</div>
            </div><div className="right-panel">
              {phaseInfo&&phaseStats&&<div className="phase-card"><div className="eyebrow">{phaseLabel(phaseInfo.id).toUpperCase()} DE {PHASES.length}</div><h3>{phaseInfo.title}</h3><p>{phaseInfo.objective}</p><div className="progress-track"><span style={{width:`${phaseStats.total?(phaseStats.done/phaseStats.total)*100:0}%`}}/></div><div className="phase-card-foot"><span>{phaseStats.done}/{phaseStats.total} concluídos</span><span className={phaseStats.requiredLeft===0?'gate-open':''}><Flag size={13}/>{phaseStats.requiredLeft===0?'Desafio de saída liberado':`Faltam ${phaseStats.requiredLeft} para o desafio`}</span></div><button className="btn text small" onClick={()=>openPhase(phaseInfo.id)}>Abrir etapa <ArrowRight size={14}/></button></div>}
              <WeeklyReadingCard item={weekly} status={weekly?readingProgress.get(weekly.id):undefined} onSet={setReading} onRead={setReaderBook} ready={readingReady} today={today} onOpenLibrary={()=>setTab('library')}/>
              <div className="mini-panel"><div className="section-heading"><h3>Sua semana</h3><span className="muted-small">{daysStudied} de 5 dias</span></div><div className="week-row">{Array.from({length:7},(_,i)=>{const d=addDays(today,i-6);const active=last7.some(s=>s.studied_on===d);return <div key={d} className="week-day"><div className={`week-mark ${active?'marked':''}`}>{active?<Check size={16}/>:''}</div><span>{['D','S','T','Q','Q','S','S'][new Date(`${d}T12:00:00Z`).getUTCDay()]}</span></div>})}</div><div className="progress-track"><span style={{width:`${Math.min(100,daysStudied/5*100)}%`}}/></div><p className="mini-caption">Meta inicial: estudar em pelo menos 5 dias, sem obrigação de estudar horas seguidas.</p></div>
              {classes.length>0&&<div className="mini-panel"><h3>Próximas aulas da pós</h3><ul className="class-list">{classes.map(c=><li key={c.date}><span className="class-date">{niceDate(c.date)}</span><span>{c.title}<small>{c.time}</small></span></li>)}</ul></div>}
              <div className="quote-card"><div className="quote-icon"><Compass size={21}/></div><h3>Aprenda a pensar, não a copiar.</h3><p>Antes de pedir a solução à IA, tente prever, executar, investigar, modificar e reconstruir.</p><div className="quote-credit">MÉTODO PRIMM</div></div>
            </div></section>
            <section className="bottom-message"><div className="bottom-icon"><ListChecks size={21}/></div><div><strong>Você não precisa dominar tudo hoje.</strong><p>Precisa terminar uma sessão conseguindo explicar algo que antes não entendia.</p></div><button onClick={()=>setTab('insights')} className="btn text">Ver evolução <ArrowRight size={16}/></button></section>
          </>}
          {tab==='tracks'&&<TrailView topics={topics} phaseFilter={phaseFilter} setPhaseFilter={setPhaseFilter} trackFilter={trackFilter} setTrackFilter={setTrackFilter} onAdd={()=>setAddOpen(true)} onStudy={startStudy} onGuided={startGuided} onToggle={toggleComplete} onRead={setReaderBook}/>}
          {tab==='library'&&<LibraryView today={today} phase={phaseNow} weekly={weekly} progress={readingProgress} ready={readingReady} onSet={setReading} onRead={setReaderBook}/>}
          {tab==='history'&&<><section className="page-heading"><div><div className="eyebrow">REGISTRO DO APRENDIZADO</div><h1>Seu histórico de <span>estudos.</span></h1><p>Não acompanhe apenas o tempo. Observe o quanto consegue fazer sem ajuda.</p></div></section><div className="history-list">{sessions.length? sessions.slice(0,80).map(s=>{const topic=topics.find(t=>t.id===s.topic_id);return <div key={s.id} className="history-row"><div className="history-date"><strong>{niceDate(s.studied_on)}</strong><small>{s.mode==='review'?'Revisão':s.mode==='practice'?'Prática':'Aprendizado'}</small></div><div className="history-content"><strong>{topic?.code?`${topic.code} · `:''}{topic?.title??'Assunto excluído'}</strong>{s.source==='guided'&&<span className="guided-badge">Guiada · {s.correct_count??0}/{s.total_count??0} acertos</span>}<p>{s.notes||'Sessão registrada sem observações.'}</p></div><div className="history-metrics"><span><Clock3 size={14}/>{s.duration_minutes} min</span><span><Target size={14}/>Memória {s.recall_score}/5</span><span>Ajuda {s.autonomy_level}/3</span></div></div>}):<div className="empty-state">Seu histórico aparece aqui depois de registrar uma sessão.</div>}</div></>}
          {tab==='insights'&&<><section className="page-heading"><div><div className="eyebrow">INDICADORES DE APRENDIZAGEM</div><h1>Evolução com <span>evidências.</span></h1><p>Acompanhe constância, retenção e autonomia. Não confunda produtividade com aprendizado.</p></div></section>
            <div className="metric-grid"><Metric label="Dias estudados" icon={<CalendarDays size={19}/>} value={`${daysStudied}/7`} sub="últimos 7 dias" tone="blue"/><Metric label="Memória média" icon={<RotateCcw size={19}/>} value={`${recentAverage}/5`} sub="autoavaliação e exercícios" tone="purple"/><Metric label="Acerto nos exercícios" icon={<CheckCircle2 size={19}/>} value={guidedAccuracy===null?'—':`${Math.round(guidedAccuracy*100)}%`} sub={`${guidedLast7} sessão(ões) guiada(s) em 7 dias`} tone="green"/><Metric label="Sequência atual" icon={<Target size={19}/>} value={`${streak} dia(s)`} sub="sem metas punitivas" tone="orange"/></div>
            <div className="insight-grid"><div className="mini-panel insight-card"><h3>Atividade dos últimos 7 dias</h3><div className="bar-chart">{Array.from({length:7},(_,i)=>{const d=addDays(today,i-6);const minutes=last7.filter(s=>s.studied_on===d).reduce((sum,s)=>sum+s.duration_minutes,0);return <div key={d} className="bar-column"><span>{minutes||''}</span><div className="bar-bg"><div style={{height:`${Math.min(100,minutes/90*100)}%`}}/></div><small>{niceDate(d)}</small></div>})}</div><p className="mini-caption">Altura relativa a uma referência de 90 minutos/dia. Não é uma meta obrigatória.</p></div>
              <div className="mini-panel insight-card"><h3>Autonomia nas sessões</h3><p className="panel-copy">Nível 0 = independente • 1 = documentação • 2 = dicas da IA • 3 = solução pronta.</p><div className="autonomy-grid">{[0,1,2,3].map(level=><div key={level}><strong>{sessions.filter(s=>s.autonomy_level===level).length}</strong><span>Nível {level}</span></div>)}</div><h3 className="subheading">Como interpretar</h3><p className="panel-copy">Procure melhorar a qualidade das explicações e aumentar a proporção de sessões nos níveis 0 e 1. Uma sessão com ajuda não é fracasso.</p></div>
            </div>
            {progressByPhase.length>0&&<div className="mini-panel phase-overview"><div className="section-heading"><h3>Progresso por etapa</h3><span className="muted-small">{progressByPhase.filter(p=>p.completed).length} de {PHASES.length} etapas concluídas</span></div>{progressByPhase.map(p=>{const info=phaseById(p.phase);return <button key={p.phase} className="phase-overview-row" onClick={()=>openPhase(p.phase)}><span className="phase-number small">{String(p.phase).padStart(2,'0')}</span><span className="phase-overview-title">{info?.title}</span><span className="progress-track"><span style={{width:`${p.total?(p.done/p.total)*100:0}%`}}/></span><small>{p.done}/{p.total}</small></button>})}</div>}
            <section className="bottom-message"><div className="bottom-icon"><BarChart3 size={21}/></div><div><strong>Acompanhe também seu teste de 7 dias.</strong><p>Compare códigos inéditos de dificuldade equivalente e avalie compreensão, capacidade de modificar e independência.</p></div></section>
          </>}
        </>}
      </div>
    </main>
    {studyTopic&&<div className="overlay" onClick={()=>!saving&&setStudyTopic(null)}><div className="modal" role="dialog" aria-modal="true" aria-label="Registrar estudo" onClick={e=>e.stopPropagation()}><div className="modal-head"><div><div className="eyebrow">REGISTRAR APRENDIZAGEM{studyTopic.code?` · ${studyTopic.code}`:''}</div><h2>{studyTopic.title}</h2></div><button className="btn-icon" onClick={()=>setStudyTopic(null)} aria-label="Fechar"><X size={20}/></button></div>{studyTopic.practice&&<p className="modal-practice"><b>Prática sugerida:</b> {studyTopic.practice}</p>}<p className="modal-explain">Ao final, avalie sua memória sem consultar o material. Isso determinará a próxima revisão.</p><form className="modal-form" onSubmit={saveSession}>
      <label>Tipo de sessão<select value={studyMode} onChange={e=>setStudyMode(e.target.value as StudyMode)}><option value="learn">Aprendizado</option><option value="practice">Prática independente</option><option value="review">Revisão ativa</option></select></label>
      <label>Duração real (minutos)<input type="number" min={1} max={240} required value={duration} onChange={e=>setDuration(Number(e.target.value))}/></label>
      <label>Memória sem consulta: {recall}/5<input type="range" min={0} max={5} value={recall} onChange={e=>setRecall(Number(e.target.value))}/><small>0 = não lembro • 3 = lembro parte • 5 = explico e aplico</small></label>
      <label>Nível de ajuda<select value={autonomy} onChange={e=>setAutonomy(Number(e.target.value))}><option value={0}>0 — Resolvi sozinho</option><option value={1}>1 — Usei documentação</option><option value={2}>2 — Recebi dicas da IA</option><option value={3}>3 — Precisei da solução pronta</option></select></label>
      <label>O que aprendeu e onde travou?<textarea rows={3} placeholder="Ex.: consegui explicar o filter; ainda confundo map com reduce." value={notes} onChange={e=>setNotes(e.target.value)}/></label>
      <div className="review-preview"><RotateCcw size={16}/><span>Próxima revisão sugerida: <strong>{niceDate(addDays(today,intervalFromRecall(recall)))}</strong></span></div><button type="submit" disabled={saving} className="btn primary full">{saving?'Salvando...':'Salvar sessão de estudo'} <Check size={17}/></button></form></div></div>}
    {readerBook&&<PdfReader key={readerBook.id} book={readerBook} onClose={()=>setReaderBook(null)}/>}
    {guidedTopic&&(()=>{const guide=guideFor(guidedTopic);return guide?<GuidedSession topic={guidedTopic} guide={guide} today={today} saving={saving} saveError={guidedError} onClose={()=>setGuidedTopic(null)} onSave={saveGuided}/>:null})()}
    {addOpen&&<div className="overlay" onClick={()=>!saving&&setAddOpen(false)}><div className="modal" role="dialog" aria-modal="true" aria-label="Novo assunto" onClick={e=>e.stopPropagation()}><div className="modal-head"><div><div className="eyebrow">PERSONALIZAR TRILHA</div><h2>Novo assunto</h2></div><button className="btn-icon" onClick={()=>setAddOpen(false)} aria-label="Fechar"><X size={20}/></button></div><p className="modal-explain">Assuntos personalizados ficam fora das etapas e entram no plano do dia quando têm prazo ou estão em andamento.</p><form className="modal-form" onSubmit={createTopic}>
      <label>Área<select value={newTrack} onChange={e=>setNewTrack(e.target.value as Track)}>{TRACKS.map(t=><option key={t}>{t}</option>)}</select></label>
      <label>Título<input maxLength={160} required value={newTitle} onChange={e=>setNewTitle(e.target.value)} placeholder="Ex.: Middleware e autenticação JWT"/></label>
      <label>Objetivo<textarea rows={3} value={newDescription} onChange={e=>setNewDescription(e.target.value)} placeholder="Qual competência quero desenvolver?"/></label>
      <label>Prazo (opcional)<input type="date" value={newDue} onChange={e=>setNewDue(e.target.value)}/></label>
      <label>Prioridade<select value={newPriority} onChange={e=>setNewPriority(Number(e.target.value))}><option value={1}>Baixa</option><option value={2}>Normal</option><option value={3}>Alta</option></select></label>
      <button type="submit" disabled={saving} className="btn primary full">{saving?'Adicionando...':'Adicionar'} <Plus size={17}/></button></form></div></div>}
  </div>;
}

function Metric({icon,label,value,sub,tone}:{icon:ReactNode;label:string;value:string;sub:string;tone:string}){
  return <div className="metric-card"><div className={`metric-icon ${tone}`}>{icon}</div><div className="metric-title">{label}</div><div className="metric-value">{value}</div><div className="metric-sub">{sub}</div></div>;
}
