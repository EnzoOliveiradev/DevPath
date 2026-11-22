import { test } from 'node:test';
import assert from 'node:assert/strict';
import { GUIDES, guideFor } from '../src/lib/exercises.ts';
import { RUNNER_SOURCE } from '../src/lib/runner.ts';
import { scoreOutcomes, accuracy } from '../src/lib/guided.ts';
import { TRAIL } from '../src/lib/trail.ts';

// O mesmo código-fonte que roda no Web Worker do navegador.
const executeCode = new Function(RUNNER_SOURCE + '\nreturn executeCode;')();
const asTests = tests => tests.map(t => ({ call: t.call, expected: t.expected === undefined ? 'undefined' : JSON.stringify(t.expected) }));
const all = GUIDES.flatMap(g => g.exercises.map(e => ({ guide: g, e })));

test('executor captura console, erros de sintaxe e erros em tempo de execução', () => {
  assert.deepEqual(executeCode("console.log('a', 1, [1,2], {x:1}, null, undefined)", []).logs, ['a 1 [1,2] {"x":1} null undefined']);
  assert.match(executeCode('const = 1', []).error, /SyntaxError/);
  assert.match(executeCode('naoExiste()', []).error, /ReferenceError/);
  const r = executeCode('function f(x) { if (x) throw new Error("boom"); return 1; }', asTests([{ call: 'f(0)', expected: 1 }, { call: 'f(1)', expected: 1 }]));
  assert.deepEqual(r.results.map(x => x.pass), [true, false]);
  assert.match(r.results[1].actual, /Error: boom/);
});

test('executor roda em modo estrito e enxerga declarações let/const do estudante', () => {
  assert.match(executeCode('semDeclarar = 1', []).error, /ReferenceError/);
  const r = executeCode('const dobro = n => n * 2;', asTests([{ call: 'dobro(4)', expected: 8 }]));
  assert.equal(r.results[0].pass, true);
});

test('cada guia corresponde a um conteúdo da trilha pelo código', () => {
  for (const g of GUIDES) {
    const topic = TRAIL.topics.find(t => t.id === g.code);
    assert.ok(topic, `${g.code} não existe na trilha`);
    assert.equal(topic.title, g.title, g.code);
    assert.equal(guideFor({ code: g.code, title: 'outro' }), g);
  }
  // Bancos sem a migração v3 (sem code) ainda encontram o guia pelo título.
  assert.equal(guideFor({ title: 'Closures e callbacks' })?.code, 'C03-02');
  assert.equal(guideFor({ code: 'C99-99', title: 'Closures e callbacks' }), undefined);
});

test('ids únicos e cada guia percorre as etapas do PRIMM', () => {
  const ids = all.map(x => x.e.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const g of GUIDES) {
    const kinds = new Set(g.exercises.map(e => e.kind));
    for (const k of ['predict', 'explain', 'code']) assert.ok(kinds.has(k), `${g.title} sem ${k}`);
    assert.ok(g.summary.length >= 2);
  }
});

test('gabarito de cada "Prever" é exatamente a saída real do código', () => {
  for (const { e } of all.filter(x => x.e.kind === 'predict')) {
    const r = executeCode(e.code, []);
    assert.equal(r.error, undefined, e.id);
    assert.equal(r.logs.join('\n'), e.options[e.answer], e.id);
    assert.equal(new Set(e.options).size, e.options.length, `${e.id}: opções repetidas`);
  }
});

test('questões de múltipla escolha têm gabarito válido', () => {
  for (const { e } of all.filter(x => x.e.kind === 'concept')) {
    assert.ok(Number.isInteger(e.answer) && e.answer >= 0 && e.answer < e.options.length, e.id);
    assert.equal(new Set(e.options).size, e.options.length, e.id);
  }
});

test('solução de referência passa em todos os testes e o código inicial falha em algum', () => {
  for (const { e } of all.filter(x => x.e.kind === 'code')) {
    const tests = asTests(e.tests);
    const solved = executeCode(e.solution, tests);
    assert.equal(solved.error, undefined, e.id);
    assert.ok(solved.results.every(r => r.pass), `${e.id}: ${JSON.stringify(solved.results)}`);
    const starter = executeCode(e.starter, tests);
    assert.ok(starter.error || starter.results.some(r => !r.pass), `${e.id}: código inicial já passa`);
    assert.ok((e.hints ?? []).length >= 1, `${e.id}: sem dicas`);
  }
});

const o = (correct, extra = {}) => ({ exerciseId: 'x', kind: 'code', correct, hintsUsed: 0, solutionViewed: false, answer: '', ...extra });

test('nota calculada ignora explicações livres e não conta acerto com solução vista', () => {
  assert.deepEqual(scoreOutcomes([o(true), o(true), o(false), o(null, { kind: 'explain' })]), { correct: 2, total: 3, recall: 3, autonomy: 0 });
  assert.deepEqual(scoreOutcomes([o(true), o(true, { solutionViewed: true })]), { correct: 1, total: 2, recall: 3, autonomy: 3 });
  assert.equal(scoreOutcomes([o(true), o(true), o(true), o(true)]).recall, 5);
  assert.equal(scoreOutcomes([]).recall, 0);
});

test('nível de ajuda cresce com as dicas usadas', () => {
  assert.equal(scoreOutcomes([o(true, { hintsUsed: 1 })]).autonomy, 1);
  assert.equal(scoreOutcomes([o(true, { hintsUsed: 2 })]).autonomy, 1);
  assert.equal(scoreOutcomes([o(true, { hintsUsed: 2 }), o(true, { hintsUsed: 1 })]).autonomy, 2);
});

test('acerto objetivo considera apenas sessões guiadas', () => {
  assert.equal(accuracy([{ correct_count: 3, total_count: 4 }, { correct_count: null, total_count: null }, { correct_count: 1, total_count: 4 }]), 0.5);
  assert.equal(accuracy([{}]), null);
});
