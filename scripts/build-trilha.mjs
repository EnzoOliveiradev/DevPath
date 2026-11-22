// Gera trilha/TRILHA_COMPLETA.md e trilha/devpath-trilha.csv a partir de trilha/devpath-trilha.json.
// Fonte única: edite o JSON e rode `npm run trilha:build`.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'trilha');
const data = JSON.parse(fs.readFileSync(path.join(dir, 'devpath-trilha.json'), 'utf8'));

const books = new Map(data.library.books.map(b => [b.id, b]));
const topics = new Map(data.topics.map(t => [t.id, t]));
const bookUrl = b => b.source === 'bibliotecadev' ? data.library.file_base_url + encodeURI(b.file) : b.url;
const bookLink = b => `[${b.title}](${bookUrl(b)})`;
const dateBR = iso => iso.split('-').reverse().join('/');
const ROLE = { principal: 'Principal', apoio: 'Apoio', consulta: 'Consulta' };

const booksByTopic = new Map();
for (const item of data.reading_plan) {
  for (const id of item.topic_ids) {
    const list = booksByTopic.get(id) ?? [];
    if (!list.includes(item.book_id)) list.push(item.book_id);
    booksByTopic.set(id, list);
  }
}

const main = data.topics.filter(t => t.kind !== 'postgrad');
const postgrad = data.topics.filter(t => t.kind === 'postgrad');
const hours = ids => (ids.reduce((s, id) => s + topics.get(id).estimated_minutes, 0) / 60).toFixed(1);
const totalHours = (main.reduce((s, t) => s + t.estimated_minutes, 0) / 60).toFixed(1).replace('.', ',');

const md = [];
const w = (...lines) => md.push(...lines);

w(`# DevPath ${data.version} — trilha completa de lógica à cibersegurança`, '',
  `> Versão ${data.version} (${dateBR(data.published_on)}): revisão da ${data.previous_version} com nova ordem, ${main.filter(t => !t.legacy_id).length} conteúdos novos e livros da semana da BibliotecaDev. O porquê de cada mudança está em [AVALIACAO_TRILHA.md](AVALIACAO_TRILHA.md).`,
  '> Arquivo gerado a partir de `devpath-trilha.json`. Edite o JSON e rode `npm run trilha:build`; não edite este arquivo à mão.', '',
  '## Objetivo', '',
  'Desenvolver leitura, previsão, depuração e implementação independente de código; depois arquitetura e segurança. A pós ocorre em trilha paralela para não perder aulas e prazos.', '',
  `**Método de cada sessão:** ${data.rules.study_cycle.join(' → ')} (PRIMM), com tentativa independente, testes e revisão espaçada.`, '',
  '**Critério sugerido antes de avançar:** compreender pelo menos 80% de critérios definidos de código inédito, recuperar 4/5 de memória após 48h e resolver com ajuda 0 ou 1 (nenhuma/documentação). Nas sessões guiadas do DevPath a nota de memória é calculada pelos acertos.', '',
  `**Carga inicial:** ${data.rules.cadence} Os minutos do catálogo representam sessões introdutórias, não o total para dominar o assunto; capstones, revisões e correções adicionam trabalho.`, '',
  `**Leitura:** ${data.rules.reading}`, '',
  `**IDs:** ${data.rules.ids}`, '',
  '## Mapa geral', '',
  '| Etapa | Tema | Conteúdos | Horas de sessões base | Livro principal |',
  '|---|---|---:|---:|---|');
for (const p of data.phases) {
  const first = data.reading_plan.find(r => r.phase === p.id && r.role === 'principal');
  w(`| ${String(p.id).padStart(2, '0')} | ${p.title} | ${p.topic_ids.length} | ${hours(p.topic_ids).replace('.', ',')} | ${first ? books.get(first.book_id).title : '—'} |`);
}
w('', `> ${main.length} conteúdos principais (incluindo ${data.phases.length} desafios de saída) e ${postgrad.length} tópicos paralelos da pós. O conteúdo-base soma ${totalHours} h de sessões sugeridas; a formação completa exigirá bem mais prática e revisão. Não há prazo fixo de conclusão.`, '');

w('## Trilha principal — etapas e portões de progresso', '');
for (const p of data.phases) {
  w(`### ${String(p.id).padStart(2, '0')} — ${p.title}`, '', `**Meta:** ${p.objective}  `, `**Saída:** ${p.gate}`, '');
  for (const id of p.topic_ids) {
    const t = topics.get(id);
    const tags = [`${t.estimated_minutes} min`];
    if (t.optional) tags.push('opcional');
    if (!t.legacy_id) tags.push('novo na 2.1');
    else if (t.legacy_id !== t.id) tags.push(`era ${t.legacy_id}`);
    const shelf = (booksByTopic.get(id) ?? []).map(b => books.get(b).title);
    w(`- **${t.id} — ${t.title}** (${tags.join(', ')}): ${t.description}. Prática: ${t.practice} [Material](${t.resource_url}).${shelf.length ? ` Leitura: ${shelf.join('; ')}.` : ''}`);
  }
  w('');
}

w('## Livros da semana', '',
  `Cada linha é uma semana de leitura (cerca de 20 min/dia, 5 dias), ligada aos conteúdos da etapa. **Principal** sustenta a etapa; **Apoio** amplia; **Consulta** é para tirar dúvidas, não para ler inteiro. Os PDFs estão na [BibliotecaDev](${data.library.repo_url}); itens marcados como complemento são gratuitos e cobrem lacunas da biblioteca.`, '');
for (const p of [...data.phases, { id: 0, title: 'Pós em paralelo' }]) {
  const items = data.reading_plan.filter(r => r.phase === p.id);
  if (!items.length) continue;
  w(`### ${p.id ? `${String(p.id).padStart(2, '0')} — ` : ''}${p.title}`, '', '| Semana | Livro | Papel | Foco | Conteúdos |', '|---|---|---|---|---|');
  for (const r of items) {
    const b = books.get(r.book_id);
    const extra = b.source === 'externo' ? ' (complemento gratuito)' : b.lang === 'en' ? ' (inglês)' : '';
    w(`| ${r.id} | ${bookLink(b)}${extra} — ${b.author} | ${ROLE[r.role]} | ${r.focus} | ${r.topic_ids.join(', ')} |`);
  }
  w('');
}
w('### Leitura leve da semana (rodízio)', '', 'Em paralelo ao livro técnico, o painel sugere uma leitura de carreira por semana, em rodízio:', '');
data.career_rotation.forEach((id, i) => { const b = books.get(id); w(`${i + 1}. ${bookLink(b)} — ${b.author}${b.lang === 'en' ? ' (inglês)' : ''}`); });
w('', '### Lacunas da biblioteca', '');
for (const g of data.library_gaps) w(`- **${g.area}:** ${g.suggestion}`);
w('');

w('## Pós em paralelo — do Notion', '', '| Prazo real | Tarefa | Observações |', '|---|---|---|');
for (const t of postgrad.filter(t => t.due_on)) w(`| ${t.due_on} | [${t.title}](${t.resource_url}) | ${t.description} |`);
w('', '### Outros tópicos da pós', '');
for (const t of postgrad.filter(t => !t.due_on)) w(`- **${t.title}** — ${t.description}${t.class_on ? ` Aula em ${dateBR(t.class_on)}.` : ''} [Fonte](${t.resource_url}).`);
w('', '### Calendário de aulas confirmado no Notion (não é prazo de entrega)', '', '| Data | Aula |', '|---|---|');
for (const c of data.postgrad_class_schedule) w(`| ${c.date} | ${c.title} |`);
w('', '> Horário habitual informado para as aulas: 08h–12h; conferir atualizações na plataforma de ensino. O Notion é a fonte consultada, mas não há sincronização automática entre Notion e DevPath.', '');

w('## Projetos de portfólio orientadores', '');
data.portfolio_projects.forEach((p, i) => w(`${i + 1}. **${p.title}** (etapas ${p.phases.join(', ')}): ${p.summary}`));
w('', '## Prioridades e lógica do painel diário', '');
data.dashboard_logic.forEach((l, i) => w(`${i + 1}. ${l}`));
w('', `**Pré-requisitos:** os conteúdos de cada etapa podem ser estudados em ordem flexível; para fazer o desafio de saída, todos os conteúdos obrigatórios da etapa devem estar concluídos (${data.rules.optional.toLowerCase()}). A etapa seguinte é liberada quando o desafio da anterior é concluído. A pós não é bloqueada por essas portas.`, '',
  '## Como acompanhar a leitura de código', '',
  'Faça um teste com 10 critérios: entradas/saídas (2), fluxo de execução (2), valores e efeitos (2), justificativa de decisões (2), alteração correta (2). Repita em códigos novos de dificuldade semelhante a cada 2–4 semanas. A meta de 90% significa 9/10 nesse conjunto controlado, não 90% de qualquer código existente.', '',
  '## Segurança de uso e escopo', '',
  'Todos os exercícios ofensivos devem ocorrer apenas em laboratórios expressamente autorizados, PortSwigger Academy ou sistemas próprios. Nunca testar terceiros, produção ou ambientes de trabalho sem aprovação explícita.', '',
  '## Referências', '');
for (const s of data.sources) w(`- [${s.name}](${s.url})`);
w(`- [BibliotecaDev](${data.library.repo_url})`, '');

fs.writeFileSync(path.join(dir, 'TRILHA_COMPLETA.md'), md.join('\n'));

// CSV (com BOM para abrir acentuado no Excel)
const cols = ['id', 'legacy_id', 'phase', 'track', 'kind', 'optional', 'title', 'description', 'practice', 'evidence', 'estimated_minutes', 'priority', 'resource_url', 'prerequisite_ids', 'due_on', 'class_on', 'books', 'source'];
const cell = v => { const s = v === null || v === undefined ? '' : String(v); return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
const rows = data.topics.map(t => cols.map(c => cell(
  c === 'prerequisite_ids' ? t.prerequisite_ids.join(' ') :
  c === 'books' ? (booksByTopic.get(t.id) ?? []).join(' ') :
  c === 'optional' ? (t.optional ? 'sim' : '') : t[c]
)).join(','));
fs.writeFileSync(path.join(dir, 'devpath-trilha.csv'), '﻿' + [cols.join(','), ...rows].join('\n') + '\n');

console.log(`Gerados TRILHA_COMPLETA.md (${md.length} linhas) e devpath-trilha.csv (${rows.length} conteúdos).`);
