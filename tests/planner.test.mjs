import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { addDays, dayDifference, intervalFromRecall, planDay, streakDays } from '../src/lib/planner.ts';

const mk = (id, params={}) => ({
  id,user_id:'user-a',title:id,track:'Fundamentos',description:'',resource_url:null,
  status:'todo',due_on:null,next_review_on:null,estimated_minutes:25,
  priority:2,sort_order:0,created_at:'2026-11-01',...params
});

test('datas sem conversão acidental do calendário local',()=>{
  assert.equal(addDays('2026-11-30',1),'2026-12-01');
  assert.equal(addDays('2026-03-01',-1),'2026-02-28');
  assert.equal(dayDifference('2026-11-30','2026-11-22'),8);
});
test('heurística de revisão aumenta intervalo conforme recuperação',()=>{
  assert.deepEqual([0,1,2,3,4,5].map(intervalFromRecall),[1,1,1,3,7,14]);
});
test('prioriza prazo próximo e revisão vencida antes de próxima etapa',()=>{
  const today='2026-11-22';
  const topics=[mk('fundamento',{sort_order:0}),mk('prazo',{track:'Pós-graduação',due_on:'2026-11-24'}),mk('revisao',{status:'done',next_review_on:'2026-11-21'})];
  const plan=planDay(topics,today,3,90);
  assert.deepEqual(plan.map(x=>x.topic.id),['prazo','revisao','fundamento']);
  assert.deepEqual(plan.map(x=>x.reason),['Entrega próxima','Revisão pendente','Próxima etapa']);
});
test('não repete o mesmo tópico duas vezes no mesmo dia',()=>{
  const t=mk('duplo',{due_on:'2026-11-22',next_review_on:'2026-11-20',status:'in_progress'});
  assert.equal(planDay([t],'2026-11-22').length,1);
});
test('sequência tolera um dia sem atividade até a primeira sessão do dia seguinte',()=>{
  const sessions=[{studied_on:'2026-11-20'},{studied_on:'2026-11-21'}];
  assert.equal(streakDays(sessions,'2026-11-22'),2);
  assert.equal(streakDays(sessions,'2026-11-23'),0);
});
test('RLS definida em todas as tabelas e com escopo de proprietário',()=>{
  const sql=readFileSync('supabase/schema.sql','utf8');
  assert.match(sql,/alter table public\.study_topics enable row level security/i);
  assert.match(sql,/alter table public\.study_sessions enable row level security/i);
  assert.match(sql,/sessions_insert_own/);
  assert.match(sql,/topic_update_own/);
  assert.match(sql,/auth\.uid\(\)/);
});
test('frontend usa chave publicável e não contém service role',()=>{
  const src=readFileSync('src/lib/supabase.ts','utf8');
  assert.match(src,/NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY/);
  assert.doesNotMatch(src,/service.role|service_role|secret.key/i);
});

test('orçamento diário permite ao menos uma entrega urgente sem sobrecarregar a sessão',()=>{
  const p=planDay([mk('curto',{estimated_minutes:20,sort_order:0}),mk('longo',{due_on:'2026-11-23',estimated_minutes:45}),mk('outro',{estimated_minutes:25,sort_order:1})],'2026-11-22',3,60);
  assert.deepEqual(p.map(x=>x.topic.id),['longo']);
});
