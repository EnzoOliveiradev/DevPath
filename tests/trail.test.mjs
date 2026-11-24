import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { TRAIL, PHASES, YDKJS, catalogRows, planTrailSync, weeklyReading, isoWeek, careerBookOfWeek, bookUrl, bookById, readingForTopic, upcomingClasses, chapterUrl, chapterTitle, pdfRawUrl } from '../src/lib/trail.ts';
import { planDay, currentPhase, phaseProgress, isUnlocked, codeIndex, weekday } from '../src/lib/planner.ts';

const topics = TRAIL.topics;
const ids = new Set(topics.map(t => t.id));

// ---------- Integridade do JSON ----------

test('IDs únicos, títulos únicos por área e campos obrigatórios', () => {
  assert.equal(ids.size, topics.length);
  const keys = topics.map(t => `${t.track}::${t.title}`);
  assert.equal(new Set(keys).size, keys.length, 'study_topics tem unique(user_id, track, title)');
  for (const t of topics) {
    assert.match(t.id, /^[A-Z][A-Z0-9-]{1,15}$/, t.id);
    assert.ok(t.title && t.description && t.practice && t.evidence, t.id);
    assert.ok(t.estimated_minutes >= 5 && t.estimated_minutes <= 240, t.id);
    assert.ok([1, 2, 3].includes(t.priority), t.id);
    assert.ok(t.resource_url?.startsWith('https://'), t.id);
  }
});

test('cada etapa termina no desafio de saída, que exige os obrigatórios da etapa', () => {
  assert.equal(PHASES.length, 14);
  PHASES.forEach((p, i) => {
    const items = topics.filter(t => t.phase === p.id);
    assert.deepEqual(items.map(t => t.id), p.topic_ids, `ordem da etapa ${p.id}`);
    assert.equal(p.topic_ids.at(-1), p.checkpoint_id);
    const checkpoint = topics.find(t => t.id === p.checkpoint_id);
    assert.equal(checkpoint.kind, 'checkpoint');
    assert.deepEqual(checkpoint.prerequisite_ids, items.filter(t => t.kind === 'core' && !t.optional).map(t => t.id));
    const previous = i === 0 ? null : PHASES[i - 1].checkpoint_id;
    assert.equal(p.prerequisite_checkpoint, previous);
    for (const t of items.filter(t => t.kind === 'core')) assert.deepEqual(t.prerequisite_ids, previous ? [previous] : [], t.id);
  });
});

test('pré-requisitos existem e não há ciclos', () => {
  const byId = new Map(topics.map(t => [t.id, t]));
  for (const t of topics) for (const p of t.prerequisite_ids) assert.ok(ids.has(p), `${t.id} → ${p}`);
  const visiting = new Set(), done = new Set();
  const visit = id => {
    if (done.has(id)) return;
    assert.ok(!visiting.has(id), `ciclo em ${id}`);
    visiting.add(id);
    for (const p of byId.get(id).prerequisite_ids) visit(p);
    visiting.delete(id); done.add(id);
  };
  topics.forEach(t => visit(t.id));
});

test('a trilha 2.1 preserva todos os 136 itens principais da 2.0', () => {
  const v2 = JSON.parse(readFileSync('trilha/arquivo/v2.0/devpath-trilha-v2.json', 'utf8'));
  const legacy = new Set(topics.map(t => t.legacy_id).filter(Boolean));
  for (const t of v2.topics) assert.ok(legacy.has(t.id), `${t.id} sumiu`);
  assert.equal(topics.filter(t => t.kind !== 'postgrad').length, 144);
  assert.equal(topics.filter(t => t.kind === 'postgrad').length, 16);
});

test('ordem pedagógica corrigida: testes e Git antes do mini projeto; dados antes do backend', () => {
  const pos = id => topics.findIndex(t => t.id === id);
  const byTitle = title => topics.find(t => t.title === title);
  assert.ok(pos(byTitle('Testes automatizados com node:test').id) < pos(byTitle('Mini projeto JS — estoque EZBikes').id));
  assert.ok(pos(byTitle('Git essencial: commits, branches e GitHub').id) < pos(byTitle('Mini projeto JS — estoque EZBikes').id));
  assert.ok(byTitle('SQL: consultas e JOINs').phase < byTitle('Criar uma API com Node.js').phase);
  assert.ok(byTitle('HTML semântico, CSS e DOM').phase === byTitle('React: componentes e props').phase);
  assert.ok(pos(byTitle('Burp Suite: proxy e repeater em laboratório').id) < pos(byTitle('Broken Access Control e IDOR').id));
  assert.equal(topics[0].title, 'Ambiente de estudo: VS Code, terminal e Node.js');
});

test('livros: plano aponta para livros e conteúdos existentes, com links válidos', () => {
  for (const r of TRAIL.reading_plan) {
    const book = bookById(r.book_id);
    assert.ok(book, r.id);
    assert.ok(['principal', 'apoio', 'consulta'].includes(r.role), r.id);
    assert.ok(r.focus.length > 20, r.id);
    for (const id of r.topic_ids) assert.ok(ids.has(id), `${r.id} → ${id}`);
    assert.match(r.id, /^L[0-9P]{1,3}-[0-9]{1,3}$/, 'mesmo formato aceito por reading_progress.item_id');
  }
  for (const phase of PHASES) assert.ok(TRAIL.reading_plan.some(r => r.phase === phase.id && r.role === 'principal'), `etapa ${phase.id} sem leitura principal`);
  const pdf = bookUrl(bookById('entendendo-algoritmos'));
  assert.ok(pdf.startsWith('https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/'));
  assert.ok(!pdf.includes(' '), 'espaços codificados');
  assert.equal(bookUrl(bookById('eloquent-js')), 'https://eloquentjavascript.net/');
  for (const id of TRAIL.career_rotation) assert.ok(bookById(id), id);
  assert.ok(readingForTopic('C04-01').length >= 1);
});

test("You Don't Know JS em português: 6 livros, capítulos válidos e só links para o GitHub", () => {
  const ydkjs = TRAIL.library.books.filter(b => b.source === 'ydkjs-pt');
  assert.deepEqual(ydkjs.map(b => b.dir), ['up & going', 'types & grammar', 'scope & closures', 'this & object prototypes', 'async & performance', 'es6 & beyond']);
  for (const b of ydkjs) {
    assert.equal(b.lang, 'pt');
    assert.ok(b.chapters.length >= 3, b.id);
    for (const c of b.chapters) assert.match(c.id, /^(ch\d|ap[A-D])$/, `${b.id}/${c.id}`);
    assert.equal(pdfRawUrl(b), undefined, 'a tradução não pode ser renderizada fora do GitHub');
  }
  const withChapters = TRAIL.reading_plan.filter(r => r.chapters?.length);
  assert.ok(withChapters.length >= 10);
  for (const r of withChapters) {
    const b = bookById(r.book_id);
    assert.equal(b.source, 'ydkjs-pt', r.id);
    for (const c of r.chapters) assert.ok(b.chapters.some(x => x.id === c), `${r.id}: ${c}`);
  }
  const escopos = bookById('ydkjs-escopos');
  assert.equal(chapterUrl(escopos, 'ch5'), 'https://github.com/nao-sabemos-js/You-Dont-Know-JS/blob/portuguese-translation/scope%20%26%20closures/ch5.md');
  assert.equal(chapterTitle(escopos, 'ch5'), 'Capítulo 5: Closures de Escopo');
  assert.equal(bookUrl(escopos), YDKJS.file_base_url + 'scope%20%26%20closures/README.md');
  assert.equal(bookById('ydkjs'), undefined, 'versão em inglês substituída pela tradução');
  assert.equal(TRAIL.reading_plan.find(r => r.id === 'L03-1').book_id, 'ydkjs-escopos', 'ID de semana preservado');
});

test('leitor do app: só PDFs da BibliotecaDev, pelo endereço raw do GitHub', () => {
  const pdf = pdfRawUrl(bookById('entendendo-algoritmos'));
  assert.ok(pdf.startsWith('https://raw.githubusercontent.com/EnzoOliveiradev/BibliotecaDev/main/LivrosDev/'));
  assert.ok(!pdf.includes(' '), 'sem espaços');
  assert.ok(pdf.endsWith('.pdf'));
  assert.equal(pdfRawUrl(bookById('eloquent-js')), undefined);
  for (const b of TRAIL.library.books.filter(b => b.source === 'bibliotecadev')) assert.ok(pdfRawUrl(b), b.id);
});

// ---------- Sincronização com o banco ----------

const row = (over = {}) => ({
  id: 'r' + Math.random(), user_id: 'u', status: 'todo', next_review_on: null, created_at: '', ...over
});
const synced = () => catalogRows('u').map(r => row({ ...r, prerequisite_codes: r.prerequisite_codes }));

test('sincronização: banco vazio cria tudo; banco sincronizado não faz nada', () => {
  const empty = planTrailSync([]);
  assert.equal(empty.missing, 160);
  assert.equal(empty.needsUpsert, true);
  const same = planTrailSync(synced());
  assert.deepEqual(same, { adopt: [], missing: 0, outdated: 0, needsUpsert: false });
});

test('sincronização: adota assunto antigo de mesmo título e detecta metadados desatualizados', () => {
  const rows = synced().filter(r => r.code !== 'C03-02');
  rows.push(row({ code: null, track: 'JavaScript', title: 'Closures e callbacks', status: 'done' }));
  rows.find(r => r.code === 'C01-03').sort_order = 999;
  const plan = planTrailSync(rows);
  assert.equal(plan.adopt.length, 1);
  assert.equal(plan.adopt[0].code, 'C03-02');
  assert.equal(plan.missing, 0);
  assert.equal(plan.outdated, 2);
  assert.ok(plan.needsUpsert);
  assert.ok(!('status' in catalogRows('u')[0]), 'upsert não sobrescreve o progresso');
});

// ---------- Portões e agenda ----------

const asTopics = (overrides = {}) => synced().map(r => ({ ...r, id: r.code, ...(overrides[r.code] ?? {}) }));
const doneAll = (phase, extra = {}) => Object.fromEntries(TRAIL.topics.filter(t => t.phase === phase).map(t => [t.id, { status: 'done', ...extra }]));

test('etapa 1 liberada no início; desafio e etapa 2 bloqueados', () => {
  const list = asTopics();
  const byCode = codeIndex(list);
  assert.equal(currentPhase(list), 1);
  assert.ok(isUnlocked(byCode.get('C01-03'), byCode));
  assert.ok(!isUnlocked(byCode.get('C01-11'), byCode), 'desafio exige a etapa');
  assert.ok(!isUnlocked(byCode.get('C02-01'), byCode), 'etapa 2 exige o desafio 1');
  const progress = phaseProgress(list);
  assert.equal(progress.length, 14);
  assert.equal(progress[0].requiredLeft, 10);
  assert.ok(progress[0].unlocked && !progress[1].unlocked);
});

test('concluir o desafio libera a próxima etapa; opcionais não bloqueiam o desafio', () => {
  const list = asTopics({ ...doneAll(1), ...doneAll(2), ...doneAll(3), ...doneAll(4), ...doneAll(5), 'C06-08': { status: 'todo' }, ...Object.fromEntries(['C06-01','C06-02','C06-03','C06-04','C06-05','C06-06','C06-07'].map(c => [c, { status: 'done' }])) });
  const byCode = codeIndex(list);
  assert.equal(currentPhase(list), 6);
  assert.ok(isUnlocked(byCode.get('C06-09'), byCode), 'NoSQL (opcional) não bloqueia o desafio 06');
  assert.ok(!isUnlocked(byCode.get('C07-01'), byCode));
});

test('agenda segue a ordem da trilha e sinaliza o desafio de saída', () => {
  const sunday = '2026-11-22';
  assert.equal(weekday(sunday), 0);
  const fresh = asTopics(Object.fromEntries(TRAIL.topics.filter(t => t.kind === 'postgrad').map(t => [t.id, { status: 'done' }])));
  assert.deepEqual(planDay(fresh, sunday, 3, 90).map(p => p.topic.code), ['C01-01', 'C01-02', 'C01-03']);
  const ready = asTopics({ ...Object.fromEntries(TRAIL.topics.filter(t => t.kind === 'postgrad').map(t => [t.id, { status: 'done' }])), ...Object.fromEntries(TRAIL.topics.filter(t => t.phase === 1 && t.kind === 'core').map(t => [t.id, { status: 'done' }])) });
  const plan = planDay(ready, sunday, 3, 90);
  assert.equal(plan[0].topic.code, 'C01-11');
  assert.equal(plan[0].reason, 'Desafio de saída');
  assert.ok(plan.every(p => p.topic.code !== 'C02-01'), 'etapa 2 ainda bloqueada');
});

test('prazos em 14 dias: 1 entrega com orçamento < 75 min, até 2 com orçamento maior', () => {
  const list = asTopics();
  const today = '2026-11-22';
  const small = planDay(list, today, 3, 60);
  assert.equal(small.filter(p => p.reason === 'Entrega próxima').length, 1);
  assert.equal(small[0].topic.code, 'P01');
  const big = planDay(list, today, 4, 120);
  assert.deepEqual(big.filter(p => p.reason === 'Entrega próxima').map(p => p.topic.code), ['P01', 'P02']);
  const far = planDay(list, '2026-11-01', 3, 120);
  assert.ok(far.every(p => p.reason !== 'Entrega próxima'), 'P01 vence em 29 dias, fora da janela');
});

test('pós em paralelo às terças, quintas e sábados, priorizando a próxima aula', () => {
  const noDeadlines = Object.fromEntries(['P01', 'P02', 'P03'].map(c => [c, { status: 'done' }]));
  const list = asTopics(noDeadlines);
  const tuesday = '2026-11-24';
  assert.equal(weekday(tuesday), 2);
  const plan = planDay(list, tuesday, 3, 90);
  const pos = plan.find(p => p.reason === 'Pós em paralelo');
  assert.equal(pos?.topic.code, 'P07', 'aula de IA generativa em 28/11 é a mais próxima');
  const monday = planDay(list, '2026-11-23', 3, 90);
  assert.ok(monday.every(p => p.reason !== 'Pós em paralelo'));
});

test('em andamento e revisão vencida entram antes da próxima etapa; bloqueados não entram', () => {
  const list = asTopics({ 'C01-05': { status: 'in_progress' }, 'C01-03': { status: 'done', next_review_on: '2026-11-20' }, 'C02-01': { status: 'in_progress' }, ...Object.fromEntries(['P01','P02','P03'].map(c => [c, { status: 'done' }])) });
  const plan = planDay(list, '2026-11-22', 3, 90);
  assert.deepEqual(plan.map(p => [p.topic.code, p.reason]), [['C01-03', 'Revisão pendente'], ['C01-05', 'Em andamento'], ['C01-01', 'Próxima etapa']]);
});

// ---------- Livros da semana ----------

test('livro da semana: leitura em andamento, depois a primeira aberta da etapa atual', () => {
  const progress = new Map();
  assert.equal(weeklyReading(1, progress).id, 'L01-1');
  progress.set('L01-1', 'done');
  assert.equal(weeklyReading(1, progress).id, 'L01-4', 'segue a ordem do plano, não o número do ID');
  progress.set('L02-3', 'reading');
  assert.equal(weeklyReading(1, progress).id, 'L02-3');
  progress.delete('L02-3');
  for (const r of TRAIL.reading_plan.filter(r => r.phase === 4)) progress.set(r.id, 'done');
  assert.equal(weeklyReading(4, progress).id, 'L01-4', 'etapa lida: volta às pendentes anteriores');
  assert.notEqual(weeklyReading(4, progress).role, 'consulta');
});

test('semana ISO e rodízio de leitura leve', () => {
  assert.equal(isoWeek('2026-11-22'), 47);
  assert.equal(isoWeek('2027-01-01'), 53);
  assert.equal(isoWeek('2026-01-01'), 1);
  assert.ok(careerBookOfWeek('2026-11-22'));
  assert.notEqual(careerBookOfWeek('2026-11-22').id, careerBookOfWeek('2026-11-29').id);
  assert.deepEqual(upcomingClasses('2026-11-29', 2).map(c => c.date), ['2026-12-12', '2027-02-20']);
});

test('SQL v3: colunas, chave de sincronização e RLS de reading_progress', () => {
  const sql = readFileSync('supabase/v3_trilha.sql', 'utf8');
  assert.match(sql, /unique \(user_id, code\)/);
  assert.match(sql, /'Cibersegurança'/);
  assert.match(sql, /alter table public\.reading_progress enable row level security/);
  for (const p of ['reading_read_own', 'reading_insert_own', 'reading_update_own', 'reading_delete_own']) assert.match(sql, new RegExp(p));
  assert.doesNotMatch(sql, /grant[^;]*to anon/i);
});
