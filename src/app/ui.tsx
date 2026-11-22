import type { StudyTopic, Track } from '@/lib/model';

export const TRACK_COLORS: Record<Track, string> = {
  'Fundamentos': '#0ea5e9', 'JavaScript': '#eab308', 'Full Stack': '#a78bfa', 'Banco de dados': '#0fbf91',
  'Engenharia': '#fb923c', 'Cibersegurança': '#ef6a6a', 'Pós-graduação': '#f472b6', 'Aprofundamento': '#a3b3c9'
};

export function niceDate(value: string): string {
  return new Date(`${value}T12:00:00`).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
}
export function dateTitle(value: string): string {
  return new Date(`${value}T12:00:00`).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
}
export function statusText(status: StudyTopic['status']): string {
  return status === 'done' ? 'Concluído' : status === 'in_progress' ? 'Em andamento' : 'Não iniciado';
}
export function phaseLabel(phase: number): string {
  return `Etapa ${String(phase).padStart(2, '0')}`;
}
export function IconTrack({ track }: { track: Track }) {
  return <span className="track-dot" style={{ background: TRACK_COLORS[track] ?? '#a3b3c9' }} />;
}
