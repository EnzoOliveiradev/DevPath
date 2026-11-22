import type { CodeTest } from './runner';

// Banco de exercícios das sessões guiadas, organizado pelo método PRIMM:
// Prever → Executar → Investigar → Modificar → Criar.
//
// Saída do console: textos e números aparecem como estão; arrays e objetos em JSON.
// Os testes em tests/guided.test.mjs executam cada código e conferem os gabaritos.

interface Base { id: string; hints?: string[] }
export interface PredictExercise extends Base { kind: 'predict'; prompt?: string; code: string; options: string[]; answer: number; explanation: string }
export interface ConceptExercise extends Base { kind: 'concept'; prompt: string; options: string[]; answer: number; explanation: string }
export interface ExplainExercise extends Base { kind: 'explain'; prompt: string; code?: string; modelAnswer: string }
export interface CodeExercise extends Base {
  kind: 'code'; stage: 'Modificar' | 'Criar'; prompt: string; starter: string; solution: string;
  tests: (CodeTest & { label?: string })[];
}
export type Exercise = PredictExercise | ConceptExercise | ExplainExercise | CodeExercise;

/** code = ID estável do conteúdo na trilha (trilha/devpath-trilha.json). */
export interface TopicGuide { code: string; title: string; summary: string[]; exercises: Exercise[] }

export function stageOf(exercise: Exercise): string {
  switch (exercise.kind) {
    case 'predict': return 'Prever e executar';
    case 'concept': return 'Recuperar';
    case 'explain': return 'Investigar';
    case 'code': return exercise.stage;
  }
}

const TODO = '  // seu código aqui\n';

export const GUIDES: TopicGuide[] = [
  {
    code: 'C01-04', title: 'Variáveis, tipos e operadores',
    summary: [
      'let e const criam variáveis com escopo de bloco. const impede reatribuir a variável, mas não congela o objeto que ela referencia.',
      'typeof revela o tipo em tempo de execução: number, string, boolean, undefined, object, function…',
      '+ com uma string concatena; operadores como *, - e / convertem os valores para número.',
      '== converte os tipos antes de comparar; === compara valor e tipo. Prefira ===.'
    ],
    exercises: [
      { id: 'vto-p1', kind: 'predict', code: `let a = '5';
let b = 2;
console.log(a + b);
console.log(a * b);`,
        options: ['52\n10', '7\n10', '52\n52', '7\nNaN'], answer: 0,
        explanation: "Com uma string envolvida, + concatena: '5' + 2 = '52'. Já * converte '5' para número: 5 * 2 = 10.",
        hints: ['Observe o tipo de a: as aspas indicam uma string.'] },
      { id: 'vto-p2', kind: 'predict', code: `console.log(typeof null);
console.log(typeof []);
console.log(typeof undefined);`,
        options: ['null\narray\nundefined', 'object\nobject\nundefined', 'object\narray\nundefined', 'null\nobject\nundefined'], answer: 1,
        explanation: "typeof null é 'object' (uma peculiaridade histórica da linguagem) e arrays também são objetos. Para detectar arrays, use Array.isArray." },
      { id: 'vto-c1', kind: 'concept', prompt: 'Qual destas comparações resulta em false?',
        options: ['0 == ""', '1 == "1"', 'null == undefined', '1 === "1"'], answer: 3,
        explanation: '=== não converte tipos: o número 1 e a string "1" são diferentes. As outras usam == e convertem os valores antes de comparar.' },
      { id: 'vto-e1', kind: 'explain', code: `const usuario = { nome: 'Ana' };
usuario.nome = 'Bia';`,
        prompt: 'Explique por que este código não gera erro, mesmo usando const.',
        modelAnswer: 'const impede reatribuir a variável usuario a outro valor (usuario = {...} geraria erro). Mas o objeto referenciado continua mutável: alterar uma propriedade não reatribui a variável.' },
      { id: 'vto-m1', kind: 'code', stage: 'Modificar',
        prompt: 'A função deveria somar dois valores que chegam como texto de um formulário, mas está concatenando. Corrija somar para retornar um número.',
        starter: `function somar(a, b) {
  return a + b;
}
`,
        solution: `function somar(a, b) {
  return Number(a) + Number(b);
}
`,
        tests: [{ call: "somar('2', '3')", expected: 5 }, { call: "somar('10', '0.5')", expected: 10.5 }, { call: "somar('-4', '4')", expected: 0 }],
        hints: ['Valores de formulário chegam como string.', 'Number("2") converte texto em número.'] }
    ]
  },
  {
    code: 'C01-07', title: 'Condicionais e laços',
    summary: [
      'if/else escolhe um caminho; a primeira condição verdadeira vence, então a ordem dos testes importa.',
      'for é ideal quando você controla um contador; while repete enquanto a condição for verdadeira; do...while executa ao menos uma vez.',
      'continue pula para a próxima volta do laço; break encerra o laço.',
      'Para entender um laço, rastreie as variáveis a cada volta em uma pequena tabela.'
    ],
    exercises: [
      { id: 'cl-p1', kind: 'predict', code: `let total = 0;
for (let i = 1; i <= 4; i++) {
  if (i % 2 === 0) continue;
  total += i;
}
console.log(total);`,
        options: ['10', '4', '6', '3'], answer: 1,
        explanation: 'continue pula os pares (2 e 4). Só 1 e 3 são somados: total = 4.',
        hints: ['Monte uma tabela com i e total a cada volta.'] },
      { id: 'cl-p2', kind: 'predict', code: `let n = 3;
while (n > 0) {
  console.log(n);
  n -= 2;
}`,
        options: ['3\n1', '3\n2\n1', '3\n1\n-1', '3'], answer: 0,
        explanation: 'Imprime 3, n vira 1; imprime 1, n vira -1; a condição n > 0 falha e o laço termina.' },
      { id: 'cl-c1', kind: 'concept', prompt: 'Qual laço garante que o bloco seja executado pelo menos uma vez?',
        options: ['for', 'while', 'do...while', 'for...of'], answer: 2,
        explanation: 'do...while testa a condição depois de executar o bloco; os demais testam antes.' },
      { id: 'cl-e1', kind: 'explain', code: `function classificar(nota) {
  if (nota >= 7) return 'aprovado';
  if (nota >= 5) return 'recuperação';
  return 'reprovado';
}`,
        prompt: 'Por que a ordem dos ifs importa aqui? O que aconteceria se o teste nota >= 5 viesse primeiro?',
        modelAnswer: "Cada if retorna imediatamente. Se nota >= 5 fosse testado primeiro, uma nota 9 também satisfaria essa condição e retornaria 'recuperação'. O caso mais restritivo precisa vir antes." },
      { id: 'cl-m1', kind: 'code', stage: 'Criar',
        prompt: 'Escreva contarPares(lista), que retorna quantos números pares existem na lista, usando um laço.',
        starter: `function contarPares(lista) {
${TODO}}
`,
        solution: `function contarPares(lista) {
  let total = 0;
  for (const n of lista) {
    if (n % 2 === 0) total++;
  }
  return total;
}
`,
        tests: [{ call: 'contarPares([1, 2, 3, 4])', expected: 2 }, { call: 'contarPares([])', expected: 0 }, { call: 'contarPares([7, 9])', expected: 0 }, { call: 'contarPares([0, -2, 5])', expected: 2 }],
        hints: ['Crie um contador começando em 0.', 'n % 2 === 0 indica um número par.', 'for (const n of lista) percorre cada elemento.'] }
    ]
  },
  {
    code: 'C01-08', title: 'Funções e escopo',
    summary: [
      'Uma função recebe parâmetros, executa um bloco e devolve um valor com return. Sem return, ela devolve undefined.',
      'Variáveis declaradas dentro da função existem apenas lá dentro: é o escopo local.',
      'Uma variável local com o mesmo nome de uma externa a "sombreia", sem alterá-la.',
      'Parâmetros podem ter valores padrão, usados quando o argumento é undefined.'
    ],
    exercises: [
      { id: 'fe-p1', kind: 'predict', code: `let x = 1;
function mudar() {
  let x = 2;
  x++;
}
mudar();
console.log(x);`,
        options: ['1', '2', '3', 'undefined'], answer: 0,
        explanation: 'O let x dentro da função cria outra variável, local. O x externo nunca é alterado.' },
      { id: 'fe-p2', kind: 'predict', code: `function saudacao(nome = 'visitante') {
  return 'Olá, ' + nome;
}
console.log(saudacao());
console.log(saudacao(undefined));
console.log(saudacao(null));`,
        options: ['Olá, visitante\nOlá, visitante\nOlá, null', 'Olá, visitante\nOlá, undefined\nOlá, null', 'Olá, visitante\nOlá, visitante\nOlá, visitante', 'Olá, \nOlá, undefined\nOlá, null'], answer: 0,
        explanation: 'O valor padrão só é usado quando o argumento é undefined (omitido ou explícito). null é um valor, então é concatenado.',
        hints: ['Qual é a diferença entre null e undefined para parâmetros padrão?'] },
      { id: 'fe-c1', kind: 'concept', prompt: 'O que uma função retorna quando não possui return?',
        options: ['null', 'undefined', '0', 'Um erro é lançado'], answer: 1,
        explanation: 'Toda função devolve undefined se a execução terminar sem um return com valor.' },
      { id: 'fe-e1', kind: 'explain', code: `function calcularTotal(itens) {
  let total = 0;
  for (const item of itens) total += item.preco * item.qtd;
  return total;
}`,
        prompt: 'Descreva, passo a passo, o que acontece ao chamar calcularTotal([{ preco: 10, qtd: 2 }, { preco: 5, qtd: 1 }]) e qual é o resultado.',
        modelAnswer: 'total começa em 0. Primeiro item: 10 × 2 = 20, total = 20. Segundo: 5 × 1 = 5, total = 25. A função retorna 25. A variável total só existe dentro da função.' },
      { id: 'fe-m1', kind: 'code', stage: 'Modificar',
        prompt: 'aplicarDesconto grava o resultado em uma variável global em vez de devolvê-lo. Refatore para retornar o preço com desconto, sem depender de nada fora da função.',
        starter: `let resultado = 0;
function aplicarDesconto(preco, percentual) {
  resultado = preco - preco * percentual / 100;
}
`,
        solution: `function aplicarDesconto(preco, percentual) {
  return preco - preco * percentual / 100;
}
`,
        tests: [{ call: 'aplicarDesconto(100, 10)', expected: 90 }, { call: 'aplicarDesconto(50, 0)', expected: 50 }, { call: 'aplicarDesconto(80, 25)', expected: 60 }],
        hints: ['Funções devolvem valores com return.', 'Você pode apagar a variável resultado.'] }
    ]
  },
  {
    code: 'C02-06', title: 'Arrays, objetos, Map e Set',
    summary: [
      'Arrays guardam sequências ordenadas: push/pop operam no fim, shift/unshift no início.',
      'Objetos associam chaves a valores e são ótimos para contagens e agrupamentos.',
      'Set guarda valores únicos e responde has() rapidamente; Map associa chaves de qualquer tipo.',
      'Escolher a estrutura certa simplifica o código e melhora o desempenho.'
    ],
    exercises: [
      { id: 'ed-p1', kind: 'predict', code: `const lista = [10, 20, 30];
lista.push(40);
const primeiro = lista.shift();
console.log(primeiro, lista.length);`,
        options: ['10 3', '40 3', '10 4', '40 4'], answer: 0,
        explanation: 'push adiciona 40 no fim (4 itens). shift remove e devolve o primeiro (10), restando 3 itens.' },
      { id: 'ed-p2', kind: 'predict', code: `const contagem = {};
for (const letra of 'banana') {
  contagem[letra] = (contagem[letra] || 0) + 1;
}
console.log(contagem);`,
        options: ['{"b":1,"a":3,"n":2}', '{"b":1,"a":1,"n":1}', '{"banana":1}', '{"b":1,"a":2,"n":2}'], answer: 0,
        explanation: 'for...of percorre cada letra. Na primeira ocorrência, contagem[letra] é undefined e (undefined || 0) + 1 = 1; depois, o valor é incrementado.',
        hints: ['Quantas vezes cada letra aparece em "banana"?'] },
      { id: 'ed-c1', kind: 'concept', prompt: 'Você precisa verificar muitas vezes se um e-mail já foi cadastrado, entre milhares. Qual estrutura torna essa consulta mais eficiente?',
        options: ['Array com includes()', 'Set com has()', 'String concatenada com indexOf()', 'Array com find()'], answer: 1,
        explanation: 'Set.has() tem custo médio constante; includes() e find() percorrem a lista item a item.' },
      { id: 'ed-e1', kind: 'explain', code: `const pilha = [];
pilha.push('a');
pilha.push('b');
pilha.pop();`,
        prompt: 'O que sobra em pilha e por que esse comportamento é chamado de LIFO?',
        modelAnswer: "Sobra ['a']. pop remove o último elemento inserido ('b'). LIFO (last in, first out): o último a entrar é o primeiro a sair, como uma pilha de pratos." },
      { id: 'ed-m1', kind: 'code', stage: 'Criar',
        prompt: 'Escreva agruparPorCategoria(produtos), que recebe [{ nome, categoria }] e retorna um objeto cujas chaves são as categorias e os valores, listas de nomes.',
        starter: `function agruparPorCategoria(produtos) {
${TODO}}
`,
        solution: `function agruparPorCategoria(produtos) {
  const grupos = {};
  for (const p of produtos) {
    if (!grupos[p.categoria]) grupos[p.categoria] = [];
    grupos[p.categoria].push(p.nome);
  }
  return grupos;
}
`,
        tests: [
          { call: "agruparPorCategoria([{ nome: 'Maçã', categoria: 'fruta' }, { nome: 'Pão', categoria: 'padaria' }, { nome: 'Uva', categoria: 'fruta' }])", expected: { fruta: ['Maçã', 'Uva'], padaria: ['Pão'] } },
          { call: 'agruparPorCategoria([])', expected: {} }
        ],
        hints: ['Comece com um objeto vazio.', 'Se a categoria ainda não existe no objeto, crie um array vazio para ela.'] }
    ]
  },
  {
    code: 'C02-04', title: 'Arrays: map, filter e reduce',
    summary: [
      'map transforma cada item e devolve um array do mesmo tamanho.',
      'filter mantém apenas os itens cuja função retorna true.',
      'reduce combina todos os itens em um único valor, partindo de um acumulador inicial.',
      'Nenhum dos três altera o array original: eles devolvem novos valores.'
    ],
    exercises: [
      { id: 'mfr-p1', kind: 'predict', code: `const nums = [1, 2, 3, 4];
const r = nums.filter(n => n > 1).map(n => n * 10);
console.log(r);`,
        options: ['[20,30,40]', '[10,20,30,40]', '[false,true,true,true]', '[2,3,4]'], answer: 0,
        explanation: 'filter mantém [2, 3, 4]; map multiplica cada um por 10.' },
      { id: 'mfr-p2', kind: 'predict', code: `const total = [5, 10, 15].reduce((acc, n) => acc + n, 100);
console.log(total);`,
        options: ['30', '130', '100', '[105,110,115]'], answer: 1,
        explanation: 'O acumulador começa em 100: 100 + 5 + 10 + 15 = 130.',
        hints: ['O segundo argumento de reduce é o valor inicial do acumulador.'] },
      { id: 'mfr-c1', kind: 'concept', prompt: 'Qual método sempre retorna um novo array com o MESMO tamanho do original?',
        options: ['filter', 'map', 'reduce', 'find'], answer: 1,
        explanation: 'map produz exatamente um resultado por item. filter pode encolher o array; reduce e find devolvem um único valor.' },
      { id: 'mfr-e1', kind: 'explain', code: `const pedidos = [
  { valor: 50, pago: true },
  { valor: 30, pago: false },
  { valor: 20, pago: true }
];
const recebido = pedidos
  .filter(p => p.pago)
  .reduce((soma, p) => soma + p.valor, 0);`,
        prompt: 'Explique cada etapa da cadeia e o valor final de recebido.',
        modelAnswer: 'filter mantém só os pedidos pagos (valores 50 e 20). reduce começa com soma = 0 e acumula: 0 + 50 = 50, 50 + 20 = 70. recebido = 70.' },
      { id: 'mfr-m1', kind: 'code', stage: 'Modificar',
        prompt: 'A função deveria retornar, em maiúsculas, apenas os nomes dos alunos aprovados (nota >= 7), mas está retornando todos. Corrija.',
        starter: `function aprovados(alunos) {
  return alunos.map(a => a.nome.toUpperCase());
}
`,
        solution: `function aprovados(alunos) {
  return alunos
    .filter(a => a.nota >= 7)
    .map(a => a.nome.toUpperCase());
}
`,
        tests: [{ call: "aprovados([{ nome: 'ana', nota: 8 }, { nome: 'bruno', nota: 5 }, { nome: 'caio', nota: 7 }])", expected: ['ANA', 'CAIO'] }, { call: 'aprovados([])', expected: [] }],
        hints: ['Antes de transformar, descarte quem não foi aprovado.', 'Encadeie: alunos.filter(...).map(...)'] }
    ]
  },
  {
    code: 'C02-05', title: 'Objetos e destructuring',
    summary: [
      'Variáveis guardam referências a objetos: duas variáveis podem apontar para o mesmo objeto.',
      'O spread { ...obj } cria uma cópia rasa; propriedades posteriores sobrescrevem as anteriores.',
      'Desestruturação extrai propriedades para variáveis: const { nome } = usuario.',
      'O rest ...resto reúne as propriedades que não foram extraídas.'
    ],
    exercises: [
      { id: 'od-p1', kind: 'predict', code: `const a = { nome: 'Ana', idade: 30 };
const b = a;
b.idade = 31;
console.log(a.idade);`,
        options: ['30', '31', 'undefined', 'Erro'], answer: 1,
        explanation: 'b = a copia a referência, não o objeto. a e b apontam para o mesmo objeto.' },
      { id: 'od-p2', kind: 'predict', code: `const config = { tema: 'escuro', fonte: 14 };
const nova = { ...config, fonte: 16, idioma: 'pt' };
const { tema, ...resto } = nova;
console.log(tema);
console.log(resto);`,
        options: ['escuro\n{"fonte":16,"idioma":"pt"}', 'escuro\n{"fonte":14,"idioma":"pt"}', 'escuro\n{"tema":"escuro","fonte":16,"idioma":"pt"}', 'undefined\n{"fonte":16,"idioma":"pt"}'], answer: 0,
        explanation: 'fonte: 16 vem depois do spread e sobrescreve 14. A desestruturação retira tema e ...resto reúne o restante.' },
      { id: 'od-c1', kind: 'concept', prompt: 'Qual forma cria uma cópia rasa de um objeto obj?',
        options: ['const c = obj', 'const c = { ...obj }', 'const c = obj.copy()', 'const { c } = obj'], answer: 1,
        explanation: 'O spread copia as propriedades para um novo objeto. const c = obj só copia a referência; objetos comuns não têm método copy.' },
      { id: 'od-e1', kind: 'explain', code: `function criarUsuario({ nome, ativo = true }) {
  return { nome, ativo };
}`,
        prompt: "Explique o que a função recebe e o que acontece ao chamar criarUsuario({ nome: 'Lia' }).",
        modelAnswer: "Ela recebe um objeto e extrai nome e ativo por desestruturação no próprio parâmetro; ativo tem valor padrão true. O retorno usa a forma abreviada de propriedades: { nome: 'Lia', ativo: true }." },
      { id: 'od-m1', kind: 'code', stage: 'Modificar',
        prompt: 'atualizarEmail altera o objeto recebido, causando efeitos colaterais. Faça-a retornar um NOVO objeto com o e-mail atualizado, sem modificar o original.',
        starter: `function atualizarEmail(usuario, email) {
  usuario.email = email;
  return usuario;
}
`,
        solution: `function atualizarEmail(usuario, email) {
  return { ...usuario, email };
}
`,
        tests: [
          { label: 'Original preservado e novo objeto atualizado', call: "(() => { const u = { nome: 'Ana', email: 'a@x.com' }; const novo = atualizarEmail(u, 'b@x.com'); return [u.email, novo.email, novo.nome]; })()", expected: ['a@x.com', 'b@x.com', 'Ana'] },
          { label: 'Retorna um objeto diferente do recebido', call: "(() => { const u = { nome: 'Ana', email: 'a@x.com' }; return atualizarEmail(u, 'c@x.com') !== u; })()", expected: true }
        ],
        hints: ['Não altere usuario: crie outro objeto.', 'O spread { ...usuario } copia as propriedades existentes.'] }
    ]
  },
  {
    code: 'C03-02', title: 'Closures e callbacks',
    summary: [
      'Funções são valores: podem ser passadas como argumento (callbacks) e retornadas por outras funções.',
      'Uma closure é uma função que continua acessando as variáveis do escopo onde foi criada.',
      'Cada chamada da função externa cria um novo escopo, com variáveis independentes.',
      'Closures permitem guardar estado privado sem variáveis globais.'
    ],
    exercises: [
      { id: 'cc-p1', kind: 'predict', code: `function criarContador() {
  let n = 0;
  return () => ++n;
}
const c1 = criarContador();
const c2 = criarContador();
c1();
c1();
console.log(c1(), c2());`,
        options: ['3 1', '3 3', '1 1', '2 1'], answer: 0,
        explanation: 'Cada chamada de criarContador cria seu próprio n. c1 foi chamado 3 vezes; c2, uma.',
        hints: ['c1 e c2 compartilham a mesma variável n?'] },
      { id: 'cc-p2', kind: 'predict', code: `function executar(fn, valor) {
  return fn(valor);
}
console.log(executar(x => x * 2, 5));
console.log(executar(String, 5) + 1);`,
        options: ['10\n6', '10\n51', '10\nNaN', '5\n6'], answer: 1,
        explanation: "String(5) devolve a string '5'; '5' + 1 concatena e resulta em '51'." },
      { id: 'cc-c1', kind: 'concept', prompt: 'O que é uma closure?',
        options: ['Uma função que chama a si mesma', 'Uma função que mantém acesso às variáveis do escopo onde foi criada', 'Um objeto com propriedades congeladas', 'Uma função executada imediatamente após ser declarada'], answer: 1,
        explanation: 'A closure "lembra" o escopo léxico de onde foi definida, mesmo depois que a função externa terminou.' },
      { id: 'cc-e1', kind: 'explain', code: `function multiplicador(fator) {
  return numero => numero * fator;
}
const triplo = multiplicador(3);
triplo(4);`,
        prompt: 'Por que triplo(4) ainda conhece o valor de fator, se multiplicador já terminou de executar?',
        modelAnswer: 'A função retornada é uma closure: mantém referência ao escopo onde foi criada, incluindo fator = 3. Por isso triplo(4) retorna 12 mesmo depois do fim de multiplicador.' },
      { id: 'cc-m1', kind: 'code', stage: 'Criar',
        prompt: 'Escreva criarAcumulador(inicial), que retorna uma função. Cada chamada dessa função com um número soma o valor ao total guardado e retorna o total atual.',
        starter: `function criarAcumulador(inicial) {
${TODO}}
`,
        solution: `function criarAcumulador(inicial) {
  let total = inicial;
  return valor => {
    total += valor;
    return total;
  };
}
`,
        tests: [
          { label: 'Acumula entre chamadas', call: '(() => { const acc = criarAcumulador(10); acc(5); return acc(2); })()', expected: 17 },
          { label: 'Cada acumulador tem o próprio total', call: '(() => { const a = criarAcumulador(0); const b = criarAcumulador(100); a(1); return [a(1), b(1)]; })()', expected: [2, 101] }
        ],
        hints: ['Guarde o total em uma variável dentro de criarAcumulador.', 'Retorne uma função que altera essa variável e devolve o valor.'] }
    ]
  },
  {
    code: 'C03-06', title: 'Módulos e tratamento de erros',
    summary: [
      'throw interrompe a execução e sobe pela pilha de chamadas até encontrar um catch.',
      'try/catch captura o erro; finally sempre executa, com ou sem erro, inclusive após return.',
      'Trate erros onde for possível tomar uma decisão útil, não apenas para escondê-los.',
      'Módulos organizam o código: export nomeado (vários por arquivo) e export default (um por arquivo).'
    ],
    exercises: [
      { id: 'me-p1', kind: 'predict', code: `function dividir(a, b) {
  if (b === 0) throw new Error('divisão por zero');
  return a / b;
}
try {
  console.log(dividir(10, 2));
  console.log(dividir(1, 0));
  console.log('fim');
} catch (e) {
  console.log('erro: ' + e.message);
}`,
        options: ['5\nerro: divisão por zero', '5\nerro: divisão por zero\nfim', '5\nInfinity\nfim', 'erro: divisão por zero'], answer: 0,
        explanation: "O throw interrompe o bloco try imediatamente: 'fim' nunca é impresso." },
      { id: 'me-p2', kind: 'predict', code: `function ler() {
  try {
    return 'try';
  } finally {
    console.log('finally');
  }
}
console.log(ler());`,
        options: ['try\nfinally', 'finally\ntry', 'try', 'finally'], answer: 1,
        explanation: "finally executa antes de a função de fato devolver o valor; só depois o console.log externo imprime 'try'.",
        hints: ['Quando exatamente o console.log de fora recebe o valor?'] },
      { id: 'me-c1', kind: 'concept', prompt: 'Qual é a diferença entre export default e export nomeado?',
        options: ['Não há diferença', 'Um módulo tem no máximo um export default; exports nomeados podem ser vários e são importados com chaves', 'export default só funciona com classes', 'Exports nomeados não podem ser funções'], answer: 1,
        explanation: "import x from './m' pega o default; import { a, b } from './m' pega exports nomeados." },
      { id: 'me-e1', kind: 'explain', code: `async function carregar() {
  try {
    const resposta = await fetch('/api/dados');
    if (!resposta.ok) throw new Error('HTTP ' + resposta.status);
    return await resposta.json();
  } catch (erro) {
    console.error('Falha ao carregar:', erro.message);
    return [];
  }
}`,
        prompt: 'Por que é necessário verificar resposta.ok, se já existe um try/catch?',
        modelAnswer: 'fetch só rejeita a Promise em falhas de rede. Respostas 404 ou 500 chegam normalmente; sem checar ok, um erro do servidor seria tratado como sucesso. O throw transforma esse caso em exceção capturada pelo catch.' },
      { id: 'me-m1', kind: 'code', stage: 'Modificar',
        prompt: 'lerConfig quebra quando recebe um JSON inválido. Faça-a retornar { erro: true } nesses casos, em vez de lançar exceção.',
        starter: `function lerConfig(texto) {
  return JSON.parse(texto);
}
`,
        solution: `function lerConfig(texto) {
  try {
    return JSON.parse(texto);
  } catch (erro) {
    return { erro: true };
  }
}
`,
        tests: [{ call: `lerConfig('{"tema":"claro"}')`, expected: { tema: 'claro' } }, { call: "lerConfig('{invalido')", expected: { erro: true } }, { call: "lerConfig('')", expected: { erro: true } }],
        hints: ['JSON.parse lança SyntaxError com texto inválido.', 'Envolva a chamada em try/catch.'] }
    ]
  }
];

export function guideFor(topic: { code?: string | null; title: string }): TopicGuide | undefined {
  // Pelo código da trilha; o título cobre bancos ainda sem a migração v3.
  return GUIDES.find(g => topic.code ? g.code === topic.code : g.title === topic.title);
}
