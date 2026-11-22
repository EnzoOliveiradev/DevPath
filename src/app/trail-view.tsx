'use client';

import { useMemo, useState } from 'react';
import { BookMarked, Check, CheckCircle2, ChevronDown, ExternalLink, Flag, Lock, Plus, Search } from 'lucide-react';
import { TRACKS, type StudyTopic, type Track } from '@/lib/model';
import { PHASES, bookById, bookUrl, readingForTopic } from '@/lib/trail';
import { codeIndex, currentPhase, isUnlocked, phaseProgress, type PhaseProgress } from '@/lib/planner';
import { guideFor } from '@/lib/exercises';
import { IconTrack, niceDate, phaseLabel, statusText } from './ui';

export type PhaseFilter = 'all' | 'pos' | 'custom' | number;

interface Handlers {
  onStudy: (t: StudyTopic) => void;
  onGuided: (t: StudyTopic) => void;
  onToggle: (t: StudyTopic) => void;
}

const isTrail = (t: StudyTopic) => t.kind === 'core' || t.kind === 'checkpoint';
const isPostgrad = (t: StudyTopic) => t.kind === 'postgrad' || (!t.kind && t.track === 'Pós-graduação');

export function TrailView({ topics, phaseFilter, setPhaseFilter, trackFilter, setTrackFilter, onAdd, ...handlers }: Handlers & {
  topics: StudyTopic[];
  phaseFilter: PhaseFilter; setPhaseFilter: (f: PhaseFilter) => void;
  trackFilter: Track | 'Todas'; setTrackFilter: (t: Track | 'Todas') => void;
  onAdd: () => void;
}) {
  const [search, setSearch] = useState('');
  const [toggled, setToggled] = useState<Set<string>>(() => new Set());
  const byCode = useMemo(() => codeIndex(topics), [topics]);
  const progress = useMemo(() => new Map(phaseProgress(topics).map(p => [p.phase, p])), [topics]);
  const current = useMemo(() => currentPhase(topics), [topics]);
  const hasTrail = topics.some(isTrail);

  const q = search.trim().toLowerCase();
  const matches = (t: StudyTopic) => (trackFilter === 'Todas' || t.track === trackFilter)
    && (!q || `${t.code ?? ''} ${t.title} ${t.description} ${t.practice ?? ''}`.toLowerCase().includes(q));
  const trail = topics.filter(isTrail);
  const pos = topics.filter(isPostgrad);
  const custom = topics.filter(t => !isTrail(t) && !isPostgrad(t));
  const groups = [
    ...PHASES.map(p => ({ key: `p${p.id}`, phase: p.id as number | undefined, items: trail.filter(t => t.phase === p.id) })),
    { key: 'pos', phase: undefined, items: pos },
    { key: 'custom', phase: undefined, items: custom }
  ]
    .filter(g => phaseFilter === 'all' || (typeof phaseFilter === 'number' ? g.phase === phaseFilter : g.key === phaseFilter))
    .map(g => ({ ...g, items: g.items.filter(matches) }))
    .filter(g => g.items.length > 0);
  const forced = q !== '' || trackFilter !== 'Todas' || phaseFilter !== 'all';
  const isOpen = (key: string) => (forced || key === `p${current}` || (!hasTrail && key === 'custom')) !== toggled.has(key);
  const flip = (key: string) => setToggled(prev => { const next = new Set(prev); if (next.has(key)) next.delete(key); else next.add(key); return next; });

  return <>
    <section className="page-heading">
      <div>
        <div className="eyebrow">SEQUÊNCIA DE APRENDIZAGEM · TRILHA 2.1</div>
        <h1>Sua trilha de <span>estudos.</span></h1>
        <p>14 etapas da lógica à cibersegurança. Cada etapa termina com um desafio de saída que libera a próxima; a pós segue em paralelo.</p>
      </div>
      <button className="btn secondary" onClick={onAdd}><Plus size={18} /> Novo assunto</button>
    </section>

    {hasTrail && <div className="phase-map" role="list" aria-label="Mapa das etapas">
      {PHASES.map(p => {
        const pr = progress.get(p.id);
        const state = pr?.completed ? 'done' : p.id === current ? 'current' : pr?.unlocked ? 'open' : 'locked';
        return <button role="listitem" key={p.id} className={`phase-chip ${state} ${phaseFilter === p.id ? 'selected' : ''}`}
          onClick={() => setPhaseFilter(phaseFilter === p.id ? 'all' : p.id)} title={p.title}>
          <span className="phase-chip-top"><b>{String(p.id).padStart(2, '0')}</b>{state === 'done' ? <CheckCircle2 size={13} /> : state === 'locked' ? <Lock size={12} /> : null}</span>
          <span className="phase-chip-bar"><span style={{ width: `${pr && pr.total ? (pr.done / pr.total) * 100 : 0}%` }} /></span>
          <small>{pr ? `${pr.done}/${pr.total}` : '—'}</small>
        </button>;
      })}
    </div>}

    <div className="filters">
      <div className="search-box"><Search size={17} /><input placeholder="Buscar por código, assunto ou prática..." value={search} onChange={e => setSearch(e.target.value)} /></div>
      <select aria-label="Etapa" value={String(phaseFilter)} onChange={e => { const v = e.target.value; setPhaseFilter(v === 'all' || v === 'pos' || v === 'custom' ? v : Number(v)); }}>
        <option value="all">Todas as etapas</option>
        {PHASES.map(p => <option key={p.id} value={p.id}>{phaseLabel(p.id)} — {p.title}</option>)}
        <option value="pos">Pós-graduação</option>
        <option value="custom">Personalizados</option>
      </select>
      <select aria-label="Área" value={trackFilter} onChange={e => setTrackFilter(e.target.value as Track | 'Todas')}>
        <option value="Todas">Todas as áreas</option>
        {TRACKS.map(t => <option key={t} value={t}>{t}</option>)}
      </select>
    </div>

    {groups.length === 0 && <div className="empty-state topics-table">Nenhum assunto encontrado.</div>}
    <div className="phase-list">
      {groups.map(g => {
        const phase = g.phase ? PHASES.find(p => p.id === g.phase) : undefined;
        const pr = g.phase ? progress.get(g.phase) : undefined;
        const open = isOpen(g.key);
        const title = phase ? phase.title : g.key === 'pos' ? 'Pós-graduação em paralelo' : 'Assuntos personalizados';
        const doneCount = g.items.filter(t => t.status === 'done').length;
        return <section key={g.key} className={`phase-section ${open ? 'open' : ''}`}>
          <button className="phase-head" onClick={() => flip(g.key)} aria-expanded={open}>
            <span className="phase-number">{phase ? String(phase.id).padStart(2, '0') : g.key === 'pos' ? 'PÓS' : '+'}</span>
            <span className="phase-title">
              <strong>{title}</strong>
              <small>{doneCount}/{g.items.length} concluídos{phase ? ` · ${phaseStateText(pr, phase.id === current)}` : g.key === 'pos' ? ' · não bloqueia a trilha' : ' · entram no plano com prazo ou em andamento'}</small>
            </span>
            <span className="phase-progress"><span style={{ width: `${g.items.length ? (doneCount / g.items.length) * 100 : 0}%` }} /></span>
            <ChevronDown size={18} className="phase-caret" />
          </button>
          {open && <div className="phase-body">
            {phase && <div className="phase-goal"><div><b>Meta</b><p>{phase.objective}</p></div><div><b>Desafio de saída</b><p>{phase.gate}</p></div></div>}
            <div className="topics-table">
              {g.items.map(t => <TopicRow key={t.id} topic={t} locked={!isUnlocked(t, byCode)} progress={pr} {...handlers} />)}
            </div>
          </div>}
        </section>;
      })}
    </div>
  </>;
}

function phaseStateText(pr: PhaseProgress | undefined, isCurrent: boolean): string {
  if (!pr) return '';
  if (pr.completed) return 'etapa concluída';
  if (!pr.unlocked) return 'bloqueada até o desafio anterior';
  if (pr.requiredLeft === 0) return 'desafio de saída liberado';
  return `${isCurrent ? 'etapa atual · ' : ''}faltam ${pr.requiredLeft} para o desafio`;
}

function TopicRow({ topic: t, locked, progress, onStudy, onGuided, onToggle }: Handlers & { topic: StudyTopic; locked: boolean; progress?: PhaseProgress }) {
  const guide = guideFor(t);
  const books = [...new Map(readingForTopic(t.code).map(r => [r.book_id, bookById(r.book_id)])).values()].filter(b => b !== undefined);
  const lockText = t.kind === 'checkpoint' && progress?.unlocked
    ? `Conclua os ${progress.requiredLeft} conteúdo(s) obrigatório(s) da etapa`
    : 'Conclua o desafio de saída da etapa anterior';
  return <div className={`topic-row ${locked && t.status !== 'done' ? 'locked' : ''}`}>
    <div className="topic-main">
      <span className="topic-category">
        {t.code && <span className="code-chip">{t.code}</span>}
        <IconTrack track={t.track} />{t.track}
        {t.kind === 'checkpoint' && <span className="flag-chip"><Flag size={11} /> Desafio de saída</span>}
        {t.optional && <span className="soft-chip">opcional</span>}
      </span>
      <strong>{t.title}</strong>
      <small>{t.description}</small>
      {t.practice && <small className="topic-practice"><b>Prática:</b> {t.practice}</small>}
      {books.length > 0 && <div className="topic-books"><BookMarked size={13} />{books.map(b => <a key={b.id} href={bookUrl(b)} target="_blank" rel="noopener noreferrer">{b.title}</a>)}</div>}
    </div>
    <div className="topic-mid">
      <span className={`status-pill ${t.status}`}>{statusText(t.status)}</span>
      {locked && t.status !== 'done' && <small className="lock-note"><Lock size={11} /> {lockText}</small>}
      {t.due_on && <small className="due-note">Prazo: {niceDate(t.due_on)}</small>}
      {t.class_on && <small>Aula: {niceDate(t.class_on)}</small>}
      {t.next_review_on && <small>Revisão: {niceDate(t.next_review_on)}</small>}
      <small>{t.estimated_minutes} min</small>
    </div>
    <div className="topic-actions">
      {t.resource_url && <a title="Abrir material" target="_blank" rel="noopener noreferrer" href={t.resource_url}><ExternalLink size={17} /></a>}
      {guide && <button className="btn small primary" onClick={() => onGuided(t)}>Guiada</button>}
      <button className="btn small secondary" onClick={() => onStudy(t)}>{guide ? 'Registrar' : 'Estudar'}</button>
      <button title={t.status === 'done' ? 'Reabrir' : 'Concluir'} aria-label={t.status === 'done' ? 'Reabrir' : 'Concluir'} className={`btn-icon ${t.status === 'done' ? 'checked' : ''}`} onClick={() => onToggle(t)}><Check size={16} /></button>
    </div>
  </div>;
}
