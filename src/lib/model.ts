export type Track = 'Fundamentos' | 'JavaScript' | 'Full Stack' | 'Banco de dados' | 'Engenharia' | 'Cibersegurança' | 'Pós-graduação' | 'Aprofundamento';
export const TRACKS: Track[] = ['Fundamentos','JavaScript','Full Stack','Banco de dados','Engenharia','Cibersegurança','Pós-graduação','Aprofundamento'];
export type TopicStatus = 'todo' | 'in_progress' | 'done';
export type TopicKind = 'core' | 'checkpoint' | 'postgrad' | 'custom';
export type StudyMode = 'learn' | 'practice' | 'review';

export interface StudyTopic {
  id: string;
  user_id: string;
  track: Track;
  title: string;
  description: string;
  resource_url: string | null;
  estimated_minutes: number;
  priority: number;
  sort_order: number;
  status: TopicStatus;
  due_on: string | null;
  next_review_on: string | null;
  created_at: string;
  /** v3 (trilha por etapas): ausentes até executar supabase/v3_trilha.sql. */
  code?: string | null;
  phase?: number | null;
  kind?: TopicKind;
  optional?: boolean;
  practice?: string;
  evidence?: string;
  prerequisite_codes?: string[];
  class_on?: string | null;
}
export interface StudySession {
  id: string;
  user_id: string;
  topic_id: string;
  studied_on: string;
  duration_minutes: number;
  mode: StudyMode;
  recall_score: number;
  autonomy_level: number;
  notes: string;
  created_at: string;
  /** v2: ausentes até executar supabase/v2_guided_sessions.sql. */
  source?: 'manual' | 'guided';
  correct_count?: number | null;
  total_count?: number | null;
}
export type NewTopic = Pick<StudyTopic,'track'|'title'|'description'|'estimated_minutes'|'priority'|'sort_order'|'due_on'|'resource_url'>;
