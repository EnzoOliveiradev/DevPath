// Trilha 2.1 (trilha/devpath-trilha.json): catálogo, sincronização com o banco e livros da semana.
import raw from '../../trilha/devpath-trilha.json' with { type: 'json' };
import type { StudyTopic, TopicKind, Track } from './model';

export interface TrailTopic {
  id: string; legacy_id: string | null; phase: number; track: Track; kind: Exclude<TopicKind, 'custom'>; optional: boolean;
  title: string; description: string; practice: string; evidence: string; estimated_minutes: number; priority: number;
  resource_url: string | null; prerequisite_ids: string[]; due_on: string | null; class_on: string | null; sort_order: number;
}
export interface TrailPhase { id: number; title: string; objective: string; gate: string; topic_ids: string[]; checkpoint_id: string; prerequisite_checkpoint: string | null }
export interface Book { id: string; title: string; author: string; lang: 'pt' | 'en'; category: string; source: 'bibliotecadev' | 'externo'; file?: string; url?: string }
export type ReadingRole = 'principal' | 'apoio' | 'consulta';
export interface ReadingItem { id: string; phase: number; book_id: string; role: ReadingRole; focus: string; topic_ids: string[] }
export interface ClassEntry { date: string; title: string; time: string; is_deadline: boolean; source_url: string }
export interface LibraryGap { area: string; suggestion: string }
interface TrailData {
  version: string; phases: TrailPhase[]; topics: TrailTopic[];
  library: { name: string; repo_url: string; file_base_url: string; books: Book[] };
  reading_plan: ReadingItem[]; career_rotation: string[]; library_gaps: LibraryGap[];
  postgrad_class_schedule: ClassEntry[]; dashboard_logic: string[];
}

export const TRAIL = raw as unknown as TrailData;
export const PHASES = TRAIL.phases;
const BOOKS = new Map(TRAIL.library.books.map(b => [b.id, b]));
const CATALOG = new Map(TRAIL.topics.map(t => [t.id, t]));

export function phaseById(id: number | null | undefined): TrailPhase | undefined {
  return PHASES.find(p => p.id === id);
}
export function bookById(id: string): Book | undefined { return BOOKS.get(id); }
export function catalogTopic(code: string | null | undefined): TrailTopic | undefined { return code ? CATALOG.get(code) : undefined; }

export function bookUrl(book: Book): string {
  return book.source === 'bibliotecadev' ? TRAIL.library.file_base_url + encodeURI(book.file ?? '') : book.url ?? TRAIL.library.repo_url;
}

/** Linha para upsert em study_topics. Não inclui status/next_review_on: o progresso do usuário é preservado. */
export function catalogRow(t: TrailTopic, userId: string) {
  return {
    user_id: userId, code: t.id, phase: t.phase, kind: t.kind, optional: t.optional, track: t.track, title: t.title,
    description: t.description, practice: t.practice, evidence: t.evidence, estimated_minutes: t.estimated_minutes,
    priority: t.priority, sort_order: t.sort_order, resource_url: t.resource_url, due_on: t.due_on, class_on: t.class_on,
    prerequisite_codes: t.prerequisite_ids
  };
}
export function catalogRows(userId: string) { return TRAIL.topics.map(t => catalogRow(t, userId)); }

const SYNC_FIELDS = ['phase', 'kind', 'optional', 'track', 'title', 'description', 'practice', 'evidence', 'estimated_minutes', 'priority', 'sort_order', 'resource_url', 'due_on', 'class_on'] as const;

export interface SyncPlan {
  /** Assuntos sem código (seed antigo ou criados pelo usuário) com o mesmo título de um item da trilha: recebem o código e mantêm o histórico. */
  adopt: { id: string; code: string }[];
  /** Itens da trilha ausentes ou desatualizados. */
  missing: number;
  outdated: number;
  needsUpsert: boolean;
}

export function planTrailSync(existing: StudyTopic[]): SyncPlan {
  const byCode = new Map(existing.filter(t => t.code).map(t => [t.code as string, t]));
  const loose = new Map(existing.filter(t => !t.code).map(t => [`${t.track}::${t.title}`, t]));
  const adopt: SyncPlan['adopt'] = [];
  let missing = 0, outdated = 0;
  for (const t of TRAIL.topics) {
    const current = byCode.get(t.id);
    if (!current) {
      const match = loose.get(`${t.track}::${t.title}`);
      if (match) { adopt.push({ id: match.id, code: t.id }); loose.delete(`${t.track}::${t.title}`); outdated++; }
      else missing++;
      continue;
    }
    const row = catalogRow(t, current.user_id) as Record<string, unknown>;
    const cur = current as unknown as Record<string, unknown>;
    const changed = SYNC_FIELDS.some(f => (cur[f] ?? null) !== (row[f] ?? null))
      || (current.prerequisite_codes ?? []).join(' ') !== t.prerequisite_ids.join(' ');
    if (changed) outdated++;
  }
  return { adopt, missing, outdated, needsUpsert: missing + outdated > 0 };
}

// ---------- Livros da semana ----------

export type ReadingStatus = 'reading' | 'done';

export function readingForTopic(code: string | null | undefined): ReadingItem[] {
  if (!code) return [];
  return TRAIL.reading_plan.filter(r => r.topic_ids.includes(code));
}
export function readingForPhase(phase: number): ReadingItem[] {
  return TRAIL.reading_plan.filter(r => r.phase === phase);
}

/**
 * Livro da semana: a leitura em andamento ou a primeira não concluída da etapa atual
 * (itens de consulta não entram). Se a etapa estiver lida, volta às anteriores e depois adianta as próximas.
 */
export function weeklyReading(currentPhase: number | null, progress: Map<string, ReadingStatus>): ReadingItem | undefined {
  const weekly = TRAIL.reading_plan.filter(r => r.phase > 0 && r.role !== 'consulta');
  const reading = weekly.find(r => progress.get(r.id) === 'reading');
  if (reading) return reading;
  const phase = currentPhase ?? PHASES[PHASES.length - 1].id;
  const open = (r: ReadingItem) => progress.get(r.id) !== 'done';
  return weekly.find(r => r.phase === phase && open(r))
    ?? weekly.find(r => r.phase < phase && open(r))
    ?? weekly.find(r => r.phase > phase && open(r));
}

/** Semana ISO (1–53) de uma data YYYY-MM-DD. */
export function isoWeek(iso: string): number {
  const d = new Date(`${iso}T12:00:00Z`);
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = Date.UTC(d.getUTCFullYear(), 0, 1);
  return Math.ceil(((d.getTime() - yearStart) / 86400000 + 1) / 7);
}
export function careerBookOfWeek(iso: string): Book | undefined {
  const list = TRAIL.career_rotation;
  return BOOKS.get(list[isoWeek(iso) % list.length]);
}

export function upcomingClasses(today: string, count = 2): ClassEntry[] {
  return TRAIL.postgrad_class_schedule.filter(c => c.date >= today).sort((a, b) => a.date.localeCompare(b.date)).slice(0, count);
}
