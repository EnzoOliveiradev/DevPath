-- Apply in a new Supabase project via SQL Editor; all user-owned data has RLS.
create extension if not exists pgcrypto;

create table if not exists public.study_topics (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  track text not null check (track in ('Fundamentos','JavaScript','Full Stack','Banco de dados','Engenharia','Pós-graduação','Aprofundamento')),
  title text not null check (char_length(title) between 1 and 160),
  description text not null default '',
  resource_url text,
  estimated_minutes integer not null default 25 check (estimated_minutes between 5 and 240),
  priority smallint not null default 2 check (priority between 1 and 3),
  sort_order integer not null default 0,
  status text not null default 'todo' check (status in ('todo','in_progress','done')),
  due_on date,
  next_review_on date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id,track,title)
);
create table if not exists public.study_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  topic_id uuid not null references public.study_topics(id) on delete cascade,
  studied_on date not null,
  duration_minutes integer not null check (duration_minutes between 1 and 240),
  mode text not null check (mode in ('learn','practice','review')),
  recall_score smallint not null check (recall_score between 0 and 5),
  autonomy_level smallint not null check (autonomy_level between 0 and 3),
  notes text not null default '',
  created_at timestamptz not null default now()
);
create index if not exists study_topics_user_status_idx on public.study_topics(user_id,status,sort_order);
create index if not exists study_topics_review_idx on public.study_topics(user_id,next_review_on);
create index if not exists study_sessions_user_date_idx on public.study_sessions(user_id,studied_on desc);

alter table public.study_topics enable row level security;
alter table public.study_sessions enable row level security;

create policy "topic_read_own" on public.study_topics for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "topic_insert_own" on public.study_topics for insert to authenticated
  with check ((select auth.uid()) = user_id);
create policy "topic_update_own" on public.study_topics for update to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "topic_delete_own" on public.study_topics for delete to authenticated
  using ((select auth.uid()) = user_id);
create policy "sessions_read_own" on public.study_sessions for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "sessions_insert_own" on public.study_sessions for insert to authenticated
  with check (
    (select auth.uid()) = user_id and
    exists (select 1 from public.study_topics t where t.id = topic_id and t.user_id = (select auth.uid()))
  );
create policy "sessions_update_own" on public.study_sessions for update to authenticated
  using ((select auth.uid()) = user_id)
  with check (
    (select auth.uid()) = user_id and
    exists (select 1 from public.study_topics t where t.id = topic_id and t.user_id = (select auth.uid()))
  );
create policy "sessions_delete_own" on public.study_sessions for delete to authenticated
  using ((select auth.uid()) = user_id);

revoke all on public.study_topics from anon;
revoke all on public.study_sessions from anon;
grant select, insert, update, delete on public.study_topics to authenticated;
grant select, insert, update, delete on public.study_sessions to authenticated;
