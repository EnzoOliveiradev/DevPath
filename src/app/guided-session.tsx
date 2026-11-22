'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import {
  ArrowRight, BookOpen, Check, CheckCircle2, CircleX, Eye, ExternalLink, Lightbulb, Play, Terminal, Undo2, X
} from 'lucide-react';
import type { StudyTopic } from '@/lib/model';
import { stageOf, type CodeExercise, type ConceptExercise, type Exercise, type ExplainExercise, type PredictExercise, type TopicGuide } from '@/lib/exercises';
import { scoreOutcomes, type ExerciseOutcome, type SessionScore } from '@/lib/guided';
import { runInWorker, type RunResult } from '@/lib/runner';
import { addDays, intervalFromRecall } from '@/lib/planner';

export interface GuidedResult { outcomes: ExerciseOutcome[]; score: SessionScore; durationMinutes: number; notes: string }

const AUTONOMY_LABEL = ['Resolveu sozinho', 'Pouca ajuda (1–2 dicas)', 'Várias dicas', 'Precisou ver a solução'];
const MIN_EXPLANATION = 20;

type Resolve = (outcome: Omit<ExerciseOutcome, 'exerciseId' | 'kind'>) => void;

function niceDate(value: string): string {
  return new Date(`${value}T12:00:00`).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
}

export function GuidedSession({ topic, guide, today, saving, saveError, onClose, onSave }: {
  topic: StudyTopic; guide: TopicGuide; today: string; saving: boolean; saveError?: string;
  onClose: () => void; onSave: (result: GuidedResult) => Promise<void>;
}) {
  const exercises = guide.exercises;
  const [step, setStep] = useState(-1);
  const [outcomes, setOutcomes] = useState<(ExerciseOutcome | undefined)[]>(() => exercises.map(() => undefined));
  const startedAt = useRef(Date.now());
  const [duration, setDuration] = useState(25);
  const [notes, setNotes] = useState('');

  const finished = step >= exercises.length;
  const current = !finished && step >= 0 ? exercises[step] : undefined;
  const resolved = current ? outcomes[step] !== undefined : false;
  const done = outcomes.filter((o): o is ExerciseOutcome => o !== undefined);
  const score = scoreOutcomes(done);

  function resolve(index: number, exercise: Exercise): Resolve {
    return outcome => setOutcomes(prev => prev.map((o, i) => i === index ? { exerciseId: exercise.id, kind: exercise.kind, ...outcome } : o));
  }
  function next() {
    if (step + 1 >= exercises.length) {
      setDuration(Math.min(240, Math.max(1, Math.round((Date.now() - startedAt.current) / 60000))));
    }
    setStep(s => s + 1);
  }
  function skip() {
    if (current) resolve(step, current)({ correct: false, hintsUsed: 0, solutionViewed: false, answer: '' });
    next();
  }
  function close() {
    if (saving) return;
    if (done.length > 0 && !window.confirm('Sair sem salvar? O progresso desta sessão guiada será perdido.')) return;
    onClose();
  }

  return <div className="overlay" onClick={close}>
    <div className="modal guided" role="dialog" aria-modal="true" aria-label={`Sessão guiada: ${topic.title}`} onClick={e => e.stopPropagation()}>
      <div className="modal-head">
        <div><div className="eyebrow">SESSÃO GUIADA · {topic.code ? `${topic.code} · ` : ''}{topic.track.toUpperCase()}</div><h2>{topic.title}</h2></div>
        <button className="btn-icon" onClick={close} aria-label="Fechar"><X size={20} /></button>
      </div>
      <div className="guided-progress" aria-label={`Etapa ${Math.max(0, Math.min(step + 1, exercises.length))} de ${exercises.length}`}>
        {exercises.map((ex, i) => {
          const o = outcomes[i];
          const state = o === undefined ? (i === step ? 'current' : '') : o.correct === null ? 'neutral' : o.correct ? 'ok' : 'fail';
          return <span key={ex.id} className={state} title={stageOf(ex)} />;
        })}
      </div>

      {step === -1 && <div className="guided-body">
        <div className="guided-stage"><BookOpen size={15} /> Conceitos-chave</div>
        <ul className="guided-summary">{guide.summary.map(s => <li key={s}>{s}</li>)}</ul>
        {topic.resource_url && <a className="guided-link" href={topic.resource_url} target="_blank" rel="noopener noreferrer">Abrir material de referência <ExternalLink size={13} /></a>}
        <div className="guided-note">
          <strong>Como funciona</strong>
          <p>{exercises.length} exercícios seguindo o método PRIMM: <b>prever</b> a saída, <b>executar</b> para conferir, <b>investigar</b> explicando o código, <b>modificar</b> e <b>criar</b>. A plataforma corrige suas respostas e calcula a nota de memória e o nível de ajuda.</p>
          <p>Tente sem consultar o material. Dicas não reduzem a nota, apenas o nível de autonomia; ver a solução anula o acerto daquele exercício.</p>
        </div>
      </div>}

      {current && <div className="guided-body" key={current.id}>
        <div className="guided-stage">{stageOf(current)} <span>· {step + 1} de {exercises.length}</span></div>
        {current.kind === 'predict' && <ChoiceView exercise={current} onResolve={resolve(step, current)} />}
        {current.kind === 'concept' && <ChoiceView exercise={current} onResolve={resolve(step, current)} />}
        {current.kind === 'explain' && <ExplainView exercise={current} onResolve={resolve(step, current)} />}
        {current.kind === 'code' && <CodeView exercise={current} onResolve={resolve(step, current)} />}
      </div>}

      {finished && <div className="guided-body">
        <div className="guided-stage"><CheckCircle2 size={15} /> Resultado da sessão</div>
        <div className="guided-score">
          <div><strong>{score.correct}/{score.total}</strong><span>acertos corrigidos</span></div>
          <div><strong>{score.recall}/5</strong><span>nota de memória</span></div>
          <div><strong>{score.autonomy}/3</strong><span>{AUTONOMY_LABEL[score.autonomy]}</span></div>
        </div>
        <ul className="guided-results">{exercises.map((ex, i) => {
          const o = outcomes[i];
          return <li key={ex.id}>
            {o?.correct === true && !o.solutionViewed ? <CheckCircle2 size={16} className="ok" /> : o?.correct === null ? <Check size={16} className="neutral" /> : <CircleX size={16} className="fail" />}
            <span>{stageOf(ex)}</span>
            <small>{o?.correct === null ? 'explicação registrada' : o?.solutionViewed ? 'solução vista' : o?.correct ? (o.hintsUsed ? `acertou com ${o.hintsUsed} dica(s)` : 'acertou') : 'não acertou'}</small>
          </li>;
        })}</ul>
        <form className="modal-form" onSubmit={e => { e.preventDefault(); void onSave({ outcomes: done, score, durationMinutes: duration, notes }); }}>
          <label>Duração real (minutos)<input type="number" min={1} max={240} required value={duration} onChange={e => setDuration(Number(e.target.value))} /></label>
          <label>O que aprendeu e onde travou?<textarea rows={3} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Ex.: entendi o reduce; ainda erro a ordem do finally." /></label>
          {saveError && <div className="error-banner" role="alert"><span>{saveError}</span></div>}
          <div className="review-preview"><span>Próxima revisão: <strong>{niceDate(addDays(today, intervalFromRecall(score.recall)))}</strong>, calculada pelos seus acertos.</span></div>
          <button type="submit" disabled={saving} className="btn primary full">{saving ? 'Salvando...' : 'Salvar sessão guiada'} <Check size={17} /></button>
        </form>
      </div>}

      {!finished && <div className="guided-foot">
        {step === -1
          ? <button className="btn primary" onClick={next}>Começar exercícios <ArrowRight size={16} /></button>
          : <>
            {current?.kind === 'code' && !resolved && <button className="btn text" onClick={skip}>Pular exercício</button>}
            <button className="btn primary" disabled={!resolved} onClick={next}>{step + 1 === exercises.length ? 'Ver resultado' : 'Próximo'} <ArrowRight size={16} /></button>
          </>}
      </div>}
    </div>
  </div>;
}

function Hints({ hints, shown, onShow, locked }: { hints?: string[]; shown: number; onShow: () => void; locked: boolean }) {
  if (!hints?.length) return null;
  return <div className="guided-hints">
    {hints.slice(0, shown).map((h, i) => <p key={i}><Lightbulb size={14} />{h}</p>)}
    {shown < hints.length && !locked && <button type="button" className="btn text small" onClick={onShow}><Lightbulb size={14} /> Pedir dica ({hints.length - shown})</button>}
  </div>;
}

function Console({ result }: { result: RunResult }) {
  return <div className="console-out">
    <div className="console-title"><Terminal size={13} /> Console</div>
    {result.logs.length === 0 && !result.error && <pre className="muted">(nenhuma saída)</pre>}
    {result.logs.length > 0 && <pre>{result.logs.join('\n')}</pre>}
    {result.error && <pre className="console-error">{result.error}</pre>}
  </div>;
}

function ChoiceView({ exercise, onResolve }: { exercise: PredictExercise | ConceptExercise; onResolve: Resolve }) {
  const [choice, setChoice] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [hints, setHints] = useState(0);
  const [run, setRun] = useState<RunResult | null>(null);
  const [running, setRunning] = useState(false);
  const predict = exercise.kind === 'predict';

  function confirm() {
    if (choice === null) return;
    setConfirmed(true);
    onResolve({ correct: choice === exercise.answer, hintsUsed: hints, solutionViewed: false, answer: exercise.options[choice] });
  }
  async function execute() {
    if (!predict) return;
    setRunning(true);
    setRun(await runInWorker(exercise.code));
    setRunning(false);
  }

  return <>
    <h3 className="guided-prompt">{predict ? (exercise.prompt ?? 'O que este código exibe no console?') : exercise.prompt}</h3>
    {predict && <pre className="code-block"><code>{exercise.code}</code></pre>}
    {predict && <p className="guided-hint-text">Arrays e objetos aparecem em formato JSON.</p>}
    <div className="choice-list" role="radiogroup">
      {exercise.options.map((opt, i) => {
        const state = confirmed ? (i === exercise.answer ? 'right' : i === choice ? 'wrong' : '') : i === choice ? 'selected' : '';
        return <button type="button" role="radio" aria-checked={i === choice} key={i} disabled={confirmed} className={`choice ${state}`} onClick={() => setChoice(i)}>
          <span className="choice-letter">{String.fromCharCode(65 + i)}</span>
          {predict ? <pre>{opt}</pre> : <span>{opt}</span>}
        </button>;
      })}
    </div>
    <Hints hints={exercise.hints} shown={hints} onShow={() => setHints(h => h + 1)} locked={confirmed} />
    {!confirmed && <button className="btn primary" disabled={choice === null} onClick={confirm}>Confirmar resposta <Check size={16} /></button>}
    {confirmed && <div className={`feedback ${choice === exercise.answer ? 'ok' : 'fail'}`}>
      <strong>{choice === exercise.answer ? 'Correto!' : 'Não foi dessa vez.'}</strong>
      <p>{exercise.explanation}</p>
    </div>}
    {confirmed && predict && <div className="guided-actions">
      <button className="btn secondary small" onClick={execute} disabled={running}><Play size={14} /> {running ? 'Executando...' : 'Executar e conferir'}</button>
    </div>}
    {run && <Console result={run} />}
  </>;
}

function ExplainView({ exercise, onResolve }: { exercise: ExplainExercise; onResolve: Resolve }) {
  const [text, setText] = useState('');
  const [revealed, setRevealed] = useState(false);
  const enough = text.trim().length >= MIN_EXPLANATION;
  return <>
    <h3 className="guided-prompt">{exercise.prompt}</h3>
    {exercise.code && <pre className="code-block"><code>{exercise.code}</code></pre>}
    <label className="guided-label">Sua explicação, com suas palavras
      <textarea rows={4} value={text} readOnly={revealed} onChange={e => setText(e.target.value)} placeholder="Explique o que acontece e por quê, sem consultar o material." />
    </label>
    {!revealed && <button className="btn primary" disabled={!enough} onClick={() => { setRevealed(true); onResolve({ correct: null, hintsUsed: 0, solutionViewed: false, answer: text.trim() }); }}>
      Comparar com a referência <Eye size={16} />
    </button>}
    {!revealed && !enough && <p className="guided-hint-text">Escreva pelo menos {MIN_EXPLANATION} caracteres para liberar a comparação.</p>}
    {revealed && <div className="feedback neutral"><strong>Resposta de referência</strong><p>{exercise.modelAnswer}</p><p className="feedback-tip">Compare: você citou as mesmas causas? O que faltou na sua explicação? Anote nas observações ao final.</p></div>}
  </>;
}

function CodeView({ exercise, onResolve }: { exercise: CodeExercise; onResolve: Resolve }) {
  const [code, setCode] = useState(exercise.starter);
  const [run, setRun] = useState<RunResult | null>(null);
  const [running, setRunning] = useState(false);
  const [hints, setHints] = useState(0);
  const [solutionViewed, setSolutionViewed] = useState(false);
  const [passed, setPassed] = useState(false);
  const editor = useRef<HTMLTextAreaElement>(null);

  async function execute() {
    setRunning(true);
    const result = await runInWorker(code, exercise.tests);
    setRun(result);
    setRunning(false);
    const allPass = !result.error && result.results.length > 0 && result.results.every(r => r.pass);
    if (allPass) setPassed(true);
    if (allPass || solutionViewed) onResolve({ correct: allPass && !solutionViewed, hintsUsed: hints, solutionViewed, answer: code });
  }
  function showSolution() {
    if (!window.confirm('Ver a solução anula o acerto deste exercício. Continuar?')) return;
    setSolutionViewed(true);
    onResolve({ correct: false, hintsUsed: hints, solutionViewed: true, answer: code });
  }
  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key !== 'Tab' || e.shiftKey) return;
    e.preventDefault();
    const el = e.currentTarget;
    const { selectionStart: start, selectionEnd: end } = el;
    setCode(code.slice(0, start) + '  ' + code.slice(end));
    requestAnimationFrame(() => { if (editor.current) editor.current.selectionStart = editor.current.selectionEnd = start + 2; });
  }

  return <>
    <h3 className="guided-prompt">{exercise.prompt}</h3>
    <textarea ref={editor} className="code-editor" spellCheck={false} autoCapitalize="off" autoCorrect="off" value={code}
      onChange={e => setCode(e.target.value)} onKeyDown={onKeyDown} rows={Math.max(6, code.split('\n').length + 1)} aria-label="Editor de código" />
    <div className="guided-actions">
      <button className="btn primary small" onClick={execute} disabled={running}><Play size={14} /> {running ? 'Executando...' : 'Executar testes'}</button>
      <button className="btn secondary small" onClick={() => setCode(exercise.starter)}><Undo2 size={14} /> Restaurar</button>
      {!solutionViewed && !passed && <button className="btn text small" onClick={showSolution}><Eye size={14} /> Ver solução</button>}
    </div>
    <Hints hints={exercise.hints} shown={hints} onShow={() => setHints(h => h + 1)} locked={passed || solutionViewed} />
    {run && <div className="test-results">
      {run.results.map((r, i) => {
        const label = exercise.tests[i]?.label;
        return <div key={i} className={`test-row ${r.pass ? 'ok' : 'fail'}`}>
          {r.pass ? <CheckCircle2 size={15} /> : <CircleX size={15} />}
          <div><code>{label ?? r.call}</code>{!r.pass && <small>Esperado <b>{r.expected}</b>, recebido <b>{r.actual}</b></small>}</div>
        </div>;
      })}
      {(run.logs.length > 0 || run.error) && <Console result={run} />}
    </div>}
    {passed && <div className="feedback ok"><strong>{solutionViewed ? 'Testes passando.' : 'Todos os testes passaram!'}</strong><p>{solutionViewed ? 'Bom para fixar, mas este exercício não conta como acerto. Tente refazê-lo do zero na próxima revisão.' : 'Compare com a solução de referência abaixo, se quiser outra abordagem.'}</p></div>}
    {(solutionViewed || passed) && <details className="solution" open={solutionViewed}>
      <summary>Solução de referência</summary>
      <pre className="code-block"><code>{exercise.solution}</code></pre>
      {solutionViewed && !passed && <button className="btn secondary small" onClick={() => setCode(exercise.solution)}>Copiar para o editor</button>}
    </details>}
  </>;
}
