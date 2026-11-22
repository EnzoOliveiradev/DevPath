'use client';

import { useState } from 'react';
import { BookMarked, BookOpenCheck, Check, ChevronDown, ExternalLink, Library, Undo2 } from 'lucide-react';
import { PHASES, TRAIL, bookById, bookUrl, careerBookOfWeek, readingForPhase, type ReadingItem, type ReadingStatus } from '@/lib/trail';
import { phaseLabel } from './ui';

export type SetReading = (itemId: string, status: ReadingStatus | null) => void;
const ROLE = { principal: 'Principal', apoio: 'Apoio', consulta: 'Consulta' } as const;

function BookMeta({ item }: { item: ReadingItem }) {
  const book = bookById(item.book_id);
  if (!book) return null;
  return <span className="book-meta">
    {book.author}
    {book.lang === 'en' && <span className="soft-chip">inglês</span>}
    {book.source === 'externo' && <span className="soft-chip free">gratuito online</span>}
    <span className={`role-chip ${item.role}`}>{ROLE[item.role]}</span>
  </span>;
}

function ReadingActions({ item, status, onSet, ready }: { item: ReadingItem; status?: ReadingStatus; onSet: SetReading; ready: boolean }) {
  if (!ready) return null;
  return <div className="reading-actions">
    {status !== 'reading' && status !== 'done' && <button className="btn secondary small" onClick={() => onSet(item.id, 'reading')}><BookMarked size={14} /> Estou lendo</button>}
    {status !== 'done' && <button className="btn primary small" onClick={() => onSet(item.id, 'done')}><Check size={14} /> Concluí</button>}
    {status && <button className="btn text small" onClick={() => onSet(item.id, null)}><Undo2 size={14} /> Desfazer</button>}
  </div>;
}

/** Card do livro da semana (painel e biblioteca). */
export function WeeklyReadingCard({ item, status, onSet, ready, today, onOpenLibrary }: {
  item?: ReadingItem; status?: ReadingStatus; onSet: SetReading; ready: boolean; today: string; onOpenLibrary?: () => void;
}) {
  const career = careerBookOfWeek(today);
  const book = item ? bookById(item.book_id) : undefined;
  return <div className="reading-card">
    <div className="reading-head"><div className="reading-icon"><Library size={19} /></div><div><div className="eyebrow">LIVRO DA SEMANA{item ? ` · ${phaseLabel(item.phase).toUpperCase()}` : ''}</div>{status === 'reading' && <span className="reading-badge">lendo agora</span>}</div></div>
    {item && book ? <>
      <a className="reading-title" href={bookUrl(book)} target="_blank" rel="noopener noreferrer">{book.title} <ExternalLink size={13} /></a>
      <BookMeta item={item} />
      <p className="reading-focus">{item.focus}</p>
      <div className="reading-topics">{item.topic_ids.map(id => <span key={id} className="code-chip">{id}</span>)}</div>
      <ReadingActions item={item} status={status} onSet={onSet} ready={ready} />
    </> : <p className="reading-focus">Todas as leituras da trilha foram concluídas. Revise as anotações dos livros principais.</p>}
    {career && <div className="career-line"><BookOpenCheck size={14} /><span>Leitura leve da semana: <a href={bookUrl(career)} target="_blank" rel="noopener noreferrer">{career.title}</a> — {career.author}</span></div>}
    {onOpenLibrary && <button className="btn text small" onClick={onOpenLibrary}>Ver todas as leituras <ChevronDown size={14} style={{ transform: 'rotate(-90deg)' }} /></button>}
  </div>;
}

export function LibraryView({ today, phase, weekly, progress, ready, onSet }: {
  today: string; phase: number | null; weekly?: ReadingItem; progress: Map<string, ReadingStatus>; ready: boolean; onSet: SetReading;
}) {
  const [toggled, setToggled] = useState<Set<number>>(() => new Set());
  const all = TRAIL.reading_plan.filter(r => r.phase > 0 && r.role !== 'consulta');
  const done = all.filter(r => progress.get(r.id) === 'done').length;
  const sections = [...PHASES.map(p => ({ id: p.id, title: `${phaseLabel(p.id)} — ${p.title}` })), { id: 0, title: 'Pós-graduação em paralelo' }];
  const isOpen = (id: number) => (id === (phase ?? 1)) !== toggled.has(id);
  const flip = (id: number) => setToggled(prev => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; });

  return <>
    <section className="page-heading">
      <div>
        <div className="eyebrow">LIVROS DA SEMANA · BIBLIOTECADEV</div>
        <h1>Sua biblioteca de <span>estudo.</span></h1>
        <p>Uma leitura por semana, ligada à etapa atual da trilha: cerca de 20 minutos por dia, 5 dias. A leitura apoia a prática; não substitui as sessões.</p>
      </div>
      <a className="btn secondary" href={TRAIL.library.repo_url} target="_blank" rel="noopener noreferrer"><ExternalLink size={16} /> Abrir BibliotecaDev</a>
    </section>
    {!ready && <div className="info-banner">Para salvar o progresso de leitura, execute <code>supabase/v3_trilha.sql</code> no SQL Editor do Supabase.</div>}
    <section className="library-top">
      <WeeklyReadingCard item={weekly} status={weekly ? progress.get(weekly.id) : undefined} onSet={onSet} ready={ready} today={today} />
      <div className="mini-panel">
        <h3>Progresso de leitura</h3>
        <div className="library-count"><strong>{done}</strong><span>de {all.length} semanas de leitura concluídas</span></div>
        <div className="progress-track"><span style={{ width: `${all.length ? (done / all.length) * 100 : 0}%` }} /></div>
        <p className="mini-caption"><b>Principal</b> sustenta a etapa, <b>apoio</b> amplia e <b>consulta</b> serve para tirar dúvidas (não entra no livro da semana).</p>
      </div>
    </section>

    <div className="phase-list">
      {sections.map(s => {
        const items = readingForPhase(s.id);
        if (!items.length) return null;
        const open = isOpen(s.id);
        const finished = items.filter(r => progress.get(r.id) === 'done').length;
        return <section key={s.id} className={`phase-section ${open ? 'open' : ''}`}>
          <button className="phase-head" onClick={() => flip(s.id)} aria-expanded={open}>
            <span className="phase-number">{s.id ? String(s.id).padStart(2, '0') : 'PÓS'}</span>
            <span className="phase-title"><strong>{s.title}</strong><small>{finished}/{items.length} leituras concluídas{s.id === phase ? ' · etapa atual' : ''}</small></span>
            <span className="phase-progress"><span style={{ width: `${(finished / items.length) * 100}%` }} /></span>
            <ChevronDown size={18} className="phase-caret" />
          </button>
          {open && <div className="phase-body"><div className="topics-table">
            {items.map(item => {
              const book = bookById(item.book_id);
              const status = progress.get(item.id);
              if (!book) return null;
              return <div key={item.id} className={`reading-row ${status ?? ''}`}>
                <span className="code-chip">{item.id}</span>
                <div className="reading-row-main">
                  <a href={bookUrl(book)} target="_blank" rel="noopener noreferrer"><strong>{book.title}</strong> <ExternalLink size={12} /></a>
                  <BookMeta item={item} />
                  <p>{item.focus}</p>
                  <div className="reading-topics">{item.topic_ids.map(id => <span key={id} className="code-chip">{id}</span>)}</div>
                </div>
                <div className="reading-row-side">
                  {status && <span className={`status-pill ${status === 'done' ? 'done' : 'in_progress'}`}>{status === 'done' ? 'Concluída' : 'Lendo'}</span>}
                  <ReadingActions item={item} status={status} onSet={onSet} ready={ready} />
                </div>
              </div>;
            })}
          </div></div>}
        </section>;
      })}
    </div>

    <section className="insight-grid library-bottom">
      <div className="mini-panel">
        <h3>Leitura leve (rodízio semanal)</h3>
        <ol className="plain-list">{TRAIL.career_rotation.map(id => { const b = bookById(id); return b && <li key={id}><a href={bookUrl(b)} target="_blank" rel="noopener noreferrer">{b.title}</a> <small>— {b.author}</small></li>; })}</ol>
      </div>
      <div className="mini-panel">
        <h3>Lacunas da biblioteca</h3>
        <ul className="plain-list">{TRAIL.library_gaps.map(g => <li key={g.area}><b>{g.area}:</b> {g.suggestion}</li>)}</ul>
      </div>
    </section>
  </>;
}
