// Migração única da trilha 2.0 → 2.1 (registro reproduzível das mudanças).
// Lê trilha/arquivo/v2.0/devpath-trilha-v2.json e grava trilha/devpath-trilha.json.
// A partir da 2.1 os IDs são ESTÁVEIS: a plataforma sincroniza o progresso pelo ID.
// Para mudanças futuras, edite trilha/devpath-trilha.json e rode `npm run trilha:build`.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const v2 = JSON.parse(fs.readFileSync(path.join(root, 'trilha/arquivo/v2.0/devpath-trilha-v2.json'), 'utf8'));
const byId = new Map(v2.topics.map(t => [t.id, t]));
const EVIDENCE = 'Prever, executar, explicar, alterar e reconstruir o trecho; registrar evidências e autonomia.';

// ---------- Novos conteúdos ----------
const NEW = {
  ambiente: { track: 'Fundamentos', title: 'Ambiente de estudo: VS Code, terminal e Node.js', description: 'Executar JavaScript no Node, usar o REPL e pausar a execução com breakpoints', practice: 'Instale o Node LTS, rode node -v, execute um arquivo .js pelo terminal e pare a execução em um breakpoint no VS Code.', estimated_minutes: 30, priority: 3, resource_url: 'https://nodejs.org/learn/getting-started/introduction-to-nodejs' },
  git: { track: 'Engenharia', title: 'Git essencial: commits, branches e GitHub', description: 'Versionar o próprio código com commits pequenos e publicá-lo no GitHub', practice: 'Crie o repositório do estoque EZBikes, faça 5 commits descritivos, uma branch e envie ao GitHub.', estimated_minutes: 30, priority: 3, resource_url: 'https://git-scm.com/book/pt-br/v2' },
  classes: { track: 'JavaScript', title: 'Classes, protótipos e orientação a objetos em JS', description: 'Ler classes, construtores, herança e a cadeia de protótipos', practice: 'Modele Produto e Bicicleta com classes, explique o this de cada método e compare com uma versão feita só com funções e objetos.', estimated_minutes: 30, priority: 3, resource_url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Classes' },
  nosql: { track: 'Banco de dados', title: 'NoSQL: quando usar documentos e chave-valor', description: 'Comparar modelos relacional e de documentos, consistência e padrões de consulta', practice: 'Modele o catálogo EZBikes como documentos e liste 3 consultas que ficariam mais difíceis do que no PostgreSQL.', estimated_minutes: 45, priority: 1, optional: true, resource_url: 'https://www.mongodb.com/pt-br/resources/basics/databases/nosql-explained' },
  solid: { track: 'Engenharia', title: 'SOLID e padrões de projeto essenciais', description: 'Reconhecer responsabilidades, dependências e padrões como Strategy, Factory e Adapter', practice: 'Encontre uma violação de SOLID na sua API e refatore com um padrão adequado, mantendo os testes verdes.', estimated_minutes: 45, priority: 2, resource_url: 'https://refactoring.guru/pt-br/design-patterns' },
  html: { track: 'Full Stack', title: 'HTML semântico, CSS e DOM', description: 'Estruturar páginas acessíveis, estilizar layouts e manipular o DOM com JavaScript', practice: 'Monte a vitrine EZBikes em HTML/CSS puro e filtre os produtos manipulando o DOM, antes de usar React.', estimated_minutes: 45, priority: 2, resource_url: 'https://developer.mozilla.org/pt-BR/docs/Learn_web_development' },
  ddd: { track: 'Engenharia', title: 'Modelagem de domínio: DDD essencial', description: 'Linguagem ubíqua, entidades, objetos de valor, agregados e contextos delimitados', practice: 'Identifique contextos e agregados do EZBikes (catálogo, estoque, pedidos) e desenhe o mapa de contextos.', estimated_minutes: 45, priority: 1, optional: true, resource_url: 'https://martinfowler.com/bliki/DomainDrivenDesign.html' },
  estatistica: { track: 'Engenharia', title: 'Estatística para engenharia: médias, percentis e distribuições', description: 'Diferenciar média, mediana, percentis e histogramas em métricas de latência', practice: 'Calcule média, p50, p95 e p99 de uma lista de latências e explique por que a média esconde a cauda.', estimated_minutes: 30, priority: 2, resource_url: 'https://sre.google/sre-book/monitoring-distributed-systems/' }
};

// ---------- Ajustes em conteúdos existentes ----------
const PATCH = {
  'C01-09': { title: 'Leitura de código sem IA — diagnóstico inicial', description: 'Medir a capacidade atual em trechos desconhecidos antes de estudar a etapa' },
  'C01-05': { resource_url: 'https://pythontutor.com/javascript.html' },
  'C01-02': { resource_url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Grammar_and_types' },
  'C01-06': { resource_url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Expressions_and_operators' },
  'C01-03': { resource_url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Loops_and_iteration' },
  'C01-04': { resource_url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Functions' },
  'C01-07': { resource_url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Control_flow_and_error_handling' },
  'C02-01': { resource_url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Expressions_and_operators' },
  'C02-04': { resource_url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Numbers_and_strings' },
  'C02-05': { resource_url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Functions/Arrow_functions' },
  'C02-02': { resource_url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array' },
  'C02-03': { resource_url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Destructuring' },
  'C02-06': { resource_url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Keyed_collections' },
  'C02-07': { resource_url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Optional_chaining' },
  'C02-08': { resource_url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/JSON' },
  'C04-07': { track: 'Engenharia', title: 'Testes automatizados com node:test', priority: 3, resource_url: 'https://nodejs.org/learn/test-runner/introduction' },
  'C02-09': { estimated_minutes: 45 },
  'C03-06': { resource_url: 'https://nodejs.org/learn/getting-started/debugging' },
  'C03-01': { resource_url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Closures' },
  'C03-02': { resource_url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/this' },
  'C03-05': { resource_url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Modules' },
  'C03-03': { resource_url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Using_promises' },
  'C03-04': { resource_url: 'https://nodejs.org/learn/asynchronous-work/event-loop-timers-and-nexttick' },
  'C03-09': { estimated_minutes: 45, resource_url: 'https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API/Using_Fetch' },
  'C04-08': { resource_url: 'https://refactoring.guru/pt-br/refactoring' },
  'C05-03': { title: 'Git em equipe: merge, conflitos e revisão', description: 'Reverter, fazer merge, resolver conflito e revisar diffs', resource_url: 'https://git-scm.com/book/pt-br/v2' },
  'C05-04': { resource_url: 'https://www.gnu.org/software/bash/manual/bash.html' },
  'C05-05': { resource_url: 'https://dnsimple.com/comics/how-dns-works/' },
  'C05-06': { resource_url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Guides/Overview' },
  'C05-07': { resource_url: 'https://www.cloudflare.com/pt-br/learning/ssl/what-happens-in-a-tls-handshake/' },
  'C05-08': { resource_url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Guides/CORS' },
  'C07-02': { resource_url: 'https://www.postgresql.org/docs/current/tutorial-sql.html' },
  'C07-03': { resource_url: 'https://www.postgresql.org/docs/current/ddl-constraints.html' },
  'C07-04': { resource_url: 'https://use-the-index-luke.com/' },
  'C07-05': { resource_url: 'https://www.postgresql.org/docs/current/ddl-rowsecurity.html' },
  'C07-08': { resource_url: 'https://cheatsheetseries.owasp.org/cheatsheets/Query_Parameterization_Cheat_Sheet.html' },
  'C07-07': { track: 'Full Stack', title: 'API + PostgreSQL: conexões, pools e transações', description: 'Conectar a API ao banco e investigar gargalos e falhas de conexão', resource_url: 'https://node-postgres.com/features/pooling' },
  'C06-01': { resource_url: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html' },
  'C06-03': { resource_url: 'https://nodejs.org/api/http.html' },
  'C06-05': { resource_url: 'https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html' },
  'C06-06': { resource_url: 'https://nodejs.org/learn/asynchronous-work/dont-block-the-event-loop' },
  'C06-07': { resource_url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html' },
  'C06-08': { resource_url: 'https://nodejs.org/learn/test-runner/introduction' },
  'C08-01': { resource_url: 'https://react.dev/learn/your-first-component' },
  'C08-02': { resource_url: 'https://react.dev/learn/state-a-components-memory' },
  'C08-03': { resource_url: 'https://react.dev/learn/synchronizing-with-effects' },
  'C08-04': { resource_url: 'https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API/Using_Fetch' },
  'C08-05': { resource_url: 'https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Accessibility' },
  'C08-06': { resource_url: 'https://nextjs.org/docs/app/getting-started' },
  'C08-07': { resource_url: 'https://playwright.dev/docs/intro' },
  'C09-01': { resource_url: 'https://martinfowler.com/architecture/' },
  'C09-02': { resource_url: 'https://google.aip.dev/' },
  'C09-03': { resource_url: 'https://docs.docker.com/learn/' },
  'C09-04': { resource_url: 'https://docs.github.com/pt/actions' },
  'C09-05': { resource_url: 'https://aws.amazon.com/pt/architecture/well-architected/' },
  'C09-06': { resource_url: 'https://kubernetes.io/pt-br/docs/tutorials/kubernetes-basics/' },
  'C09-07': { resource_url: 'https://kubernetes.io/docs/concepts/workloads/autoscaling/horizontal-pod-autoscale/' },
  'C09-08': { resource_url: 'https://builder.aws.com/content/3EumjoZascWd1oZiEgL8ORlv3qE/timeouts-retries-and-backoff-with-jitter' },
  'C09-09': { resource_url: 'https://aws.amazon.com/pt/architecture/well-architected/' },
  'C09-10': { resource_url: 'https://docs.docker.com/learn/' },
  'C10-01': { resource_url: 'https://opentelemetry.io/docs/concepts/signals/logs/' },
  'C10-02': { resource_url: 'https://prometheus.io/docs/prometheus/latest/querying/basics/' },
  'C10-03': { resource_url: 'https://grafana.com/docs/grafana/latest/fundamentals/getting-started/' },
  'C10-04': { resource_url: 'https://opentelemetry.io/docs/concepts/signals/traces/' },
  'C10-05': { resource_url: 'https://sre.google/workbook/implementing-slos/' },
  'C10-06': { resource_url: 'https://grafana.com/docs/k6/latest/' },
  'C11-03': { resource_url: 'https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html' },
  'C11-04': { resource_url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html' },
  'C11-06': { resource_url: 'https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html' },
  'C11-07': { resource_url: 'https://www.first.org/epss/' },
  'C11-08': { resource_url: 'https://top10.owasp.org/2025/' },
  'C11-09': { resource_url: 'https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html' },
  'C14-01': { title: 'PortSwigger Academy — primeiros labs', description: 'Executar labs guiados de HTTP, autenticação e controle de acesso antes das vulnerabilidades específicas' },
  'C12-11': { resource_url: 'https://portswigger.net/burp/documentation/desktop/getting-started' },
  'C12-01': { resource_url: 'https://portswigger.net/web-security/access-control' },
  'C12-02': { resource_url: 'https://portswigger.net/web-security/sql-injection' },
  'C12-03': { resource_url: 'https://portswigger.net/web-security/cross-site-scripting' },
  'C12-04': { resource_url: 'https://portswigger.net/web-security/csrf' },
  'C12-05': { resource_url: 'https://portswigger.net/web-security/ssrf' },
  'C12-06': { resource_url: 'https://portswigger.net/web-security/file-path-traversal' },
  'C12-07': { resource_url: 'https://portswigger.net/web-security/authentication' },
  'C12-08': { resource_url: 'https://portswigger.net/web-security/os-command-injection' },
  'C12-09': { resource_url: 'https://portswigger.net/web-security/api-testing' },
  'C12-10': { resource_url: 'https://asvs.owasp.org/' },
  'C13-01': { resource_url: 'https://owasp.org/projects/samm' },
  'C13-02': { resource_url: 'https://community.owasp.org/Source_Code_Analysis_Tools' },
  'C13-03': { resource_url: 'https://slsa.dev/' },
  'C13-04': { resource_url: 'https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html' },
  'C13-05': { resource_url: 'https://docs.github.com/en/actions/reference/security/secure-use' },
  'C13-06': { resource_url: 'https://oauth.net/2/' },
  'C13-07': { resource_url: 'https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html' },
  'C14-06': { resource_url: 'https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html' },
  'C13-09': { title: 'Resposta a incidentes e resiliência', resource_url: 'https://csrc.nist.gov/pubs/sp/800/61/r3/final' },
  'C14-02': { resource_url: 'https://owasp.org/projects/web-security-testing-guide' },
  'C14-03': { resource_url: 'https://owasp.org/projects/web-security-testing-guide' },
  'C14-04': { resource_url: 'https://portswigger.net/web-security/logic-flaws' },
  'C14-05': { resource_url: 'https://owasp.org/projects/web-security-testing-guide' },
  'C14-07': { resource_url: 'https://genai.owasp.org/llm-top-10/' },
  'C14-08': { resource_url: 'https://genai.owasp.org/llm-top-10/' },
  'C14-09': { title: 'Projeto final — EZBikes Secure (várias sessões)', estimated_minutes: 60 }
};

// ---------- Nova ordem das etapas (IDs da 2.0 ou chaves de NEW) ----------
const PHASES = [
  { from: 1, order: ['ambiente', 'C01-09', 'C01-01', 'C01-02', 'C01-05', 'C01-06', 'C01-03', 'C01-04', 'C01-08', 'C01-07', 'C01-10'] },
  { from: 2, order: ['C02-01', 'C02-04', 'C02-05', 'C02-02', 'C02-03', 'C02-06', 'C02-07', 'C02-08', 'C04-07', 'git', 'C02-09', 'C02-10'] },
  { from: 3, order: ['C03-06', 'C03-01', 'C03-02', 'classes', 'C03-07', 'C03-05', 'C03-03', 'C03-04', 'C03-08', 'C03-09', 'C03-10'] },
  { from: 4, order: ['C04-01', 'C04-02', 'C04-03', 'C04-05', 'C04-04', 'C04-06', 'C04-08', 'C04-09'] },
  { from: 5, order: ['C05-01', 'C05-02', 'C05-04', 'C05-03', 'C05-05', 'C05-06', 'C05-07', 'C05-08', 'C05-09', 'C05-10'] },
  // Dados antes do backend: a API do EZBikes precisa de modelagem e SQL.
  { from: 7, order: ['C07-01', 'C07-03', 'C07-02', 'C07-04', 'C07-05', 'C07-06', 'C07-08', 'nosql', 'C07-09'] },
  { from: 6, order: ['C06-01', 'C06-02', 'C06-03', 'C06-04', 'C06-05', 'C07-07', 'C06-07', 'C06-06', 'C06-08', 'solid', 'C06-09', 'C06-10'] },
  { from: 8, order: ['html', 'C08-01', 'C08-02', 'C08-03', 'C08-04', 'C08-05', 'C08-06', 'C08-07', 'C08-08'] },
  { from: 9, order: ['C09-01', 'ddd', 'C09-02', 'C09-03', 'C09-04', 'C09-05', 'C09-06', 'C09-07', 'C09-08', 'C09-09', 'C09-10'] },
  { from: 10, order: ['estatistica', 'C10-01', 'C10-02', 'C10-03', 'C10-04', 'C10-05', 'C10-06', 'C10-07', 'C10-08', 'C10-09'] },
  { from: 11, order: ['C11-01', 'C11-02', 'C11-03', 'C11-04', 'C11-05', 'C11-06', 'C11-07', 'C11-08', 'C11-09'] },
  { from: 12, order: ['C14-01', 'C12-11', 'C12-01', 'C12-02', 'C12-03', 'C12-04', 'C12-05', 'C12-06', 'C12-07', 'C12-08', 'C12-09', 'C12-10', 'C12-12'] },
  { from: 13, title: 'DevSecOps, IAM, cloud security, detecção e resposta', objective: 'Integrar segurança ao ciclo de entrega, à infraestrutura e à operação', gate: 'Demonstrar pipeline seguro, cloud com menor privilégio e um playbook de incidente testado', order: ['C13-01', 'C13-02', 'C13-03', 'C13-04', 'C13-05', 'C13-06', 'C13-07', 'C13-08', 'C14-06', 'C13-09', 'C13-10'] },
  { from: 14, title: 'Avaliação de segurança autorizada e segurança de IA', order: ['C14-02', 'C14-03', 'C14-04', 'C14-05', 'C14-07', 'C14-08', 'C14-09', 'C14-10'] }
];

const legacyToNew = {};
const topics = [];
const phases = [];
let sort = 0;

PHASES.forEach((spec, index) => {
  const phase = index + 1;
  const base = v2.phases.find(p => p.id === spec.from);
  const codes = [];
  spec.order.forEach((key, i) => {
    const code = `C${String(phase).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`;
    const old = byId.get(key);
    const src = old ?? NEW[key];
    if (!src) throw new Error(`Conteúdo desconhecido: ${key}`);
    const isCheckpoint = old?.kind === 'checkpoint';
    if (isCheckpoint && i !== spec.order.length - 1) throw new Error(`Desafio fora do fim: ${key}`);
    const patched = { ...src, ...(old ? PATCH[key] : {}) };
    if (old) legacyToNew[key] = code;
    codes.push(code);
    topics.push({
      id: code,
      legacy_id: old ? key : null,
      phase,
      track: isCheckpoint ? patched.track : patched.track,
      kind: isCheckpoint ? 'checkpoint' : 'core',
      optional: Boolean(patched.optional),
      title: isCheckpoint ? patched.title.replace(/Desafio de saída \d+/, `Desafio de saída ${String(phase).padStart(2, '0')}`) : patched.title,
      description: patched.description,
      practice: patched.practice,
      evidence: isCheckpoint ? base.gate : (old?.evidence ?? EVIDENCE),
      estimated_minutes: patched.estimated_minutes,
      priority: patched.priority,
      resource_url: patched.resource_url,
      prerequisite_ids: [],
      due_on: null,
      class_on: null,
      sort_order: sort++,
      source: old ? old.source : 'revisao_2026_11_22'
    });
  });
  const checkpoint = codes[codes.length - 1];
  const previous = phases[index - 1]?.checkpoint_id ?? null;
  for (const t of topics.filter(t => t.phase === phase)) {
    t.prerequisite_ids = t.id === checkpoint
      ? topics.filter(x => x.phase === phase && x.id !== checkpoint && !x.optional).map(x => x.id)
      : previous ? [previous] : [];
  }
  phases.push({
    id: phase,
    legacy_id: spec.from,
    title: spec.title ?? base.title,
    objective: spec.objective ?? base.objective,
    gate: spec.gate ?? base.gate,
    topic_ids: codes,
    checkpoint_id: checkpoint,
    prerequisite_checkpoint: previous
  });
});

// Toda a trilha principal da 2.0 precisa ter sido realocada.
for (const t of v2.topics.filter(t => t.kind !== 'postgrad')) {
  if (!legacyToNew[t.id]) throw new Error(`Conteúdo da 2.0 perdido: ${t.id}`);
}

// ---------- Pós em paralelo: mantém IDs e liga às aulas ----------
const CLASS_ON = { P07: '2026-11-28', P08: '2026-12-12', P09: '2027-02-20', P10: '2027-03-06', P11: '2027-03-20', P12: '2027-04-10', P13: '2027-04-24', P14: '2027-05-08', P15: '2027-05-22', P16: '2027-06-12' };
for (const t of v2.topics.filter(t => t.kind === 'postgrad')) {
  topics.push({ ...t, legacy_id: t.id, optional: false, class_on: CLASS_ON[t.id] ?? null, sort_order: sort++ });
}

// ---------- Biblioteca e livros da semana ----------
const REPO = 'https://github.com/EnzoOliveiradev/BibliotecaDev';
const B = (id, title, author, file, lang, category) => ({ id, title, author, lang, category, source: 'bibliotecadev', file: `LivrosDev/${file}` });
const X = (id, title, author, url, lang, category) => ({ id, title, author, lang, category, source: 'externo', free: true, url });
const books = [
  B('but-how-do-it-know', 'But How Do It Know?', 'J. Clark Scott', 'But How Do It Know - The Basic Principles of Computers for Everyone - Author (J. Clark Scott).pdf', 'en', 'Algoritmos e Fundamentos'),
  B('learning-3', 'Learning 3.0 — como os profissionais criativos aprendem', 'Casa do Código', 'Learning 3.0 - Como os profissionais criativos aprendem - Autor (Casa do Código).pdf', 'pt', 'Carreira e Aprendizagem'),
  B('programador-melhor', 'Como ser um Programador Melhor', 'Pete Goodliffe', 'Como ser um Programador Melhor - um Manual Para Programadores que se Importam com Código - Autor (Pete Goodliffe).pdf', 'pt', 'Carreira e Aprendizagem'),
  B('codigo-limpo', 'Código Limpo', 'Robert C. Martin', 'Código limpo - Habilidades práticas do Agile Software - Autor (Robert C. Martin).pdf', 'pt', 'Arquitetura, Design e Código'),
  B('expressoes-regulares', 'Expressões Regulares — uma abordagem divertida', 'Aurelio Marinho Jargas', 'Expressões Regulares - uma abordagem divertida - Autor (Aurelio Marinho).pdf', 'pt', 'Algoritmos e Fundamentos'),
  B('testes-automatizados', 'Testes Automatizados de Software — um guia prático', 'Casa do Código', 'Testes Automatizados de Software - Um Guia Prático - Autor (Casa do Código).pdf', 'pt', 'Agilidade e Qualidade'),
  B('git-github', 'Controlando Versões com Git e GitHub', 'Casa do Código', 'Controlando Versões com Git e GitHub - Autor (Casa do Código).pdf', 'pt', 'DevOps e Cloud'),
  B('programador-pragmatico', 'O Programador Pragmático', 'Andrew Hunt e David Thomas', 'O Programador Pragmático - Autor (Andrew Hunt e David Thomas).pdf', 'pt', 'Carreira e Aprendizagem'),
  B('codigo-legado', 'Trabalho Eficaz com Código Legado', 'Michael C. Feathers', 'Trabalho Eficaz com Código Legado - Autor (Michael C. Feathers).pdf', 'pt', 'Arquitetura, Design e Código'),
  B('entendendo-algoritmos', 'Entendendo Algoritmos', 'Aditya Y. Bhargava', 'Entendendo Algoritmos - Um Guia Ilustrado Para Programadores e Outros Curiosos - Autor (Aditya Y. Bhargava).pdf', 'pt', 'Algoritmos e Fundamentos'),
  B('refatoracao', 'Refatoração', 'Martin Fowler', 'Refatoração - Aperfeiçoando o Design de Códigos Existentes - Autor (Martin Fowler).pdf', 'pt', 'Arquitetura, Design e Código'),
  B('cracking', 'Cracking the Coding Interview', 'Gayle Laakmann McDowell', 'Cracking the Coding Interview - 189 Programming Questions and Solutions - Author (Gayle Laakmann McDowell).pdf', 'en', 'Algoritmos e Fundamentos'),
  B('cormen', 'Algoritmos — Teoria e Prática', 'Thomas Cormen et al.', 'Algoritmos - Teoria e Prática - Autor (Thomas Cormen).pdf', 'pt', 'Algoritmos e Fundamentos'),
  B('comecando-linux', 'Começando com o Linux', 'Casa do Código', 'Começando com o Linux - Comandos, serviços e administração - Autor (Casa do Código).pdf', 'pt', 'DevOps e Cloud'),
  B('servidor-linux', 'Guia prático do servidor Linux', 'Casa do Código', 'Guia prático do servidor Linux - Administração Linux para iniciantes - Autor (Casa do Código).pdf', 'pt', 'DevOps e Cloud'),
  B('desconstruindo-web', 'Desconstruindo a Web — as tecnologias por trás de uma requisição', 'Casa do Código', 'Desconstruindo a Web - As Tecnologias por Trás de uma Requisição - Autor (Casa do Código).pdf', 'pt', 'Web, Mobile e APIs'),
  B('forouzan', 'Comunicação de Dados e Redes de Computadores', 'Behrouz A. Forouzan', 'Comunicação de Dados e Redes de Computadores - Autor (Behrouz A. Forouzan).pdf', 'pt', 'Algoritmos e Fundamentos'),
  B('nosql', 'NoSQL — como armazenar os dados de uma aplicação moderna', 'Casa do Código', 'NoSQL - Como armazenar os dados de uma aplicação moderna - Autor (Casa do Código).pdf', 'pt', 'Dados, BI e Estatística'),
  B('mongodb', 'MongoDB — construa novas aplicações', 'Casa do Código', 'MongoDB - Construa Novas Aplicações com Novas Tecnologias - Autor (Casa do Código).pdf', 'pt', 'Dados, BI e Estatística'),
  B('typescript', 'Guia prático de TypeScript', 'Casa do Código', 'Guia prático de TypeScript - Melhore suas aplicações JavaScript - Autor (Casa do Código).pdf', 'pt', 'Web, Mobile e APIs'),
  B('api-rest-node', 'Construindo APIs REST com Node.js', 'Casa do Código', 'Construindo API REST com Node JS - Autor (Casa do Código).pdf', 'pt', 'Web, Mobile e APIs'),
  B('rest', "REST — construa API's inteligentes de maneira simples", 'Casa do Código', "REST - Construa API's inteligentes de maneira simples - Autor (Casa do Código).pdf", 'pt', 'Web, Mobile e APIs'),
  B('principios-design', 'Princípios de Design e Padrões de Projeto', 'Robert C. Martin', 'Princípios de Design e Padrões de Projeto - Autor (Robert C. Martin).pdf', 'pt', 'Arquitetura, Design e Código'),
  B('padroes-projeto', 'Padrões de Projeto (GoF)', 'Erich Gamma et al.', 'Padrões de Projetos - Soluções Reutilizáveis de Software Orientados a Objetos - Autor (Erich Gamma).pdf', 'pt', 'Arquitetura, Design e Código'),
  B('canivete-node', 'Canivete suíço do desenvolvedor Node', 'Casa do Código', 'Canivete suico do desenvolvedor Node - Autor (Casa do Código).pdf', 'pt', 'Web, Mobile e APIs'),
  B('html-css', 'HTML5 e CSS3 — domine a web do futuro', 'Casa do Código', 'HTML5 e CSS3 - domine a web do futuro - Autor (Casa do Código).pdf', 'pt', 'Web, Mobile e APIs'),
  B('web-responsivo', 'Web Design Responsivo', 'Casa do Código', 'Web Design Responsivo - Páginas adaptáveis para todos os dispositivos - Autor (Casa do Código).pdf', 'pt', 'Web, Mobile e APIs'),
  B('css-eficiente', 'CSS Eficiente', 'Casa do Código', 'CSS Eficiente - Técnicas e ferramentas que fazem a diferença nos seus estilos - Autor (Casa do Código).pdf', 'pt', 'Web, Mobile e APIs'),
  B('pwa-react', 'Progressive Web Apps com React', 'Casa do Código', 'Progressive web apps - Construa aplicações progressivas com React - Autor (Casa do Código).pdf', 'pt', 'Web, Mobile e APIs'),
  B('ux-design', 'Introdução e boas práticas em UX Design', 'Casa do Código', 'Introdução e boas práticas em UX Design - Autor (Casa do Código).pdf', 'pt', 'Web, Mobile e APIs'),
  B('arquitetura-limpa', 'Arquitetura Limpa', 'Robert C. Martin', 'Arquitetura Limpa - O Guia do Artesão para Estrutura e Design de Software - Autor (Robert C. Martin).pdf', 'pt', 'Arquitetura, Design e Código'),
  B('arquitetura-intro', 'Introdução à arquitetura e design de software', 'Paulo Silveira et al.', 'Introdução à arquitetura de design de software - Autor (Paulo Silveira).pdf', 'pt', 'Arquitetura, Design e Código'),
  B('ddd-rapido', 'Domain-Driven Design Rápido', 'Abel Avram e Floyd Marinescu (InfoQ)', 'Domain Driven Design Rapido - Autor (Eric Evans).pdf', 'pt', 'Arquitetura, Design e Código'),
  B('docker', 'Containers com Docker', 'Casa do Código', 'Containers com Docker - Do desenvolvimento à produção - Autor (Casa do Código).pdf', 'pt', 'DevOps e Cloud'),
  B('entrega-continua', 'Entrega Contínua', 'Jez Humble e David Farley', 'Entrega Contínua - Como Entregar Software de Forma Rápida e Confiável - Auto (Jez Humble).pdf', 'pt', 'DevOps e Cloud'),
  B('kubernetes', 'Kubernetes — tudo sobre orquestração de contêineres', 'Casa do Código', 'Kubernetes - Tudo sobre orquestração de contêineres - Autor (Casa do Código).pdf', 'pt', 'DevOps e Cloud'),
  B('aws-descomplicando', 'Amazon AWS — descomplicando a computação na nuvem', 'Casa do Código', 'Amazon AWS - Descomplicando a computação na nuvem - Autor (Casa do Código).pdf', 'pt', 'DevOps e Cloud'),
  B('aws-cloud-practitioner', 'AWS Certified Cloud Practitioner — guia de estudo', 'Jon Bonso e Adrian Formaran', 'AWS Certified Cloud Practitioner Exam - Autor (Jon Bonso and Adrian Formaran).pdf', 'en', 'DevOps e Cloud'),
  B('devops-pratica', 'DevOps na Prática', 'Casa do Código', 'DevOps na Prática - Entrega de Software Confiável e Automatizada - Autor (Casa do Código).pdf', 'pt', 'DevOps e Cloud'),
  B('caixa-devops', 'Caixa de Ferramentas DevOps', 'Casa do Código', 'Caixa de Ferramentas DevOps - Um Guia para Construção, Administração e Arquitetura de Sistemas Modernos - Autor (Casa do Código).pdf', 'pt', 'DevOps e Cloud'),
  B('estatistica', 'Estatística — o que é, para que serve, como funciona', 'Charles Wheelan', 'Estatistica - O que e, para que serve, como funciona .pdf', 'pt', 'Dados, BI e Estatística'),
  B('mentir-estatistica', 'Como mentir com estatística', 'Darrell Huff', 'Como mentir com estatística - Auto (Darrell-Heff).pdf', 'pt', 'Dados, BI e Estatística'),
  B('big-data', 'Big Data — técnicas e tecnologias para extração de valor dos dados', 'Casa do Código', 'Big Data - Técnicas e tecnologias para extração de valor dos dados - Autor (Casa do Código).pdf', 'pt', 'Dados, BI e Estatística'),
  B('business-intelligence', 'Business Intelligence — implementar do jeito certo', 'Casa do Código', 'Business Intelligence - Implementar do jeito certo e a custo zero - Autor (Casa do Código).pdf', 'pt', 'Dados, BI e Estatística'),
  B('data-science', 'Introdução a Data Science', 'Casa do Código', 'Introdução a data science - Algoritmos de machine learning e métodos de análise - Autor (Casa do Código).pdf', 'pt', 'Dados, BI e Estatística'),
  B('oauth2', 'OAuth 2.0 — proteja suas aplicações com Spring Security', 'Casa do Código', 'Oauth 2.0 Proteja Suas Aplicacoes Com O Spring Security Oauth2 - Autor (Casa do Código).pdf', 'pt', 'Web, Mobile e APIs'),
  B('aws-security', 'AWS Certified Security Specialty — guia de estudo', 'Jon Bonso e Carlo Acebedo', 'AWS Certified Security Specialty Exam - Autor (Jon Bonso and Carlo Acebedo).pdf', 'en', 'DevOps e Cloud'),
  B('clean-coder', 'The Clean Coder', 'Robert C. Martin', 'Clean Coder, The - A Code of Conduct for Professional Programmers - Autor (Robert C. Martin).pdf', 'en', 'Carreira e Aprendizagem'),
  // Leitura leve (rodízio semanal)
  B('apprenticeship', 'Apprenticeship Patterns', 'Dave Hoover e Adewale Oshineye', 'Apprenticeship Patterns - Guidance for the Aspiring Software Craftsman - Autor (Dave Hoover e Adewale Oshineye).pdf', 'en', 'Carreira e Aprendizagem'),
  B('buccaneer-scholar', 'Secrets of a Buccaneer-Scholar', 'James Marcus Bach', 'Secrets of a Buccaneer-Scholar - How Self-Education and the Pursuit of Passion Can Lead to a Lifetime of Success - Autor (James Marcus Bach).pdf', 'en', 'Carreira e Aprendizagem'),
  B('soft-skills', 'Soft Skills', 'John Sonmez', "Soft Skills - The Software Developer's Life Manual - Autor (John Sonmez).pdf", 'en', 'Carreira e Aprendizagem'),
  B('programador-apaixonado', 'O Programador Apaixonado', 'Chad Fowler', 'O Programador Apaixonado - Construindo uma Carreira Notável em Desenvolvimento de Software - Autor (Casa do Código).pdf', 'pt', 'Carreira e Aprendizagem'),
  B('generalistas', 'Por que os Generalistas Vencem em um Mundo de Especialistas', 'David Epstein', 'Por que Os Generalistas Vencem Em um Mundo de Especialistas - Autor(David Epstein).pdf', 'pt', 'Carreira e Aprendizagem'),
  B('software-craftsman', 'The Software Craftsman', 'Sandro Mancuso', 'The Software Craftsman - Professionalism, Pragmatism, Pride - Autor (Sandro Mancuso).pdf', 'en', 'Carreira e Aprendizagem'),
  B('mythical-man-month', 'The Mythical Man-Month', 'Frederick P. Brooks', 'The Mythical Man-Month Essays On Software Engineering - Author (Frederick P. Brooks).pdf', 'en', 'Carreira e Aprendizagem'),
  B('ego-inimigo', 'O Ego É Seu Inimigo', 'Ryan Holiday', 'O Ego É Seu Inimigo. Como Dominar Seu Pior Adversário - Autor (Ryan Holiday).pdf', 'pt', 'Carreira e Aprendizagem'),
  B('fragmentos', 'Fragmentos de um programador', 'Casa do Código', 'Fragmentos de um programador - Artigos e insights da carreira de um profissional - Autor (Casa do Código).pdf', 'pt', 'Carreira e Aprendizagem'),
  B('mestre-programador', 'Guia do Mestre Programador', 'Casa do Código', 'Guia do Mestre Programador - Pensando como pirata, evoluindo como jedi - Autor (Casa do Código).pdf', 'pt', 'Carreira e Aprendizagem'),
  // Complementos gratuitos para lacunas da biblioteca
  X('eloquent-js', 'Eloquent JavaScript (4ª ed., online)', 'Marijn Haverbeke', 'https://eloquentjavascript.net/', 'en', 'Complemento gratuito'),
  X('ydkjs', "You Don't Know JS Yet (online)", 'Kyle Simpson', 'https://github.com/getify/You-Dont-Know-JS', 'en', 'Complemento gratuito'),
  X('pg-tutorial', 'Tutorial oficial do PostgreSQL', 'PostgreSQL Global Development Group', 'https://www.postgresql.org/docs/current/tutorial.html', 'en', 'Complemento gratuito'),
  X('use-the-index', 'Use The Index, Luke!', 'Markus Winand', 'https://use-the-index-luke.com/', 'en', 'Complemento gratuito'),
  X('sre-book', 'Site Reliability Engineering (Google, online)', 'Betsy Beyer et al.', 'https://sre.google/sre-book/table-of-contents/', 'en', 'Complemento gratuito'),
  X('owasp-top10', 'OWASP Top 10:2025', 'OWASP', 'https://top10.owasp.org/2025/', 'en', 'Complemento gratuito'),
  X('owasp-threat-modeling', 'OWASP Threat Modeling Cheat Sheet', 'OWASP', 'https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html', 'en', 'Complemento gratuito'),
  X('portswigger-academy', 'Web Security Academy', 'PortSwigger', 'https://portswigger.net/web-security/learning-paths', 'en', 'Complemento gratuito'),
  X('owasp-wstg', 'OWASP Web Security Testing Guide', 'OWASP', 'https://owasp.org/projects/web-security-testing-guide', 'en', 'Complemento gratuito'),
  X('owasp-cheatsheets', 'OWASP Cheat Sheet Series', 'OWASP', 'https://cheatsheetseries.owasp.org/', 'en', 'Complemento gratuito'),
  X('owasp-llm', 'OWASP Top 10 para aplicações com LLM', 'OWASP GenAI Security Project', 'https://genai.owasp.org/llm-top-10/', 'en', 'Complemento gratuito')
];
const bookIds = new Set(books.map(b => b.id));

// Cada item = uma semana de leitura (≈20 min/dia, 5 dias). `topics` usa IDs da 2.0 e é convertido abaixo.
const P = 'principal', A = 'apoio', C = 'consulta';
const plan = [
  [1, 'but-how-do-it-know', P, 'Como o computador guarda valores e executa instruções passo a passo. Leia até entender memória e o ciclo buscar–executar e relacione com a tabela de execução.', ['ambiente', 'C01-05', 'C01-02']],
  [1, 'learning-3', A, 'Prática deliberada, feedback e aprendizado contínuo. Compare com o método PRIMM e com a revisão espaçada do DevPath.', ['C01-09', 'C01-01']],
  [1, 'programador-melhor', P, 'Trechos sobre ler código de outras pessoas, estilo e cuidado com o código. Anote 3 hábitos para aplicar nas leituras desta etapa.', ['C01-08', 'C01-07', 'C01-10']],
  [2, 'eloquent-js', P, 'Capítulos de valores e tipos, estrutura do programa, funções e estruturas de dados. Faça os exercícios do fim de cada capítulo sem IA.', ['C02-01', 'C02-04', 'C02-05', 'C02-03', 'C02-06']],
  [2, 'codigo-limpo', P, 'Nomes significativos e funções pequenas. Reescreva 2 funções do mini projeto aplicando o que leu.', ['C02-05', 'C02-02', 'C02-09']],
  [2, 'expressoes-regulares', A, 'Metacaracteres, classes e quantificadores. Use com strings para validar CEP, telefone e e-mail simples.', ['C02-04']],
  [2, 'testes-automatizados', P, 'Por que testar, testes de unidade e organização dos casos. Escreva os testes do estoque EZBikes antes de terminar a implementação.', ['C04-07', 'C02-09']],
  [2, 'git-github', P, 'Commits, histórico, branches e envio ao GitHub. Versione o mini projeto com commits pequenos e mensagens claras.', ['git', 'C02-09', 'C02-10']],
  [3, 'ydkjs', P, 'Livro "Scope & Closures": escopo léxico, closures e módulos — por que funções "lembram" variáveis.', ['C03-01', 'C03-02', 'C03-05']],
  [3, 'eloquent-js', P, 'Capítulos sobre objetos e classes, bugs e erros, e programação assíncrona.', ['classes', 'C03-05', 'C03-03', 'C03-04']],
  [3, 'programador-pragmatico', P, 'Trechos sobre depuração, "programar por coincidência" e programação defensiva com asserções.', ['C03-06', 'C03-07', 'C03-09']],
  [3, 'codigo-legado', P, 'O que torna um código legado, pontos de alteração e testes de caracterização antes de mudar.', ['C03-08', 'C03-10']],
  [4, 'entendendo-algoritmos', P, 'Pesquisa binária, notação Big O e ordenação por seleção. Reimplemente os exemplos em JavaScript (o livro usa Python).', ['C04-01', 'C04-02', 'C04-03']],
  [4, 'entendendo-algoritmos', P, 'Recursão, quicksort e tabelas hash.', ['C04-05', 'C04-04']],
  [4, 'entendendo-algoritmos', P, 'Grafos e pesquisa em largura; Dijkstra como leitura opcional.', ['C04-06', 'C04-09']],
  [4, 'refatoracao', P, 'O exemplo inicial completo e o catálogo de "maus cheiros". Refatore um código seu mantendo os testes verdes a cada passo.', ['C04-08']],
  [4, 'cracking', A, 'Seções de Big O e estruturas de dados. Resolva 1 problema por dia sem IA, explicando a complexidade.', ['C04-09']],
  [4, 'cormen', C, 'Referência aprofundada: consulte quando quiser a análise formal de um algoritmo. Não é para ler inteiro.', ['C04-01', 'C04-06']],
  [5, 'comecando-linux', P, 'Navegação, permissões, processos e redirecionamento de entrada e saída.', ['C05-01', 'C05-02', 'C05-04']],
  [5, 'git-github', P, 'Segunda passada: merge, rebase, conflitos e recuperação de alterações.', ['C05-03']],
  [5, 'desconstruindo-web', P, 'O caminho de uma requisição: DNS, TCP, HTTP e TLS. Reproduza cada etapa com curl -v.', ['C05-05', 'C05-06', 'C05-07', 'C05-08', 'C05-10']],
  [5, 'servidor-linux', A, 'Serviços, logs do sistema e diagnóstico em servidores.', ['C05-09']],
  [5, 'forouzan', C, 'Referência do modelo TCP/IP e das camadas de rede para tirar dúvidas pontuais.', ['C05-05']],
  [6, 'pg-tutorial', P, 'Tutorial e linguagem SQL: tabelas, consultas, joins, agregações e transações.', ['C07-01', 'C07-03', 'C07-02', 'C07-04']],
  [6, 'use-the-index', P, 'Como índices B-tree funcionam e como ler planos de execução.', ['C07-04', 'C07-09']],
  [6, 'nosql', A, 'Quando um banco de documentos ou chave-valor faz sentido e o que se perde em relação ao relacional.', ['nosql']],
  [6, 'mongodb', C, 'Leitura opcional para ver um banco de documentos na prática.', ['nosql']],
  [7, 'typescript', P, 'Tipos, interfaces, generics e narrowing. Converta um módulo do mini projeto para TypeScript.', ['C06-01']],
  [7, 'api-rest-node', P, 'Rotas, middlewares, validação e acesso ao banco. Compare com a sua API EZBikes.', ['C06-02', 'C06-03', 'C06-04', 'C06-05', 'C07-07']],
  [7, 'rest', P, 'Recursos, métodos, status codes, versionamento e tratamento de erros.', ['C06-04', 'C06-08', 'C06-10']],
  [7, 'principios-design', P, 'Os princípios SOLID com exemplos. Identifique uma violação na sua API.', ['solid', 'C06-09']],
  [7, 'padroes-projeto', C, 'Catálogo GoF: consulte Strategy, Factory, Adapter e Observer quando aparecerem.', ['solid']],
  [7, 'canivete-node', A, 'Ferramentas e bibliotecas do ecossistema Node; consulte quando precisar.', ['C06-06', 'C07-07']],
  [8, 'html-css', P, 'Semântica, formulários e layout com CSS.', ['html', 'C08-02']],
  [8, 'web-responsivo', P, 'Media queries, layout fluido e imagens responsivas.', ['C08-05']],
  [8, 'pwa-react', P, 'Componentes, estado e consumo de API em React, com foco no fluxo de dados.', ['C08-01', 'C08-02', 'C08-03', 'C08-04']],
  [8, 'ux-design', A, 'Heurísticas de usabilidade e testes com usuários. Avalie a tela do EZBikes.', ['C08-05', 'C08-08']],
  [8, 'css-eficiente', C, 'Organização e manutenção de CSS em projetos maiores.', ['html']],
  [9, 'arquitetura-limpa', P, 'Regra de dependência, fronteiras e camadas. Compare com a arquitetura da sua API.', ['C09-01', 'C09-02']],
  [9, 'ddd-rapido', A, 'Linguagem ubíqua, entidades, agregados e contextos delimitados.', ['ddd']],
  [9, 'docker', P, 'Imagens, Dockerfile, volumes, redes e Compose.', ['C09-03']],
  [9, 'entrega-continua', P, 'Pipeline de implantação, testes no pipeline e estratégias de rollback.', ['C09-04']],
  [9, 'kubernetes', P, 'Pods, Deployments, Services, ConfigMaps, Secrets e escalonamento.', ['C09-06', 'C09-07']],
  [9, 'aws-descomplicando', P, 'Serviços essenciais de computação, rede e banco gerenciado, e como pensar em custos.', ['C09-05', 'C09-09', 'C09-10']],
  [9, 'devops-pratica', A, 'Visão integrada de pipeline, infraestrutura como código e monitoramento.', ['C09-04', 'C09-08']],
  [9, 'arquitetura-intro', C, 'Coletânea introdutória de arquitetura; consulte para ver outras perspectivas.', ['C09-01']],
  [10, 'estatistica', P, 'Média, mediana, dispersão e distribuições: base para entender percentis (p95/p99).', ['estatistica']],
  [10, 'sre-book', P, 'Capítulos de SLOs, monitoramento de sistemas distribuídos e os quatro sinais de ouro.', ['C10-01', 'C10-02', 'C10-03', 'C10-04', 'C10-05']],
  [10, 'big-data', P, 'Arquiteturas de processamento de dados, pipelines e armazenamento.', ['C10-07', 'C10-08']],
  [10, 'mentir-estatistica', A, 'Como gráficos e médias enganam. Revise seus dashboards com esse olhar.', ['C10-03', 'C10-09']],
  [11, 'owasp-top10', P, 'Leia as categorias e os exemplos de prevenção, relacionando cada uma com o EZBikes.', ['C11-08', 'C11-07']],
  [11, 'owasp-threat-modeling', P, 'As quatro perguntas da modelagem de ameaças e o uso de STRIDE.', ['C11-06', 'C11-09']],
  [11, 'forouzan', C, 'Capítulos de criptografia e segurança de redes, como referência.', ['C11-03', 'C11-05']],
  [12, 'portswigger-academy', P, 'Leia o material de cada vulnerabilidade antes dos labs correspondentes.', ['C14-01', 'C12-01', 'C12-02', 'C12-03', 'C12-04', 'C12-05']],
  [12, 'owasp-wstg', P, 'Seções de testes de autenticação, autorização, sessão e validação de entrada.', ['C12-07', 'C12-09', 'C12-10']],
  [12, 'owasp-cheatsheets', A, 'Cheat sheets de XSS, SQL injection e CSRF como checklist de correção.', ['C12-02', 'C12-03', 'C12-04', 'C12-12']],
  [13, 'caixa-devops', P, 'Ferramentas de pipeline, configuração e infraestrutura: identifique onde inserir verificações de segurança.', ['C13-01', 'C13-02', 'C13-05']],
  [13, 'oauth2', P, 'Foque nos fluxos e papéis do OAuth 2.0 (resource owner, client, authorization server). Os exemplos são em Java/Spring.', ['C13-06']],
  [13, 'owasp-cheatsheets', P, 'Docker Security, Kubernetes Security, Secrets Management e Logging Cheat Sheets.', ['C13-04', 'C13-07', 'C14-06']],
  [13, 'aws-security', C, 'Seções de IAM, KMS, logs e resposta a incidentes na AWS.', ['C13-08', 'C13-09']],
  [14, 'owasp-wstg', P, 'Segunda passada: metodologia, escopo, coleta de evidências e relatório.', ['C14-02', 'C14-03', 'C14-05']],
  [14, 'owasp-llm', P, 'Prompt injection, vazamento de dados sensíveis e riscos de RAG.', ['C14-07', 'C14-08']],
  [14, 'clean-coder', A, 'Profissionalismo, compromissos e estimativas — útil para defender decisões no desafio final.', ['C14-09', 'C14-10']]
];
const pos = [
  ['big-data', 'Pipelines, camadas e armazenamento em larga escala.', ['P02']],
  ['business-intelligence', 'Modelagem analítica e camadas de dados para a atividade de engenharia de dados.', ['P02']],
  ['sre-book', 'Monitoramento, SLOs e orçamento de erro para o trabalho de Observabilidade/SRE.', ['P03', 'P04', 'P05', 'P06']],
  ['estatistica', 'Percentis e distribuições para interpretar métricas de latência.', ['P05', 'P06']],
  ['data-science', 'Fundamentos de machine learning antes das aulas de IA generativa e RAG.', ['P07', 'P08']],
  ['owasp-llm', 'Riscos de aplicações com LLM e RAG.', ['P08', 'P14']],
  ['entrega-continua', 'Pipeline de implantação como base para DevSecOps.', ['P11']],
  ['oauth2', 'Fluxos OAuth 2.0 para a aula de identidade e autenticação.', ['P12']],
  ['aws-security', 'IAM, logs e resiliência na nuvem.', ['P13']],
  ['arquitetura-limpa', 'Fronteiras e decisões arquiteturais para o seminário final.', ['P16']]
];
const careerRotation = ['programador-pragmatico', 'apprenticeship', 'buccaneer-scholar', 'soft-skills', 'programador-apaixonado', 'generalistas', 'software-craftsman', 'mythical-man-month', 'ego-inimigo', 'fragmentos', 'mestre-programador', 'clean-coder'];

const resolveTopic = key => (NEW[key] ? topics.find(t => t.legacy_id === null && t.title === NEW[key].title).id : legacyToNew[key] ?? key);
const readingPlan = [];
const perPhase = {};
for (const [phase, book, role, focus, refs] of plan) {
  if (!bookIds.has(book)) throw new Error(`Livro inexistente: ${book}`);
  perPhase[phase] = (perPhase[phase] ?? 0) + 1;
  readingPlan.push({ id: `L${String(phase).padStart(2, '0')}-${perPhase[phase]}`, phase, book_id: book, role, focus, topic_ids: refs.map(resolveTopic) });
}
pos.forEach(([book, focus, refs], i) => {
  if (!bookIds.has(book)) throw new Error(`Livro inexistente: ${book}`);
  readingPlan.push({ id: `LP-${i + 1}`, phase: 0, book_id: book, role: A, focus, topic_ids: refs });
});

// Confere se os PDFs citados existem no repositório (lista gerada com git ls-tree).
const listPath = process.argv[2];
if (listPath) {
  const files = new Set(fs.readFileSync(listPath, 'utf8').split(/\r?\n/).filter(Boolean));
  for (const b of books.filter(b => b.source === 'bibliotecadev')) {
    if (!files.has(b.file.replace('LivrosDev/', ''))) throw new Error(`PDF não encontrado na BibliotecaDev: ${b.file}`);
  }
}

const out = {
  version: '2.1',
  published_on: '2026-11-22',
  previous_version: '2.0',
  purpose: v2.purpose,
  rules: {
    ...v2.rules,
    ids: 'IDs estáveis a partir da 2.1: a plataforma sincroniza o progresso pelo ID. Ao reordenar, mude sort_order e topic_ids, nunca o ID.',
    optional: 'Conteúdos opcionais (optional: true) não bloqueiam o desafio de saída da etapa.',
    reading: 'Um livro da semana por vez, cerca de 20 min/dia em 5 dias. A leitura apoia a prática; não substitui as sessões PRIMM.'
  },
  dashboard_logic: [
    'Prazos reais que ocorrerão em até 14 dias (até 1 sessão em orçamentos < 75 min; até 2 em sessões maiores).',
    'Revisões vencidas, mesmo de assuntos concluídos.',
    'Assuntos em andamento já liberados.',
    'Pós-graduação em paralelo às terças, quintas e sábados quando houver tempo e não houver uma entrega da pós já selecionada; a aula mais próxima tem preferência.',
    'O próximo assunto liberado da trilha principal, na ordem da etapa.'
  ],
  portfolio_projects: [
    { title: 'EZBikes JavaScript', phases: [2, 3, 4], summary: 'Funções de busca, filtro, estoque e validação, com testes e versionamento, sem infraestrutura.' },
    { title: 'EZBikes Full Stack', phases: [6, 7, 8], summary: 'PostgreSQL, API Node/TypeScript, autenticação por usuário e frontend React.' },
    { title: 'EZBikes Cloud', phases: [9], summary: 'Docker, CI/CD, implantação, observabilidade e decisões de arquitetura.' },
    { title: 'ObservaLab', phases: [10], summary: 'Métricas, logs, traces, SLI/SLO, testes de carga e relatório de incidente.' },
    { title: 'EZBikes Secure', phases: [11, 12, 13, 14], summary: 'STRIDE, OWASP ASVS, testes de segurança em ambiente próprio, CI seguro, hardening e relatório final.' }
  ],
  phases,
  topics,
  legacy_id_map: legacyToNew,
  library: {
    name: 'BibliotecaDev',
    repo_url: REPO,
    file_base_url: `${REPO}/blob/main/`,
    note: 'Livros com source "bibliotecadev" apontam para o PDF no repositório. Itens "externo" são complementos gratuitos para lacunas da biblioteca.',
    books
  },
  reading_plan: readingPlan,
  career_rotation: careerRotation,
  library_gaps: [
    { area: 'JavaScript como linguagem', suggestion: 'A biblioteca não tem um livro de JavaScript. Complementos gratuitos: Eloquent JavaScript e You Don\'t Know JS Yet.' },
    { area: 'SQL e PostgreSQL', suggestion: 'Não há livro de SQL relacional. Complementos gratuitos: tutorial oficial do PostgreSQL e Use The Index, Luke!' },
    { area: 'Observabilidade e SRE', suggestion: 'Não há livro de SRE. Complementos gratuitos: Site Reliability Engineering e The Site Reliability Workbook (Google).' },
    { area: 'Segurança de aplicações', suggestion: 'Nenhum livro de AppSec. Use PortSwigger Academy e os guias OWASP (Top 10, WSTG, ASVS, Cheat Sheets). Candidatos para adquirir: "Alice and Bob Learn Application Security" (Tanya Janca), "Threat Modeling: Designing for Security" (Adam Shostack) e "Hacking APIs" (Corey Ball).' },
    { area: 'Dados e sistemas distribuídos', suggestion: 'Candidato para adquirir: "Designing Data-Intensive Applications" (Martin Kleppmann), útil para as etapas 6, 9 e 10 e para a pós.' },
    { area: 'IA generativa e LLMs', suggestion: 'Sem livro específico. Use OWASP Top 10 para LLM e o material das aulas da pós.' }
  ],
  postgrad_class_schedule: v2.postgrad_class_schedule,
  sources: v2.sources
};

fs.writeFileSync(path.join(root, 'trilha/devpath-trilha.json'), JSON.stringify(out, null, 2) + '\n');
console.log(`Trilha 2.1: ${phases.length} etapas, ${topics.filter(t => t.kind !== 'postgrad').length} conteúdos principais, ${topics.filter(t => t.kind === 'postgrad').length} da pós, ${readingPlan.length} semanas de leitura, ${books.length} livros.`);
