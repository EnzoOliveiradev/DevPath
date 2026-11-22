-- DevPath v3 — trilha 2.1 por etapas e livros da semana.
-- Execute no SQL Editor DEPOIS de schema.sql e v2_guided_sessions.sql. Pode ser executado mais de uma vez.

-- 1. Metadados da trilha em cada assunto (assuntos criados pelo usuário ficam com code nulo e kind 'custom').
alter table public.study_topics add column if not exists code text;
alter table public.study_topics add column if not exists phase smallint;
alter table public.study_topics add column if not exists kind text not null default 'custom';
alter table public.study_topics add column if not exists optional boolean not null default false;
alter table public.study_topics add column if not exists practice text not null default '';
alter table public.study_topics add column if not exists evidence text not null default '';
alter table public.study_topics add column if not exists prerequisite_codes text[] not null default '{}';
alter table public.study_topics add column if not exists class_on date;

do $$
begin
  -- Nova trilha "Cibersegurança".
  alter table public.study_topics drop constraint if exists study_topics_track_check;
  alter table public.study_topics add constraint study_topics_track_check check (track in
    ('Fundamentos','JavaScript','Full Stack','Banco de dados','Engenharia','Pós-graduação','Aprofundamento','Cibersegurança'));

  if not exists (select 1 from pg_constraint where conname = 'study_topics_kind_check') then
    alter table public.study_topics add constraint study_topics_kind_check
      check (kind in ('core','checkpoint','postgrad','custom'));
  end if;
  if not exists (select 1 from pg_constraint where conname = 'study_topics_phase_check') then
    alter table public.study_topics add constraint study_topics_phase_check check (phase between 0 and 50);
  end if;
  if not exists (select 1 from pg_constraint where conname = 'study_topics_code_check') then
    alter table public.study_topics add constraint study_topics_code_check
      check (code is null or code ~ '^[A-Z][A-Z0-9-]{1,15}$');
  end if;
  if not exists (select 1 from pg_constraint where conname = 'study_topics_practice_len') then
    alter table public.study_topics add constraint study_topics_practice_len
      check (char_length(practice) <= 2000 and char_length(evidence) <= 2000 and cardinality(prerequisite_codes) <= 60);
  end if;
  -- Chave de sincronização com trilha/devpath-trilha.json (nulos não conflitam entre si).
  if not exists (select 1 from pg_constraint where conname = 'study_topics_user_code_key') then
    alter table public.study_topics add constraint study_topics_user_code_key unique (user_id, code);
  end if;
end $$;

create index if not exists study_topics_user_phase_idx on public.study_topics(user_id, phase, sort_order);

-- 2. Progresso de leitura dos livros da semana (item_id = ID da semana no plano, ex.: L04-2).
create table if not exists public.reading_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  item_id text not null check (item_id ~ '^L[0-9P]{1,3}-[0-9]{1,3}$'),
  status text not null check (status in ('reading','done')),
  updated_at timestamptz not null default now(),
  primary key (user_id, item_id)
);

alter table public.reading_progress enable row level security;

drop policy if exists "reading_read_own" on public.reading_progress;
create policy "reading_read_own" on public.reading_progress for select to authenticated
  using ((select auth.uid()) = user_id);
drop policy if exists "reading_insert_own" on public.reading_progress;
create policy "reading_insert_own" on public.reading_progress for insert to authenticated
  with check ((select auth.uid()) = user_id);
drop policy if exists "reading_update_own" on public.reading_progress;
create policy "reading_update_own" on public.reading_progress for update to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
drop policy if exists "reading_delete_own" on public.reading_progress;
create policy "reading_delete_own" on public.reading_progress for delete to authenticated
  using ((select auth.uid()) = user_id);

revoke all on public.reading_progress from anon;
grant select, insert, update, delete on public.reading_progress to authenticated;
