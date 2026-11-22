-- DevPath v2 — sessões guiadas com exercícios corrigidos pela plataforma.
-- Execute no SQL Editor DEPOIS de schema.sql. Pode ser executado mais de uma vez.

alter table public.study_sessions
  add column if not exists source text not null default 'manual';
alter table public.study_sessions
  add column if not exists correct_count smallint;
alter table public.study_sessions
  add column if not exists total_count smallint;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'study_sessions_source_check') then
    alter table public.study_sessions
      add constraint study_sessions_source_check check (source in ('manual','guided'));
  end if;
  if not exists (select 1 from pg_constraint where conname = 'study_sessions_counts_check') then
    alter table public.study_sessions
      add constraint study_sessions_counts_check check (
        (correct_count is null and total_count is null) or
        (correct_count between 0 and 100 and total_count between 0 and 100 and correct_count <= total_count)
      );
  end if;
end $$;

create table if not exists public.exercise_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  session_id uuid not null references public.study_sessions(id) on delete cascade,
  topic_id uuid not null references public.study_topics(id) on delete cascade,
  exercise_id text not null check (char_length(exercise_id) between 1 and 80),
  kind text not null check (kind in ('predict','concept','explain','code')),
  -- null = não corrigido automaticamente (explicação livre)
  correct boolean,
  hints_used smallint not null default 0 check (hints_used between 0 and 10),
  solution_viewed boolean not null default false,
  answer text not null default '' check (char_length(answer) <= 20000),
  created_at timestamptz not null default now()
);
create index if not exists exercise_attempts_user_topic_idx
  on public.exercise_attempts(user_id, topic_id, created_at desc);
create index if not exists exercise_attempts_session_idx
  on public.exercise_attempts(session_id);

alter table public.exercise_attempts enable row level security;

drop policy if exists "attempts_read_own" on public.exercise_attempts;
create policy "attempts_read_own" on public.exercise_attempts for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "attempts_insert_own" on public.exercise_attempts;
create policy "attempts_insert_own" on public.exercise_attempts for insert to authenticated
  with check (
    (select auth.uid()) = user_id and
    -- Colunas qualificadas: dentro da subconsulta, "topic_id" sozinho resolveria para s.topic_id.
    exists (
      select 1 from public.study_sessions s
      where s.id = exercise_attempts.session_id
        and s.user_id = (select auth.uid())
        and s.topic_id = exercise_attempts.topic_id
    ) and
    exists (
      select 1 from public.study_topics t
      where t.id = exercise_attempts.topic_id and t.user_id = (select auth.uid())
    )
  );

drop policy if exists "attempts_delete_own" on public.exercise_attempts;
create policy "attempts_delete_own" on public.exercise_attempts for delete to authenticated
  using ((select auth.uid()) = user_id);

-- Tentativas são um registro histórico: não há política de update.
revoke all on public.exercise_attempts from anon;
grant select, insert, delete on public.exercise_attempts to authenticated;
