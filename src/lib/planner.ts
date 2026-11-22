import type { StudyTopic } from './model';

// Date-only calculation avoids timezone-dependent UTC conversions.
export function todayInSaoPaulo(now = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-US', {timeZone:'America/Sao_Paulo', year:'numeric', month:'2-digit', day:'2-digit'}).formatToParts(now);
  const get = (name: string) => parts.find(part => part.type === name)?.value ?? '00';
  return `${get('year')}-${get('month')}-${get('day')}`;
}
export function addDays(iso: string, days: number): string {
  const date = new Date(`${iso}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0,10);
}
export function dayDifference(a: string, b: string): number {
  return Math.round((Date.parse(`${a}T12:00:00Z`) - Date.parse(`${b}T12:00:00Z`)) / 86400000);
}
/** 0 = domingo … 6 = sábado. */
export function weekday(iso: string): number {
  return new Date(`${iso}T12:00:00Z`).getUTCDay();
}
// MVP heuristic: not a validated spaced-repetition algorithm.
export function intervalFromRecall(score: number): number {
  if (score <= 2) return 1;
  if (score === 3) return 3;
  if (score === 4) return 7;
  return 14;
}

// ---------- Portões da trilha ----------

const isTrail = (t: StudyTopic) => t.kind === 'core' || t.kind === 'checkpoint';
const isPostgrad = (t: StudyTopic) => t.kind === 'postgrad' || (!t.kind && t.track === 'Pós-graduação');

/** Liberado quando todos os pré-requisitos existentes estão concluídos (pré-requisito ausente não bloqueia). */
export function isUnlocked(topic: StudyTopic, byCode: Map<string, StudyTopic>): boolean {
  return (topic.prerequisite_codes ?? []).every(code => {
    const prerequisite = byCode.get(code);
    return !prerequisite || prerequisite.status === 'done';
  });
}
export function codeIndex(topics: StudyTopic[]): Map<string, StudyTopic> {
  return new Map(topics.filter(t => t.code).map(t => [t.code as string, t]));
}

export interface PhaseProgress {
  phase: number; total: number; done: number; requiredLeft: number;
  checkpoint?: StudyTopic; unlocked: boolean; completed: boolean;
}
export function phaseProgress(topics: StudyTopic[]): PhaseProgress[] {
  const byCode = codeIndex(topics);
  const phases = [...new Set(topics.filter(isTrail).map(t => t.phase ?? 0))].sort((a, b) => a - b);
  return phases.map(phase => {
    const items = topics.filter(t => isTrail(t) && t.phase === phase);
    const checkpoint = items.find(t => t.kind === 'checkpoint');
    const required = items.filter(t => t.kind === 'core' && !t.optional);
    return {
      phase, total: items.length, done: items.filter(t => t.status === 'done').length,
      requiredLeft: required.filter(t => t.status !== 'done').length,
      checkpoint,
      unlocked: items.some(t => isUnlocked(t, byCode)),
      completed: checkpoint ? checkpoint.status === 'done' : items.every(t => t.status === 'done')
    };
  });
}
/** Primeira etapa cujo desafio de saída não foi concluído; null sem trilha ou com tudo concluído. */
export function currentPhase(topics: StudyTopic[]): number | null {
  return phaseProgress(topics).find(p => !p.completed)?.phase ?? null;
}

// ---------- Agenda do dia ----------

export type PlanReason = 'Entrega próxima' | 'Revisão pendente' | 'Em andamento' | 'Pós em paralelo' | 'Desafio de saída' | 'Próxima etapa';
export interface PlannedTopic {topic: StudyTopic; reason: PlanReason}
const POSTGRAD_DAYS = new Set([2, 4, 6]); // terça, quinta e sábado
export const DEADLINE_WINDOW_DAYS = 14;

/**
 * 1. Prazos em até 14 dias (1 em orçamentos < 75 min; 2 nos maiores).
 * 2. Revisão vencida mais antiga, mesmo de assunto concluído.
 * 3. Assunto em andamento já liberado.
 * 4. Pós em paralelo às terças, quintas e sábados (aula mais próxima primeiro), se nenhuma entrega da pós já entrou.
 * 5. Próximos assuntos liberados da trilha, na ordem; sem trilha, os assuntos abertos em ordem.
 * O primeiro item sempre entra, mesmo que ultrapasse o orçamento.
 */
export function planDay(topics: StudyTopic[], date: string, max = 3, budgetMinutes = Infinity): PlannedTopic[] {
  const selected: PlannedTopic[] = [];
  const used = new Set<string>();
  const byCode = codeIndex(topics);
  const unlocked = (t: StudyTopic) => isUnlocked(t, byCode);
  function push(topic: StudyTopic | undefined, reason: PlanReason): boolean {
    if (!topic || used.has(topic.id) || selected.length >= max) return false;
    const scheduled = selected.reduce((total, x) => total + x.topic.estimated_minutes, 0);
    if (selected.length > 0 && scheduled + topic.estimated_minutes > budgetMinutes) return false;
    selected.push({topic, reason}); used.add(topic.id);
    return true;
  }
  const open = topics.filter(t => t.status !== 'done');

  const deadlines = open.filter(t => t.due_on && dayDifference(t.due_on, date) <= DEADLINE_WINDOW_DAYS)
    .sort((a,b) => (a.due_on ?? '').localeCompare(b.due_on ?? '') || b.priority-a.priority);
  const deadlineLimit = budgetMinutes < 75 ? 1 : 2;
  let deadlinesTaken = 0;
  for (const t of deadlines) { if (deadlinesTaken >= deadlineLimit) break; if (push(t, 'Entrega próxima')) deadlinesTaken++; }

  const reviews = topics.filter(t => t.next_review_on && t.next_review_on <= date && !used.has(t.id))
    .sort((a,b) => (a.next_review_on ?? '').localeCompare(b.next_review_on ?? ''));
  push(reviews[0], 'Revisão pendente');

  const ongoing = open.filter(t => t.status === 'in_progress' && !used.has(t.id) && unlocked(t))
    .sort((a,b) => b.priority-a.priority || a.sort_order-b.sort_order);
  push(ongoing[0], 'Em andamento');

  if (POSTGRAD_DAYS.has(weekday(date)) && !selected.some(x => isPostgrad(x.topic))) {
    const nextClass = (t: StudyTopic) => t.class_on && t.class_on >= date ? t.class_on : '9999-12-31';
    const postgrad = open.filter(t => isPostgrad(t) && !used.has(t.id))
      .sort((a,b) => nextClass(a).localeCompare(nextClass(b)) || (a.due_on ?? '9999').localeCompare(b.due_on ?? '9999') || a.sort_order-b.sort_order);
    push(postgrad[0], 'Pós em paralelo');
  }

  const hasTrail = topics.some(isTrail);
  const done = new Set(phaseProgress(topics).filter(p => p.completed).map(p => p.phase));
  const next = open.filter(t => !used.has(t.id) && !isPostgrad(t) && (hasTrail
      // opcionais de etapas já concluídas não voltam a ser sugeridos
      ? isTrail(t) && unlocked(t) && !(t.optional && done.has(t.phase ?? 0))
      : true))
    .sort((a,b) => (a.phase ?? 99)-(b.phase ?? 99) || a.sort_order-b.sort_order || b.priority-a.priority);
  for (const topic of next) {
    if (selected.length >= max) break;
    push(topic, topic.kind === 'checkpoint' ? 'Desafio de saída' : 'Próxima etapa');
  }
  return selected;
}
export function streakDays(sessions: {studied_on:string}[], date:string): number {
  const unique = new Set(sessions.map(s=>s.studied_on));
  let cursor = unique.has(date) ? date : addDays(date,-1);
  let result = 0;
  while (unique.has(cursor)) { result++; cursor = addDays(cursor,-1); }
  return result;
}
