# DevPath 2.1 — trilha completa de lógica à cibersegurança

> Versão 2.1 (22/11/2026): revisão da 2.0 com nova ordem, 8 conteúdos novos e livros da semana da BibliotecaDev. O porquê de cada mudança está em [AVALIACAO_TRILHA.md](AVALIACAO_TRILHA.md).
> Arquivo gerado a partir de `devpath-trilha.json`. Edite o JSON e rode `npm run trilha:build`; não edite este arquivo à mão.

## Objetivo

Desenvolver leitura, previsão, depuração e implementação independente de código; depois arquitetura e segurança. A pós ocorre em trilha paralela para não perder aulas e prazos.

**Método de cada sessão:** Predict → Run → Investigate → Modify → Make (PRIMM), com tentativa independente, testes e revisão espaçada.

**Critério sugerido antes de avançar:** compreender pelo menos 80% de critérios definidos de código inédito, recuperar 4/5 de memória após 48h e resolver com ajuda 0 ou 1 (nenhuma/documentação). Nas sessões guiadas do DevPath a nota de memória é calculada pelos acertos.

**Carga inicial:** 5 sessões por semana, começar em 30–60 min; ampliar após duas semanas de constância. Os minutos do catálogo representam sessões introdutórias, não o total para dominar o assunto; capstones, revisões e correções adicionam trabalho.

**Leitura:** Um livro da semana por vez, cerca de 20 min/dia em 5 dias. A leitura apoia a prática; não substitui as sessões PRIMM.

**IDs:** IDs estáveis a partir da 2.1: a plataforma sincroniza o progresso pelo ID. Ao reordenar, mude sort_order e topic_ids, nunca o ID.

## Mapa geral

| Etapa | Tema | Conteúdos | Horas de sessões base | Livro principal |
|---|---|---:|---:|---|
| 01 | Raciocínio computacional e leitura de código | 11 | 6,0 | But How Do It Know? |
| 02 | JavaScript essencial | 12 | 6,8 | You Don't Know JS: Iniciando |
| 03 | JavaScript intermediário e debugging | 11 | 6,3 | You Don't Know JS: Escopos & Closures |
| 04 | Estruturas de dados, algoritmos e qualidade | 8 | 4,5 | Entendendo Algoritmos |
| 05 | Ambiente profissional, Linux, Git, redes e HTTP | 10 | 5,5 | Começando com o Linux |
| 06 | Dados, SQL e PostgreSQL | 9 | 7,0 | Tutorial oficial do PostgreSQL |
| 07 | Backend Node.js e TypeScript | 12 | 9,3 | Guia prático de TypeScript |
| 08 | Frontend React e aplicação ponta a ponta | 9 | 7,0 | HTML5 e CSS3 — domine a web do futuro |
| 09 | Arquitetura, containers, cloud e Kubernetes | 11 | 8,5 | Arquitetura Limpa |
| 10 | Observabilidade, SRE e engenharia de dados | 10 | 7,5 | Estatística — o que é, para que serve, como funciona |
| 11 | Fundamentos de segurança e raciocínio ofensivo/defensivo | 9 | 7,0 | OWASP Top 10:2025 |
| 12 | AppSec e segurança de aplicações web | 13 | 10,0 | Web Security Academy |
| 13 | DevSecOps, IAM, cloud security, detecção e resposta | 11 | 8,5 | Caixa de Ferramentas DevOps |
| 14 | Avaliação de segurança autorizada e segurança de IA | 8 | 6,5 | OWASP Web Security Testing Guide |

> 144 conteúdos principais (incluindo 14 desafios de saída) e 16 tópicos paralelos da pós. O conteúdo-base soma 100,3 h de sessões sugeridas; a formação completa exigirá bem mais prática e revisão. Não há prazo fixo de conclusão.

## Trilha principal — etapas e portões de progresso

### 01 — Raciocínio computacional e leitura de código

**Meta:** Interpretar programas simples, rastrear estado e descrever o fluxo sem ajuda  
**Saída:** Ler dois trechos inéditos de 20–40 linhas e acertar pelo menos 8/10 critérios sem IA

- **C01-01 — Ambiente de estudo: VS Code, terminal e Node.js** (30 min, novo na 2.1): Executar JavaScript no Node, usar o REPL e pausar a execução com breakpoints. Prática: Instale o Node LTS, rode node -v, execute um arquivo .js pelo terminal e pare a execução em um breakpoint no VS Code. [Material](https://nodejs.org/learn/getting-started/introduction-to-nodejs). Leitura: But How Do It Know?.
- **C01-02 — Leitura de código sem IA — diagnóstico inicial** (30 min, era C01-09): Medir a capacidade atual em trechos desconhecidos antes de estudar a etapa. Prática: Resolva um teste com 10 critérios, sem consultar nem IA. [Material](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide). Leitura: Learning 3.0 — como os profissionais criativos aprendem.
- **C01-03 — Raciocínio lógico e pseudocódigo** (30 min, era C01-01): Decompor problemas em entrada, processamento e saída. Prática: Escreva pseudocódigo para validar um pedido e execute mentalmente 3 cenários. [Material](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide). Leitura: You Don't Know JS: Iniciando; Learning 3.0 — como os profissionais criativos aprendem.
- **C01-04 — Variáveis, tipos e operadores** (30 min, era C01-02): Rastrear mudanças de estado e coerção de tipos. Prática: Faça uma tabela de variáveis linha a linha e preveja 5 saídas. [Material](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Grammar_and_types). Leitura: But How Do It Know?; You Don't Know JS: Iniciando.
- **C01-05 — Tabela de execução (dry run)** (30 min): Manter uma trilha de valores durante a execução. Prática: Monte o trace de um algoritmo sem rodar e compare com o debugger. [Material](https://pythontutor.com/javascript.html). Leitura: But How Do It Know?.
- **C01-06 — Operadores booleanos e tabelas verdade** (30 min): Interpretar AND, OR, NOT e short-circuit. Prática: Monte 8 previsões de expressão e verifique no Node. [Material](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Expressions_and_operators). Leitura: You Don't Know JS: Iniciando.
- **C01-07 — Condicionais e laços** (30 min, era C01-03): Entender ramificações, loop e condição de parada. Prática: Preveja a saída de 5 laços e corrija um loop infinito. [Material](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Loops_and_iteration). Leitura: You Don't Know JS: Iniciando.
- **C01-08 — Funções e escopo** (30 min, era C01-04): Distinguir parâmetros, argumentos, retornos e variáveis locais. Prática: Explique a execução de 3 chamadas aninhadas e modifique uma função. [Material](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Functions). Leitura: You Don't Know JS: Iniciando.
- **C01-09 — Entrada, processamento e saída** (30 min, era C01-08): Identificar contratos de funções e transformações. Prática: Leia um código alheio e desenhe seu fluxo de dados. [Material](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide). Leitura: Como ser um Programador Melhor.
- **C01-10 — Erros, casos de borda e invariantes** (30 min, era C01-07): Descrever pré-condições, pós-condições e falhas esperadas. Prática: Liste 5 entradas extremas e defina o comportamento esperado. [Material](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Control_flow_and_error_handling). Leitura: Como ser um Programador Melhor.
- **C01-11 — Desafio de saída 01 — interpretar código** (60 min, era C01-10): Explicar, prever e alterar códigos curtos inéditos. Prática: Acerte 8/10 critérios em dois trechos diferentes, justificando cada saída. [Material](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide). Leitura: Como ser um Programador Melhor.

### 02 — JavaScript essencial

**Meta:** Ler e escrever operações básicas sem depender de exemplos prontos  
**Saída:** Implementar 4 funções sem IA e explicar como a execução altera os valores

- **C02-01 — Sintaxe, declaração e operadores JS** (30 min): Diferenciar let/const e tipos primitivos no runtime. Prática: Preveja saídas com comparações, coerção e operadores de atribuição. [Material](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Expressions_and_operators). Leitura: You Don't Know JS: Iniciando; You Don't Know JS: Tipos & Gramática; Eloquent JavaScript (4ª ed., online).
- **C02-02 — Strings, numbers e datas** (30 min, era C02-04): Tratar parsing, formatação e validação básica. Prática: Implemente normalização de nomes e números sem copiar. [Material](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Numbers_and_strings). Leitura: You Don't Know JS: Tipos & Gramática; Eloquent JavaScript (4ª ed., online); Expressões Regulares — uma abordagem divertida.
- **C02-03 — Funções, callbacks básicos e arrow functions** (30 min, era C02-05): Rastrear parâmetros e callbacks de transformação. Prática: Transforme uma função tradicional em arrow e teste seu retorno. [Material](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Functions/Arrow_functions). Leitura: You Don't Know JS: Iniciando; Eloquent JavaScript (4ª ed., online); Código Limpo; You Don't Know JS: ES6 & Além.
- **C02-04 — Arrays: map, filter e reduce** (30 min, era C02-02): Ler pipelines de transformação de coleções. Prática: Preveja e modifique map/filter/reduce em 3 conjuntos de dados. [Material](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array). Leitura: Código Limpo.
- **C02-05 — Objetos e destructuring** (30 min, era C02-03): Interpretar propriedades, cópias, referências e spread. Prática: Explique mutabilidade e corrija uma alteração indesejada. [Material](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Destructuring). Leitura: Eloquent JavaScript (4ª ed., online); You Don't Know JS: ES6 & Além.
- **C02-06 — Arrays, objetos, Map e Set** (30 min): Selecionar estrutura adequada para cada problema. Prática: Agrupe registros e remova duplicatas usando duas estruturas diferentes. [Material](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Keyed_collections). Leitura: You Don't Know JS: Tipos & Gramática; Eloquent JavaScript (4ª ed., online); You Don't Know JS: ES6 & Além.
- **C02-07 — Nullish coalescing e optional chaining** (30 min): Interpretar dados opcionais e valores ausentes. Prática: Corrija uma leitura de objeto aninhado que gera erro. [Material](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Optional_chaining).
- **C02-08 — JSON, serialização e parsing** (30 min): Entender dados na fronteira entre serviços. Prática: Converta um payload e valide um formato esperado. [Material](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/JSON). Leitura: You Don't Know JS: Tipos & Gramática.
- **C02-09 — Testes automatizados com node:test** (30 min, era C04-07): Criar testes unitários, parametrizados e casos de borda. Prática: Escreva 10 testes de funções puras com runner do Node. [Material](https://nodejs.org/learn/test-runner/introduction). Leitura: Testes Automatizados de Software — um guia prático.
- **C02-10 — Git essencial: commits, branches e GitHub** (30 min, novo na 2.1): Versionar o próprio código com commits pequenos e publicá-lo no GitHub. Prática: Crie o repositório do estoque EZBikes, faça 5 commits descritivos, uma branch e envie ao GitHub. [Material](https://git-scm.com/book/pt-br/v2). Leitura: Controlando Versões com Git e GitHub.
- **C02-11 — Mini projeto JS — estoque EZBikes** (45 min, era C02-09): Modelar produtos e filtrar bicicletas por preço/categoria. Prática: Crie consulta de estoque e testes simples, com explicação linha a linha. [Material](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide). Leitura: Código Limpo; Testes Automatizados de Software — um guia prático; Controlando Versões com Git e GitHub.
- **C02-12 — Desafio de saída 02 — funções e coleções** (60 min, era C02-10): Resolver transformações inéditas sem depender de IA. Prática: Implemente 4 funções e explique duas implementações de terceiros. [Material](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide). Leitura: Controlando Versões com Git e GitHub.

### 03 — JavaScript intermediário e debugging

**Meta:** Entender assincronismo e depurar aplicações sem depender da solução de IA  
**Saída:** Explicar ordem de execução, capturar erros e isolar um bug reproduzível

- **C03-01 — Debugging com breakpoints** (30 min, era C03-06): Usar depurador, stack trace, watch e passos. Prática: Investigue um bug real e registre causa e correção. [Material](https://nodejs.org/learn/getting-started/debugging). Leitura: O Programador Pragmático.
- **C03-02 — Closures e callbacks** (30 min, era C03-01): Explicar estado capturado, efeitos e callbacks. Prática: Preveja saídas de closures e conserte um callback com estado inesperado. [Material](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Closures). Leitura: You Don't Know JS: Escopos & Closures.
- **C03-03 — Hoisting, escopo lexical e this** (30 min, era C03-02): Diferenciar ambientes de execução e binding. Prática: Rastreie 4 exemplos de this e escopo, prevendo o resultado. [Material](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/this). Leitura: You Don't Know JS: Escopos & Closures; You Don't Know JS: this & Prototipagem de Objetos.
- **C03-04 — Classes, protótipos e orientação a objetos em JS** (30 min, novo na 2.1): Ler classes, construtores, herança e a cadeia de protótipos. Prática: Modele Produto e Bicicleta com classes, explique o this de cada método e compare com uma versão feita só com funções e objetos. [Material](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Classes). Leitura: You Don't Know JS: this & Prototipagem de Objetos; Eloquent JavaScript (4ª ed., online); You Don't Know JS: ES6 & Além.
- **C03-05 — Manipulação imutável e efeitos colaterais** (30 min, era C03-07): Identificar mutações inesperadas e funções puras. Prática: Refatore função com mutação global e compare os testes. [Material](https://nodejs.org/en/learn). Leitura: O Programador Pragmático.
- **C03-06 — Módulos e tratamento de erros** (30 min, era C03-05): Aplicar import/export, throw, try/catch e erro tipado. Prática: Separe funções em módulos e trate três casos de erro. [Material](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Modules). Leitura: You Don't Know JS: Escopos & Closures; Eloquent JavaScript (4ª ed., online); You Don't Know JS: ES6 & Além.
- **C03-07 — Promises e async/await** (30 min, era C03-03): Explicar execução assíncrona e propagação de erros. Prática: Preveja a ordem de 8 logs com promises e temporizadores. [Material](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Using_promises). Leitura: You Don't Know JS: Async & Performance; Eloquent JavaScript (4ª ed., online).
- **C03-08 — Event loop e microtasks** (30 min, era C03-04): Diferenciar pilha, fila e tarefas assíncronas. Prática: Desenhe a ordem de eventos de um snippet com await e timers. [Material](https://nodejs.org/learn/asynchronous-work/event-loop-timers-and-nexttick). Leitura: You Don't Know JS: Async & Performance; Eloquent JavaScript (4ª ed., online).
- **C03-09 — Leitura de código legado** (30 min, era C03-08): Reconstruir fluxo de funções em diferentes arquivos. Prática: Explique o comportamento de 60 linhas desconhecidas antes de editar. [Material](https://nodejs.org/en/learn). Leitura: Trabalho Eficaz com Código Legado.
- **C03-10 — Mini projeto — cliente HTTP resiliente** (45 min, era C03-09): Tratar timeout, retries limitados e erros de uma API. Prática: Consuma uma API simulada com erros e logs, com testes. [Material](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API/Using_Fetch). Leitura: O Programador Pragmático.
- **C03-11 — Desafio de saída 03 — depuração** (60 min, era C03-10): Diagnosticar um bug novo e explicar a correção. Prática: Identifique causa raiz em menos de 45 min e deixe teste de regressão. [Material](https://nodejs.org/en/learn). Leitura: Trabalho Eficaz com Código Legado.

### 04 — Estruturas de dados, algoritmos e qualidade

**Meta:** Escolher estruturas, compreender custos e verificar comportamentos  
**Saída:** Passar testes de correção e justificar complexidade e casos limites

- **C04-01 — Complexidade e algoritmos** (30 min): Explicar O(1), O(n), O(n²), custo de memória. Prática: Compare duas soluções com tamanhos crescentes e justifique o custo. [Material](https://developer.mozilla.org/en-US/docs/Web/JavaScript). Leitura: Entendendo Algoritmos; Algoritmos — Teoria e Prática.
- **C04-02 — Busca linear e binária** (30 min): Entender precondições e invariantes de busca. Prática: Implemente duas buscas e teste lista vazia e duplicados. [Material](https://developer.mozilla.org/en-US/docs/Web/JavaScript). Leitura: Entendendo Algoritmos.
- **C04-03 — Ordenação e comparadores** (30 min): Explicar critério de ordenação e estabilidade. Prática: Ordene pedidos por critérios sem modificar os dados originais. [Material](https://developer.mozilla.org/en-US/docs/Web/JavaScript). Leitura: Entendendo Algoritmos.
- **C04-04 — Recursão e iteração** (30 min, era C04-05): Identificar caso-base, progresso e stack. Prática: Reescreva uma solução recursiva de forma iterativa. [Material](https://developer.mozilla.org/en-US/docs/Web/JavaScript). Leitura: Entendendo Algoritmos.
- **C04-05 — Pilha, fila, lista e hash map** (30 min, era C04-04): Aplicar estruturas a problemas de operação. Prática: Simule fila de atendimento e cache de consultas. [Material](https://developer.mozilla.org/en-US/docs/Web/JavaScript). Leitura: Entendendo Algoritmos.
- **C04-06 — Algoritmos de grafos: introdução** (30 min): Modelar dependências e percursos em grafos. Prática: Represente pré-requisitos de uma trilha e detecte ciclo simples. [Material](https://developer.mozilla.org/en-US/docs/Web/JavaScript). Leitura: Entendendo Algoritmos; Algoritmos — Teoria e Prática.
- **C04-07 — Refatoração e legibilidade** (30 min, era C04-08): Reduzir duplicação e melhorar nomes e contratos. Prática: Melhore código feio sem mudar seus resultados e prove por testes. [Material](https://refactoring.guru/pt-br/refactoring). Leitura: Refatoração.
- **C04-08 — Desafio de saída 04 — algoritmos testáveis** (60 min, era C04-09): Justificar estratégia e comparar alternativas. Prática: Resolva 2 problemas e entregue testes, complexidade e trade-offs. [Material](https://developer.mozilla.org/en-US/docs/Web/JavaScript). Leitura: Entendendo Algoritmos; Cracking the Coding Interview.

### 05 — Ambiente profissional, Linux, Git, redes e HTTP

**Meta:** Entender o caminho da requisição desde sistema operacional até servidor  
**Saída:** Diagnosticar conexão HTTP e publicar repositório com histórico claro

- **C05-01 — Linux e shell** (30 min): Navegar em arquivos, processos, streams e permissões. Prática: Investigue logs, variáveis de ambiente e códigos de saída. [Material](https://linuxjourney.com/). Leitura: Começando com o Linux.
- **C05-02 — Processos, memória e sistema de arquivos** (30 min): Entender PID, sockets, processos filhos e sinais. Prática: Identifique processo que usa uma porta e encerre-o corretamente. [Material](https://linuxjourney.com/). Leitura: Começando com o Linux.
- **C05-03 — Terminal e scripts de automação** (30 min, era C05-04): Construir scripts defensivos e reproduzíveis. Prática: Automatize testes e validação de ambiente com tratamento de erro. [Material](https://www.gnu.org/software/bash/manual/bash.html). Leitura: Começando com o Linux.
- **C05-04 — Git em equipe: merge, conflitos e revisão** (30 min, era C05-03): Reverter, fazer merge, resolver conflito e revisar diffs. Prática: Crie branch, PR simulado, conflito e restauração sem apagar trabalho. [Material](https://git-scm.com/book/pt-br/v2). Leitura: Controlando Versões com Git e GitHub.
- **C05-05 — Modelos TCP/IP, DNS e roteamento** (30 min): Explicar resolução DNS, portas e tráfego. Prática: Rastreie requisição de domínio até IP e porta, com ferramentas locais. [Material](https://dnsimple.com/comics/how-dns-works/). Leitura: Desconstruindo a Web — as tecnologias por trás de uma requisição; Comunicação de Dados e Redes de Computadores.
- **C05-06 — HTTP, APIs REST e status codes** (30 min): Interpretar método, cabeçalho, corpo, cache e status. Prática: Use curl para diagnosticar um 401, 404 e 500. [Material](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Guides/Overview). Leitura: Desconstruindo a Web — as tecnologias por trás de uma requisição.
- **C05-07 — TLS, certificados e HTTPS** (30 min): Descrever handshake, validação e criptografia de transporte. Prática: Inspecione certificado e explique como o cliente confia no servidor. [Material](https://www.cloudflare.com/pt-br/learning/ssl/what-happens-in-a-tls-handshake/). Leitura: Desconstruindo a Web — as tecnologias por trás de uma requisição.
- **C05-08 — Cookies, sessões e CORS** (30 min): Explicar escopos e fluxos de sessão no navegador. Prática: Compare request autenticado e preflight no devtools. [Material](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Guides/CORS). Leitura: Desconstruindo a Web — as tecnologias por trás de uma requisição.
- **C05-09 — Logs e diagnóstico em CLI** (30 min): Correlacionar falhas entre cliente e servidor. Prática: Investigue uma falha simulada com curl e logs em dois serviços. [Material](https://linuxjourney.com/). Leitura: Guia prático do servidor Linux.
- **C05-10 — Desafio de saída 05 — diagnosticar uma API** (60 min): Localizar problema de rede/HTTP com evidências. Prática: Explique a sequência DNS→TLS→HTTP e reproduza/solucione uma falha. [Material](https://linuxjourney.com/). Leitura: Desconstruindo a Web — as tecnologias por trás de uma requisição.

### 06 — Dados, SQL e PostgreSQL

**Meta:** Ler, escrever e otimizar consultas sem comprometer consistência  
**Saída:** Explicar planos de consulta e garantir isolamento por usuário

- **C06-01 — Modelagem relacional** (45 min, era C07-01): Representar entidades, cardinalidade e regras de integridade. Prática: Desenhe ER de produtos, pedidos, clientes e pagamentos fictícios. [Material](https://www.postgresql.org/docs/current/tutorial.html). Leitura: Tutorial oficial do PostgreSQL.
- **C06-02 — Chaves, constraints e normalização** (45 min, era C07-03): Prevenir inconsistência e redundância de dados. Prática: Introduza PK, FK, CHECK, UNIQUE e justifique cada uma. [Material](https://www.postgresql.org/docs/current/ddl-constraints.html). Leitura: Tutorial oficial do PostgreSQL.
- **C06-03 — SQL: consultas e JOINs** (45 min, era C07-02): Compor joins, filtros e agregações sem depender de ORM. Prática: Escreva 10 queries para responder perguntas do negócio. [Material](https://www.postgresql.org/docs/current/tutorial-sql.html). Leitura: Tutorial oficial do PostgreSQL.
- **C06-04 — Transações e índices** (45 min, era C07-04): Compreender ACID, concorrência e desempenho. Prática: Simule atualização concorrente e examine plano de consulta. [Material](https://use-the-index-luke.com/). Leitura: Tutorial oficial do PostgreSQL; Use The Index, Luke!.
- **C06-05 — PostgreSQL e RLS** (45 min, era C07-05): Restringir leitura/escrita por proprietário autenticado. Prática: Crie políticas de isolamento e teste com dois usuários. [Material](https://www.postgresql.org/docs/current/ddl-rowsecurity.html).
- **C06-06 — Migrações, dados de teste e rollback** (45 min, era C07-06): Versionar alterações mantendo integridade. Prática: Crie migração reversível e teste em banco descartável. [Material](https://www.postgresql.org/docs/current/tutorial.html).
- **C06-07 — Segurança de consultas e dados** (45 min, era C07-08): Evitar SQL injection, segredo exposto e privilégio excessivo. Prática: Refatore SQL concatenado para consultas parametrizadas. [Material](https://cheatsheetseries.owasp.org/cheatsheets/Query_Parameterization_Cheat_Sheet.html).
- **C06-08 — NoSQL: quando usar documentos e chave-valor** (45 min, opcional, novo na 2.1): Comparar modelos relacional e de documentos, consistência e padrões de consulta. Prática: Modele o catálogo EZBikes como documentos e liste 3 consultas que ficariam mais difíceis do que no PostgreSQL. [Material](https://www.mongodb.com/pt-br/resources/basics/databases/nosql-explained). Leitura: NoSQL — como armazenar os dados de uma aplicação moderna; MongoDB — construa novas aplicações.
- **C06-09 — Desafio de saída 06 — PostgreSQL confiável** (60 min, era C07-09): Modelar e demonstrar acesso e consistência. Prática: Entregue schema, queries, testes de RLS e explicação de índices. [Material](https://www.postgresql.org/docs/current/tutorial.html). Leitura: Use The Index, Luke!.

### 07 — Backend Node.js e TypeScript

**Meta:** Construir e explicar APIs com autenticação, validação e tratamento de erros  
**Saída:** Entregar uma API com testes e revisar sem ajuda um endpoint desconhecido

- **C07-01 — TypeScript: tipos e interfaces** (45 min, era C06-01): Modelar contratos, unions, generics básicos e narrowing. Prática: Converta módulo JS para TS e elimine any injustificado. [Material](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html). Leitura: Guia prático de TypeScript.
- **C07-02 — Node.js: runtime e módulos** (45 min, era C06-02): Entender event loop, módulos e APIs nativas. Prática: Explique ciclo de execução de servidor Node e seus erros. [Material](https://nodejs.org/en/learn). Leitura: Construindo APIs REST com Node.js.
- **C07-03 — Servidor HTTP e roteamento** (45 min, era C06-03): Separar rotas, handlers e serviços. Prática: Crie rotas de catálogo com respostas HTTP corretas. [Material](https://nodejs.org/api/http.html). Leitura: Construindo APIs REST com Node.js.
- **C07-04 — Criar uma API com Node.js** (45 min, era C06-04): Integrar validação, services e erros HTTP. Prática: Implemente CRUD de bicicletas com casos de borda. [Material](https://nodejs.org/en/learn). Leitura: Construindo APIs REST com Node.js; REST — construa API's inteligentes de maneira simples.
- **C07-05 — Validação de entradas e contratos** (45 min, era C06-05): Distinguir confiança externa de dados internos. Prática: Adicione schema validation e testes de entradas malformadas. [Material](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html). Leitura: Construindo APIs REST com Node.js.
- **C07-06 — API + PostgreSQL: conexões, pools e transações** (45 min, era C07-07): Conectar a API ao banco e investigar gargalos e falhas de conexão. Prática: Simule conexões concorrentes e explique escolha do pool. [Material](https://node-postgres.com/features/pooling). Leitura: Construindo APIs REST com Node.js; Canivete suíço do desenvolvedor Node.
- **C07-07 — Autenticação e autorização no backend** (45 min, era C06-07): Diferenciar identidade, sessão e permissão. Prática: Projete roles e teste acesso a objetos de outros usuários. [Material](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html).
- **C07-08 — Assincronismo e concorrência no backend** (45 min, era C06-06): Gerenciar promise, limites de paralelismo e cancelamento. Prática: Processe lote com controle de concorrência e erros. [Material](https://nodejs.org/learn/asynchronous-work/dont-block-the-event-loop). Leitura: Canivete suíço do desenvolvedor Node; You Don't Know JS: Async & Performance.
- **C07-09 — Testes de integração para APIs** (45 min, era C06-08): Testar rotas, banco de teste e erros. Prática: Automatize fluxo criação→consulta→alteração→erro. [Material](https://nodejs.org/learn/test-runner/introduction). Leitura: REST — construa API's inteligentes de maneira simples.
- **C07-10 — SOLID e padrões de projeto essenciais** (45 min, novo na 2.1): Reconhecer responsabilidades, dependências e padrões como Strategy, Factory e Adapter. Prática: Encontre uma violação de SOLID na sua API e refatore com um padrão adequado, mantendo os testes verdes. [Material](https://refactoring.guru/pt-br/design-patterns). Leitura: Princípios de Design e Padrões de Projeto; Padrões de Projeto (GoF).
- **C07-11 — Arquitetura por camadas** (45 min, era C06-09): Diferenciar controller, service, repository e domain. Prática: Refatore um endpoint sem mudar contrato público. [Material](https://nodejs.org/en/learn). Leitura: Princípios de Design e Padrões de Projeto.
- **C07-12 — Desafio de saída 07 — API EZBikes** (60 min, era C06-10): Entregar catálogo/estoque autenticado com documentação. Prática: Demonstre rotas com testes, leitura de código e decisões justificadas. [Material](https://nodejs.org/en/learn). Leitura: REST — construa API's inteligentes de maneira simples.

### 08 — Frontend React e aplicação ponta a ponta

**Meta:** Ler componentes e conectar interface, API e persistência de dados  
**Saída:** Entregar tela integrada com tratamento de estados e testes

- **C08-01 — HTML semântico, CSS e DOM** (45 min, novo na 2.1): Estruturar páginas acessíveis, estilizar layouts e manipular o DOM com JavaScript. Prática: Monte a vitrine EZBikes em HTML/CSS puro e filtre os produtos manipulando o DOM, antes de usar React. [Material](https://developer.mozilla.org/pt-BR/docs/Learn_web_development). Leitura: HTML5 e CSS3 — domine a web do futuro; CSS Eficiente.
- **C08-02 — React: componentes e props** (45 min, era C08-01): Ler fluxo de props, composição e renderização. Prática: Explique árvore de componentes e altere prop recebida. [Material](https://react.dev/learn/your-first-component). Leitura: Progressive Web Apps com React.
- **C08-03 — Estado, eventos e formulários** (45 min, era C08-02): Prever renderização e atualizações de estado. Prática: Faça um formulário validado de cadastro de bicicleta. [Material](https://react.dev/learn/state-a-components-memory). Leitura: HTML5 e CSS3 — domine a web do futuro; Progressive Web Apps com React.
- **C08-04 — React: efeitos e comunicação** (45 min, era C08-03): Usar efeitos apenas quando necessários. Prática: Depure um efeito que produz renderização indevida. [Material](https://react.dev/learn/synchronizing-with-effects). Leitura: Progressive Web Apps com React.
- **C08-05 — Fetch, loading, erros e autenticação** (45 min, era C08-04): Tratar sucesso, latência e falhas de rede. Prática: Crie listagem com estados vazio, erro e carregando. [Material](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API/Using_Fetch). Leitura: Progressive Web Apps com React.
- **C08-06 — Acessibilidade, responsividade e UX** (45 min, era C08-05): Aplicar semântica, teclado e feedback de erros. Prática: Teste tela por teclado e ajuste leitura mobile. [Material](https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Accessibility). Leitura: Web Design Responsivo; Introdução e boas práticas em UX Design.
- **C08-07 — Next.js: rotas e renderização** (45 min, era C08-06): Entender roteamento e fronteira cliente/servidor. Prática: Explique ciclo de dados de uma página autenticada. [Material](https://nextjs.org/docs/app/getting-started).
- **C08-08 — Testes de interface e ponta a ponta** (45 min, era C08-07): Cobrir fluxo do usuário sem testes frágeis. Prática: Teste um fluxo de compra simulada e erros de formulário. [Material](https://playwright.dev/docs/intro).
- **C08-09 — Desafio de saída 08 — Full Stack EZBikes** (60 min, era C08-08): Integrar componentes, API e PostgreSQL. Prática: Demonstre CRUD, login, testes e explique fluxo de ponta a ponta. [Material](https://react.dev/learn). Leitura: Introdução e boas práticas em UX Design.

### 09 — Arquitetura, containers, cloud e Kubernetes

**Meta:** Justificar decisões e operar uma aplicação implantada  
**Saída:** Desenhar arquitetura escalável e explicar a recuperação de uma falha

- **C09-01 — Arquitetura de aplicações** (45 min): Comparar modularidade, acoplamento, coesão e trade-offs. Prática: Desenhe monólito modular e explique quando NÃO criar microsserviços. [Material](https://martinfowler.com/architecture/). Leitura: Arquitetura Limpa; Introdução à arquitetura e design de software.
- **C09-02 — Modelagem de domínio: DDD essencial** (45 min, opcional, novo na 2.1): Linguagem ubíqua, entidades, objetos de valor, agregados e contextos delimitados. Prática: Identifique contextos e agregados do EZBikes (catálogo, estoque, pedidos) e desenhe o mapa de contextos. [Material](https://martinfowler.com/bliki/DomainDrivenDesign.html). Leitura: Domain-Driven Design Rápido.
- **C09-03 — Design de APIs e contratos** (45 min, era C09-02): Versionar endpoints e mapear falhas. Prática: Revise contrato, status, idempotência e paginação. [Material](https://google.aip.dev/). Leitura: Arquitetura Limpa.
- **C09-04 — Docker e Compose** (45 min, era C09-03): Construir imagens reproduzíveis e minimizar superfície. Prática: Containerize API+DB com healthcheck e usuário não root. [Material](https://docs.docker.com/learn/). Leitura: Containers com Docker.
- **C09-05 — CI/CD e deploy com rollback** (45 min, era C09-04): Desenhar pipeline build, test e deploy confiável. Prática: Crie pipeline com testes e plano de rollback. [Material](https://docs.github.com/pt/actions). Leitura: Entrega Contínua; DevOps na Prática.
- **C09-06 — Arquitetura cloud e escalabilidade** (45 min, era C09-05): Entender redes cloud, balanceamento e autoscaling. Prática: Desenhe VPC, load balancer, serviços e banco gerenciado. [Material](https://aws.amazon.com/pt/architecture/well-architected/). Leitura: Amazon AWS — descomplicando a computação na nuvem.
- **C09-07 — Kubernetes: pods, Deployments e Services** (45 min, era C09-06): Identificar responsabilidades do plano de controle e workload. Prática: Suba em kind, altere réplicas e analise service discovery. [Material](https://kubernetes.io/pt-br/docs/tutorials/kubernetes-basics/). Leitura: Kubernetes — tudo sobre orquestração de contêineres.
- **C09-08 — Kubernetes: ConfigMap, Secret e HPA** (45 min, era C09-07): Explicar configuração, segredo e escalabilidade. Prática: Implante configuração e simule gatilho de escala em laboratório. [Material](https://kubernetes.io/docs/concepts/workloads/autoscaling/horizontal-pod-autoscale/). Leitura: Kubernetes — tudo sobre orquestração de contêineres.
- **C09-09 — Resiliência, filas e idempotência** (45 min, era C09-08): Planejar retry, timeout, backoff e dead-letter queue. Prática: Projete processamento de pedidos que suporte reentrega. [Material](https://builder.aws.com/content/3EumjoZascWd1oZiEgL8ORlv3qE/timeouts-retries-and-backoff-with-jitter). Leitura: DevOps na Prática.
- **C09-10 — Custo, disponibilidade e segurança cloud** (45 min, era C09-09): Justificar trade-offs de disponibilidade e custo. Prática: Compare duas arquiteturas e estimativa qualitativa de custos. [Material](https://aws.amazon.com/pt/architecture/well-architected/). Leitura: Amazon AWS — descomplicando a computação na nuvem.
- **C09-11 — Desafio de saída 09 — arquitetura implantada** (60 min, era C09-10): Operar stack e defender escolhas. Prática: Desenhe, implante e faça review técnico de falha e rollback. [Material](https://docs.docker.com/learn/). Leitura: Amazon AWS — descomplicando a computação na nuvem.

### 10 — Observabilidade, SRE e engenharia de dados

**Meta:** Diagnosticar um sistema e medir qualidade sem depender de opinião  
**Saída:** Instrumentar serviço, definir SLO e interpretar métricas/logs

- **C10-01 — Estatística para engenharia: médias, percentis e distribuições** (30 min, novo na 2.1): Diferenciar média, mediana, percentis e histogramas em métricas de latência. Prática: Calcule média, p50, p95 e p99 de uma lista de latências e explique por que a média esconde a cauda. [Material](https://sre.google/sre-book/monitoring-distributed-systems/). Leitura: Estatística — o que é, para que serve, como funciona.
- **C10-02 — Logs estruturados e correlação** (45 min, era C10-01): Interpretar logs JSON, trace_id e contexto. Prática: Instrumente endpoints e encontre um erro usando trace_id. [Material](https://opentelemetry.io/docs/concepts/signals/logs/). Leitura: Site Reliability Engineering (Google, online).
- **C10-03 — Métricas, Prometheus e PromQL** (45 min, era C10-02): Ler counters, gauges, histograms e consultas. Prática: Construa consultas para RPS, taxa de falha e p95. [Material](https://prometheus.io/docs/prometheus/latest/querying/basics/). Leitura: Site Reliability Engineering (Google, online).
- **C10-04 — Grafana e alertas** (45 min, era C10-03): Escolher painéis e alertas úteis. Prática: Crie dashboard de Golden Signals e teste alerta. [Material](https://grafana.com/docs/grafana/latest/fundamentals/getting-started/). Leitura: Site Reliability Engineering (Google, online); Como mentir com estatística.
- **C10-05 — Traces distribuídos com OpenTelemetry** (45 min, era C10-04): Investigar latência entre componentes. Prática: Registre trace da requisição API→banco e identifique gargalo. [Material](https://opentelemetry.io/docs/concepts/signals/traces/). Leitura: Site Reliability Engineering (Google, online).
- **C10-06 — SLIs, SLOs e error budget** (45 min, era C10-05): Diferenciar medições, metas e compromissos. Prática: Defina SLO 99,9% e calcule orçamento de erro com janela correta. [Material](https://sre.google/workbook/implementing-slos/). Leitura: Site Reliability Engineering (Google, online).
- **C10-07 — Testes de carga e análise de saturação** (45 min, era C10-06): Medir latência, erros e limites de recursos. Prática: Rode teste k6 em ambiente local e explique saturação. [Material](https://grafana.com/docs/k6/latest/).
- **C10-08 — Engenharia de dados: ETL, pipelines e camadas** (45 min, era C10-07): Compreender Bronze/Silver/Gold e idempotência. Prática: Modele pipeline de CNPJ com dados fictícios e checagens. [Material](https://app.notion.com/p/41f487f0bca281d29dd2c51c12e4e131). Leitura: Big Data — técnicas e tecnologias para extração de valor dos dados.
- **C10-09 — Qualidade de dados e observabilidade de pipelines** (45 min, era C10-08): Detectar atraso, falha e inconsistência. Prática: Adicione métricas de freshness, linhas inválidas e retries. [Material](https://app.notion.com/p/41f487f0bca281d29dd2c51c12e4e131). Leitura: Big Data — técnicas e tecnologias para extração de valor dos dados.
- **C10-10 — Desafio de saída 10 — ObservaLab** (60 min, era C10-09): Instrumentar e explicar um incidente. Prática: Demonstre dashboards, SLO, causa raiz e correção medida. [Material](https://app.notion.com/p/41f487f0bca281d29dd2c51c12e4e131). Leitura: Como mentir com estatística.

### 11 — Fundamentos de segurança e raciocínio ofensivo/defensivo

**Meta:** Descrever superfícies de ataque, identidades, riscos e mitigações  
**Saída:** Criar modelo de ameaças verificável de uma aplicação

- **C11-01 — Ética, autorização e escopo de testes** (45 min): Definir alvos autorizados e limites do laboratório. Prática: Documente escopo para app própria e critério de encerramento. [Material](https://www.nist.gov/cyberframework).
- **C11-02 — Confidencialidade, integridade e disponibilidade** (45 min): Relacionar objetivos de segurança aos riscos de negócio. Prática: Classifique 8 cenários pelo objetivo afetado. [Material](https://www.nist.gov/cyberframework).
- **C11-03 — Fundamentos de criptografia e hashing** (45 min): Diferenciar cifra, hash, assinatura, salt e KDF. Prática: Explique proteção de senha e segredo em repouso e trânsito. [Material](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html). Leitura: Comunicação de Dados e Redes de Computadores.
- **C11-04 — Identidade, autenticação, MFA e sessões** (45 min): Avaliar autenticação e risco de roubo de sessão. Prática: Desenhe login, renovação e logout e suas ameaças. [Material](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html).
- **C11-05 — Redes e defesa: segmentação, firewalls e logs** (45 min): Interpretar controles de rede e exposição. Prática: Desenhe zonas de confiança e identifique caminhos indevidos. [Material](https://www.nist.gov/cyberframework). Leitura: Comunicação de Dados e Redes de Computadores.
- **C11-06 — Ameaças, STRIDE e análise de risco** (45 min): Classificar ameaças e associar controles. Prática: Faça STRIDE sobre fluxo login→API→Postgres. [Material](https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html). Leitura: OWASP Threat Modeling Cheat Sheet.
- **C11-07 — Vulnerabilidades, CVSS e EPSS** (45 min): Distinguir severidade de probabilidade de exploração. Prática: Priorize correções em 5 achados hipotéticos com justificativa. [Material](https://www.first.org/epss/). Leitura: OWASP Top 10:2025.
- **C11-08 — OWASP Top 10:2025 — visão geral** (45 min): Identificar categorias e falhas fundamentais. Prática: Mapeie 10 categorias para medidas preventivas no EZBikes. [Material](https://top10.owasp.org/2025/). Leitura: OWASP Top 10:2025.
- **C11-09 — Desafio de saída 11 — threat model** (60 min): Justificar 5 riscos, mitigação e teste. Prática: Entregue DFD, STRIDE, classificação e backlog de remediações. [Material](https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html). Leitura: OWASP Threat Modeling Cheat Sheet.

### 12 — AppSec e segurança de aplicações web

**Meta:** Reconhecer vulnerabilidades, prevenir e validar correções em laboratório  
**Saída:** Completar laboratórios autorizados e produzir testes de regressão

- **C12-01 — PortSwigger Academy — primeiros labs** (45 min, era C14-01): Executar labs guiados de HTTP, autenticação e controle de acesso antes das vulnerabilidades específicas. Prática: Complete labs Apprentice em ambiente autorizado com notas. [Material](https://portswigger.net/web-security/learning-paths). Leitura: Web Security Academy.
- **C12-02 — Burp Suite: proxy e repeater em laboratório** (45 min, era C12-11): Interpretar requisições HTTP, cookies e respostas. Prática: Interceptar apenas a app local/labs autorizados e documentar achados. [Material](https://portswigger.net/burp/documentation/desktop/getting-started).
- **C12-03 — Broken Access Control e IDOR** (45 min, era C12-01): Distinguir autenticação de autorização por recurso. Prática: Resolva laboratório autorizado e escreva teste de acesso cruzado. [Material](https://portswigger.net/web-security/access-control). Leitura: Web Security Academy.
- **C12-04 — SQL injection e consultas seguras** (45 min, era C12-02): Identificar entrada não confiável em consultas. Prática: Reproduza em laboratório e corrija com parametrização. [Material](https://portswigger.net/web-security/sql-injection). Leitura: Web Security Academy; OWASP Cheat Sheet Series.
- **C12-05 — XSS e contextos de saída** (45 min, era C12-03): Explicar escape contextual e CSP. Prática: Resolva laboratório de XSS e aplique encoding adequado. [Material](https://portswigger.net/web-security/cross-site-scripting). Leitura: Web Security Academy; OWASP Cheat Sheet Series.
- **C12-06 — CSRF, cookies e SameSite** (45 min, era C12-04): Distinguir pedido autenticado de intenção do usuário. Prática: Avalie proteção CSRF em app local e teste regressão. [Material](https://portswigger.net/web-security/csrf). Leitura: Web Security Academy; OWASP Cheat Sheet Series.
- **C12-07 — SSRF e destinos de rede** (45 min, era C12-05): Analisar acesso servidor→URL em laboratório. Prática: Implemente allowlist de destinos e teste bloqueios. [Material](https://portswigger.net/web-security/ssrf). Leitura: Web Security Academy.
- **C12-08 — Path traversal e upload seguro** (45 min, era C12-06): Validar caminhos e uploads sem confiar no cliente. Prática: Proteja rota de download e arquivo em ambiente controlado. [Material](https://portswigger.net/web-security/file-path-traversal).
- **C12-09 — Authentication flaws e gestão de sessão** (45 min, era C12-07): Identificar falhas de login, reset e rotação. Prática: Teste fluxos inválidos e implemente limite de tentativas. [Material](https://portswigger.net/web-security/authentication). Leitura: OWASP Web Security Testing Guide.
- **C12-10 — Validação, serialização e injeção de comando** (45 min, era C12-08): Mapear dados externos até operações perigosas. Prática: Refatore execução de comando insegura para API segura. [Material](https://portswigger.net/web-security/os-command-injection).
- **C12-11 — API Security e rate limiting** (45 min, era C12-09): Analisar BOLA, função, recursos e schemas. Prática: Revise endpoints com testes negativos e proteção de abuso. [Material](https://portswigger.net/web-security/api-testing). Leitura: OWASP Web Security Testing Guide.
- **C12-12 — OWASP ASVS e code review seguro** (45 min, era C12-10): Traduzir requisitos em testes verificáveis. Prática: Faça checklist de segurança de 2 endpoints e registre evidências. [Material](https://asvs.owasp.org/). Leitura: OWASP Web Security Testing Guide.
- **C12-13 — Desafio de saída 12 — revisão segura de API** (60 min, era C12-12): Encontrar e corrigir problemas com testes. Prática: Escreva relatório curto de vulnerabilidade, correção e teste preventivo. [Material](https://portswigger.net/web-security/learning-paths). Leitura: OWASP Cheat Sheet Series.

### 13 — DevSecOps, IAM, cloud security, detecção e resposta

**Meta:** Integrar segurança ao ciclo de entrega, à infraestrutura e à operação  
**Saída:** Demonstrar pipeline seguro, cloud com menor privilégio e um playbook de incidente testado

- **C13-01 — SSDLC, shift-left e security champions** (45 min): Integrar controles ao planejamento e review. Prática: Desenhe critérios de segurança por fase do pipeline. [Material](https://owasp.org/projects/samm). Leitura: Caixa de Ferramentas DevOps.
- **C13-02 — SAST, DAST, SCA e SBOM** (45 min): Distinguir análise de código, app e dependências. Prática: Configure scanners em app de laboratório e revise falsos positivos. [Material](https://community.owasp.org/Source_Code_Analysis_Tools). Leitura: Caixa de Ferramentas DevOps.
- **C13-03 — Software supply chain e dependências** (45 min): Identificar typosquatting, dependency confusion e versões. Prática: Revise lockfile e gere inventário de dependências. [Material](https://slsa.dev/).
- **C13-04 — Secrets management e rotação** (45 min): Evitar segredos em repositório, logs e CI. Prática: Substitua token hardcoded por variável/secret seguro. [Material](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html). Leitura: OWASP Cheat Sheet Series.
- **C13-05 — GitHub Actions e pipeline seguro** (45 min): Aplicar mínimo privilégio e approvals. Prática: Crie pipeline de testes, SCA, SAST e artifacts com permissões mínimas. [Material](https://docs.github.com/en/actions/reference/security/secure-use). Leitura: Caixa de Ferramentas DevOps.
- **C13-06 — IAM, OAuth2/OIDC e LGPD** (45 min): Relacionar identidade, escopos e proteção de dados. Prática: Revise desenho de login, roles, consentimento e retenção. [Material](https://oauth.net/2/). Leitura: OAuth 2.0 — proteja suas aplicações com Spring Security.
- **C13-07 — Hardening Linux, Docker e Kubernetes** (45 min): Reduzir privilégios, recursos expostos e capabilities. Prática: Aplique usuário não root, read-only rootfs e NetworkPolicy em lab. [Material](https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html). Leitura: OWASP Cheat Sheet Series.
- **C13-08 — Cloud Security: IAM, redes e auditoria** (45 min): Inspecionar políticas e separação de responsabilidades. Prática: Proponha política IAM mínima e log de auditoria. [Material](https://cheatsheetseries.owasp.org/). Leitura: AWS Certified Security Specialty — guia de estudo.
- **C13-09 — Análise de logs e detecção** (45 min, era C14-06): Distinguir eventos normais de indicadores de incidente. Prática: Correlacione eventos suspeitos gerados em laboratório. [Material](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html). Leitura: OWASP Cheat Sheet Series.
- **C13-10 — Resposta a incidentes e resiliência** (45 min, era C13-09): Criar playbook, detecção, contenção e recuperação. Prática: Execute tabletop de vazamento fictício e registre decisões. [Material](https://csrc.nist.gov/pubs/sp/800/61/r3/final). Leitura: AWS Certified Security Specialty — guia de estudo.
- **C13-11 — Desafio de saída 13 — pipeline seguro** (60 min, era C13-10): Garantir gates automáticos e mitigação rastreável. Prática: Demonstre PR bloqueada por falha e corrigida com evidências. [Material](https://cheatsheetseries.owasp.org/).

### 14 — Avaliação de segurança autorizada e segurança de IA

**Meta:** Consolidar fundamentos de AppSec e compreender testes em ambiente autorizado  
**Saída:** Produzir relatório técnico e capstone seguro, sem atacar sistemas externos

- **C14-01 — Metodologia de avaliação e escopo** (45 min, era C14-02): Separar descoberta, validação e comunicação responsável. Prática: Escreva autorização, escopo e critérios antes do teste. [Material](https://owasp.org/projects/web-security-testing-guide). Leitura: OWASP Web Security Testing Guide.
- **C14-02 — Reconhecimento passivo e mapeamento em laboratório** (45 min, era C14-03): Identificar pontos de entrada de uma app própria. Prática: Mapeie rotas e dependências da EZBikes local. [Material](https://owasp.org/projects/web-security-testing-guide). Leitura: OWASP Web Security Testing Guide.
- **C14-03 — Testes de autorização e lógica de negócio** (45 min, era C14-04): Explorar somente laboratório próprio ou intencional. Prática: Investigue controles por usuário e proponha testes de regressão. [Material](https://portswigger.net/web-security/logic-flaws).
- **C14-04 — Mitigação, reteste e relatório técnico** (45 min, era C14-05): Traduzir falhas em risco e ações de correção. Prática: Gere achados com impacto, evidência, fix e reteste. [Material](https://owasp.org/projects/web-security-testing-guide). Leitura: OWASP Web Security Testing Guide.
- **C14-05 — Segurança de APIs de IA e prompt injection** (45 min, era C14-07): Reconhecer entrada não confiável e fronteiras de confiança. Prática: Modele prompt injection em app RAG de testes sem dados reais. [Material](https://genai.owasp.org/llm-top-10/). Leitura: OWASP Top 10 para aplicações com LLM.
- **C14-06 — RAG seguro e proteção de dados** (45 min, era C14-08): Entender permissões no retrieval, PII e exfiltração. Prática: Implemente filtro de acesso por documento e teste bypass. [Material](https://genai.owasp.org/llm-top-10/). Leitura: OWASP Top 10 para aplicações com LLM.
- **C14-07 — Projeto final — EZBikes Secure (várias sessões)** (60 min, era C14-09): Unir JS, API, banco, infraestrutura, observabilidade e segurança. Prática: Entregue solução com PR, dashboard, threat model e testes autorizados. [Material](https://portswigger.net/web-security/learning-paths). Leitura: The Clean Coder.
- **C14-08 — Desafio de saída 14 — revisão arquitetural** (60 min, era C14-10): Ler, explicar e defender decisões em solução desconhecida. Prática: Explique 90% dos critérios de leitura em amostra definida e corrija um bug sem IA. [Material](https://portswigger.net/web-security/learning-paths). Leitura: The Clean Coder.

## Livros da semana

Cada linha é uma semana de leitura (cerca de 20 min/dia, 5 dias), ligada aos conteúdos da etapa. **Principal** sustenta a etapa; **Apoio** amplia; **Consulta** é para tirar dúvidas, não para ler inteiro. Os PDFs estão na [BibliotecaDev](https://github.com/EnzoOliveiradev/BibliotecaDev) e abrem no leitor do DevPath; itens marcados como complemento são gratuitos e cobrem lacunas da biblioteca.

A série [You Don't Know JS (tradução PT-BR)](https://github.com/nao-sabemos-js/You-Dont-Know-JS) (CC BY-NC-ND 3.0) é lida no GitHub, capítulo a capítulo. Pelos termos da tradução, o conteúdo não pode ser disponibilizado fora de lá, então o DevPath só aponta para os capítulos.

### 01 — Raciocínio computacional e leitura de código

| Semana | Livro | Papel | Foco | Conteúdos |
|---|---|---|---|---|
| L01-1 | [But How Do It Know?](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/But%20How%20Do%20It%20Know%20-%20The%20Basic%20Principles%20of%20Computers%20for%20Everyone%20-%20Author%20(J.%20Clark%20Scott).pdf) (inglês) — J. Clark Scott | Principal | Como o computador guarda valores e executa instruções passo a passo. Leia até entender memória e o ciclo buscar–executar e relacione com a tabela de execução. | C01-01, C01-05, C01-04 |
| L01-4 | [You Don't Know JS: Iniciando](https://github.com/nao-sabemos-js/You-Dont-Know-JS/blob/portuguese-translation/up%20%26%20going/README.md) (PT-BR, GitHub) — Kyle Simpson (tradução da comunidade) | Principal | Capítulo 1: código, expressões, operadores, valores e tipos, variáveis, blocos, condicionais, laços e funções — os assuntos desta etapa. Faça a prática do fim do capítulo sem IA. Capítulos: [Capítulo 1](https://github.com/nao-sabemos-js/You-Dont-Know-JS/blob/portuguese-translation/up%20%26%20going/ch1.md). | C01-03, C01-04, C01-06, C01-07, C01-08 |
| L01-2 | [Learning 3.0 — como os profissionais criativos aprendem](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Learning%203.0%20-%20Como%20os%20profissionais%20criativos%20aprendem%20-%20Autor%20(Casa%20do%20C%C3%B3digo).pdf) — Casa do Código | Apoio | Prática deliberada, feedback e aprendizado contínuo. Compare com o método PRIMM e com a revisão espaçada do DevPath. | C01-02, C01-03 |
| L01-3 | [Como ser um Programador Melhor](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Como%20ser%20um%20Programador%20Melhor%20-%20um%20Manual%20Para%20Programadores%20que%20se%20Importam%20com%20C%C3%B3digo%20-%20Autor%20(Pete%20Goodliffe).pdf) — Pete Goodliffe | Principal | Trechos sobre ler código de outras pessoas, estilo e cuidado com o código. Anote 3 hábitos para aplicar nas leituras desta etapa. | C01-09, C01-10, C01-11 |

### 02 — JavaScript essencial

| Semana | Livro | Papel | Foco | Conteúdos |
|---|---|---|---|---|
| L02-6 | [You Don't Know JS: Iniciando](https://github.com/nao-sabemos-js/You-Dont-Know-JS/blob/portuguese-translation/up%20%26%20going/README.md) (PT-BR, GitHub) — Kyle Simpson (tradução da comunidade) | Principal | Capítulo 2: visão geral do JavaScript — valores e tipos, comparações, variáveis, modo estrito, funções como valores e uma primeira olhada em closures e this. Capítulos: [Capítulo 2](https://github.com/nao-sabemos-js/You-Dont-Know-JS/blob/portuguese-translation/up%20%26%20going/ch2.md). | C02-01, C02-03 |
| L02-7 | [You Don't Know JS: Tipos & Gramática](https://github.com/nao-sabemos-js/You-Dont-Know-JS/blob/portuguese-translation/types%20%26%20grammar/README.md) (PT-BR, GitHub) — Kyle Simpson (tradução da comunidade) | Principal | Capítulos 1 e 2: os tipos nativos e como strings, números, arrays e valores especiais (NaN, -0, undefined) se comportam. Capítulos: [Capítulo 1](https://github.com/nao-sabemos-js/You-Dont-Know-JS/blob/portuguese-translation/types%20%26%20grammar/ch1.md), [Capítulo 2](https://github.com/nao-sabemos-js/You-Dont-Know-JS/blob/portuguese-translation/types%20%26%20grammar/ch2.md). | C02-01, C02-02, C02-06 |
| L02-8 | [You Don't Know JS: Tipos & Gramática](https://github.com/nao-sabemos-js/You-Dont-Know-JS/blob/portuguese-translation/types%20%26%20grammar/README.md) (PT-BR, GitHub) — Kyle Simpson (tradução da comunidade) | Principal | Capítulos 3 e 4: objetos nativos e coerção — por que == e + surpreendem, e como prever o resultado antes de executar. Capítulos: [Capítulo 3](https://github.com/nao-sabemos-js/You-Dont-Know-JS/blob/portuguese-translation/types%20%26%20grammar/ch3.md), [Capítulo 4](https://github.com/nao-sabemos-js/You-Dont-Know-JS/blob/portuguese-translation/types%20%26%20grammar/ch4.md). | C02-01, C02-02, C02-08 |
| L02-1 | [Eloquent JavaScript (4ª ed., online)](https://eloquentjavascript.net/) (complemento gratuito) — Marijn Haverbeke | Consulta | Prática extra em inglês: use os exercícios do fim dos capítulos de funções e estruturas de dados quando quiser mais treino. | C02-01, C02-02, C02-03, C02-05, C02-06 |
| L02-2 | [Código Limpo](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/C%C3%B3digo%20limpo%20-%20Habilidades%20pr%C3%A1ticas%20do%20Agile%20Software%20-%20Autor%20(Robert%20C.%20Martin).pdf) — Robert C. Martin | Principal | Nomes significativos e funções pequenas. Reescreva 2 funções do mini projeto aplicando o que leu. | C02-03, C02-04, C02-11 |
| L02-9 | [You Don't Know JS: ES6 & Além](https://github.com/nao-sabemos-js/You-Dont-Know-JS/blob/portuguese-translation/es6%20%26%20beyond/README.md) (PT-BR, GitHub) — Kyle Simpson (tradução da comunidade) | Apoio | Capítulos 2 e 5: sintaxe moderna (destructuring, spread, parâmetros padrão, arrow functions, template strings) e coleções (Map, Set). Capítulos: [Capítulo 2](https://github.com/nao-sabemos-js/You-Dont-Know-JS/blob/portuguese-translation/es6%20%26%20beyond/ch2.md), [Capítulo 5](https://github.com/nao-sabemos-js/You-Dont-Know-JS/blob/portuguese-translation/es6%20%26%20beyond/ch5.md). | C02-03, C02-05, C02-06 |
| L02-3 | [Expressões Regulares — uma abordagem divertida](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Express%C3%B5es%20Regulares%20-%20uma%20abordagem%20divertida%20-%20Autor%20(Aurelio%20Marinho).pdf) — Aurelio Marinho Jargas | Apoio | Metacaracteres, classes e quantificadores. Use com strings para validar CEP, telefone e e-mail simples. | C02-02 |
| L02-4 | [Testes Automatizados de Software — um guia prático](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Testes%20Automatizados%20de%20Software%20-%20Um%20Guia%20Pr%C3%A1tico%20-%20Autor%20(Casa%20do%20C%C3%B3digo).pdf) — Casa do Código | Principal | Por que testar, testes de unidade e organização dos casos. Escreva os testes do estoque EZBikes antes de terminar a implementação. | C02-09, C02-11 |
| L02-5 | [Controlando Versões com Git e GitHub](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Controlando%20Vers%C3%B5es%20com%20Git%20e%20GitHub%20-%20Autor%20(Casa%20do%20C%C3%B3digo).pdf) — Casa do Código | Principal | Commits, histórico, branches e envio ao GitHub. Versione o mini projeto com commits pequenos e mensagens claras. | C02-10, C02-11, C02-12 |

### 03 — JavaScript intermediário e debugging

| Semana | Livro | Papel | Foco | Conteúdos |
|---|---|---|---|---|
| L03-1 | [You Don't Know JS: Escopos & Closures](https://github.com/nao-sabemos-js/You-Dont-Know-JS/blob/portuguese-translation/scope%20%26%20closures/README.md) (PT-BR, GitHub) — Kyle Simpson (tradução da comunidade) | Principal | Capítulos 1 a 5: o que é escopo, escopo léxico, função vs. bloco, hoisting e closures — por que funções "lembram" variáveis. Capítulos: [Capítulo 1](https://github.com/nao-sabemos-js/You-Dont-Know-JS/blob/portuguese-translation/scope%20%26%20closures/ch1.md), [Capítulo 2](https://github.com/nao-sabemos-js/You-Dont-Know-JS/blob/portuguese-translation/scope%20%26%20closures/ch2.md), [Capítulo 3](https://github.com/nao-sabemos-js/You-Dont-Know-JS/blob/portuguese-translation/scope%20%26%20closures/ch3.md), [Capítulo 4](https://github.com/nao-sabemos-js/You-Dont-Know-JS/blob/portuguese-translation/scope%20%26%20closures/ch4.md), [Capítulo 5](https://github.com/nao-sabemos-js/You-Dont-Know-JS/blob/portuguese-translation/scope%20%26%20closures/ch5.md). | C03-02, C03-03, C03-06 |
| L03-5 | [You Don't Know JS: this & Prototipagem de Objetos](https://github.com/nao-sabemos-js/You-Dont-Know-JS/blob/portuguese-translation/this%20%26%20object%20prototypes/README.md) (PT-BR, GitHub) — Kyle Simpson (tradução da comunidade) | Principal | Capítulos 1 e 2: as quatro regras que definem o this e como identificar o call-site. Capítulos: [Capítulo 1](https://github.com/nao-sabemos-js/You-Dont-Know-JS/blob/portuguese-translation/this%20%26%20object%20prototypes/ch1.md), [Capítulo 2](https://github.com/nao-sabemos-js/You-Dont-Know-JS/blob/portuguese-translation/this%20%26%20object%20prototypes/ch2.md). | C03-03 |
| L03-6 | [You Don't Know JS: this & Prototipagem de Objetos](https://github.com/nao-sabemos-js/You-Dont-Know-JS/blob/portuguese-translation/this%20%26%20object%20prototypes/README.md) (PT-BR, GitHub) — Kyle Simpson (tradução da comunidade) | Principal | Capítulos 3 a 6 e Apêndice A: objetos, a ilusão das "classes", a cadeia de protótipos, delegação e o que class do ES6 realmente faz. Capítulos: [Capítulo 3](https://github.com/nao-sabemos-js/You-Dont-Know-JS/blob/portuguese-translation/this%20%26%20object%20prototypes/ch3.md), [Capítulo 4](https://github.com/nao-sabemos-js/You-Dont-Know-JS/blob/portuguese-translation/this%20%26%20object%20prototypes/ch4.md), [Capítulo 5](https://github.com/nao-sabemos-js/You-Dont-Know-JS/blob/portuguese-translation/this%20%26%20object%20prototypes/ch5.md), [Capítulo 6](https://github.com/nao-sabemos-js/You-Dont-Know-JS/blob/portuguese-translation/this%20%26%20object%20prototypes/ch6.md), [Apêndice A](https://github.com/nao-sabemos-js/You-Dont-Know-JS/blob/portuguese-translation/this%20%26%20object%20prototypes/apA.md). | C03-04 |
| L03-7 | [You Don't Know JS: Async & Performance](https://github.com/nao-sabemos-js/You-Dont-Know-JS/blob/portuguese-translation/async%20%26%20performance/README.md) (PT-BR, GitHub) — Kyle Simpson (tradução da comunidade) | Principal | Capítulos 1 a 3: o event loop, os problemas dos callbacks e como Promises resolvem inversão de controle. Capítulos: [Capítulo 1](https://github.com/nao-sabemos-js/You-Dont-Know-JS/blob/portuguese-translation/async%20%26%20performance/ch1.md), [Capítulo 2](https://github.com/nao-sabemos-js/You-Dont-Know-JS/blob/portuguese-translation/async%20%26%20performance/ch2.md), [Capítulo 3](https://github.com/nao-sabemos-js/You-Dont-Know-JS/blob/portuguese-translation/async%20%26%20performance/ch3.md). | C03-07, C03-08 |
| L03-2 | [Eloquent JavaScript (4ª ed., online)](https://eloquentjavascript.net/) (complemento gratuito) — Marijn Haverbeke | Consulta | Prática extra em inglês: capítulos sobre objetos e classes, bugs e erros e programação assíncrona. | C03-04, C03-06, C03-07, C03-08 |
| L03-3 | [O Programador Pragmático](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/O%20Programador%20Pragm%C3%A1tico%20-%20Autor%20(Andrew%20Hunt%20e%20David%20Thomas).pdf) — Andrew Hunt e David Thomas | Principal | Trechos sobre depuração, "programar por coincidência" e programação defensiva com asserções. | C03-01, C03-05, C03-10 |
| L03-4 | [Trabalho Eficaz com Código Legado](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Trabalho%20Eficaz%20com%20C%C3%B3digo%20Legado%20-%20Autor%20(Michael%20C.%20Feathers).pdf) — Michael C. Feathers | Principal | O que torna um código legado, pontos de alteração e testes de caracterização antes de mudar. | C03-09, C03-11 |
| L03-8 | [You Don't Know JS: ES6 & Além](https://github.com/nao-sabemos-js/You-Dont-Know-JS/blob/portuguese-translation/es6%20%26%20beyond/README.md) (PT-BR, GitHub) — Kyle Simpson (tradução da comunidade) | Apoio | Capítulo 3: organização de código com módulos ES6, classes e iteradores. Capítulos: [Capítulo 3](https://github.com/nao-sabemos-js/You-Dont-Know-JS/blob/portuguese-translation/es6%20%26%20beyond/ch3.md). | C03-04, C03-06 |

### 04 — Estruturas de dados, algoritmos e qualidade

| Semana | Livro | Papel | Foco | Conteúdos |
|---|---|---|---|---|
| L04-1 | [Entendendo Algoritmos](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Entendendo%20Algoritmos%20-%20Um%20Guia%20Ilustrado%20Para%20Programadores%20e%20Outros%20Curiosos%20-%20Autor%20(Aditya%20Y.%20Bhargava).pdf) — Aditya Y. Bhargava | Principal | Pesquisa binária, notação Big O e ordenação por seleção. Reimplemente os exemplos em JavaScript (o livro usa Python). | C04-01, C04-02, C04-03 |
| L04-2 | [Entendendo Algoritmos](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Entendendo%20Algoritmos%20-%20Um%20Guia%20Ilustrado%20Para%20Programadores%20e%20Outros%20Curiosos%20-%20Autor%20(Aditya%20Y.%20Bhargava).pdf) — Aditya Y. Bhargava | Principal | Recursão, quicksort e tabelas hash. | C04-04, C04-05 |
| L04-3 | [Entendendo Algoritmos](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Entendendo%20Algoritmos%20-%20Um%20Guia%20Ilustrado%20Para%20Programadores%20e%20Outros%20Curiosos%20-%20Autor%20(Aditya%20Y.%20Bhargava).pdf) — Aditya Y. Bhargava | Principal | Grafos e pesquisa em largura; Dijkstra como leitura opcional. | C04-06, C04-08 |
| L04-4 | [Refatoração](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Refatora%C3%A7%C3%A3o%20-%20Aperfei%C3%A7oando%20o%20Design%20de%20C%C3%B3digos%20Existentes%20-%20Autor%20(Martin%20Fowler).pdf) — Martin Fowler | Principal | O exemplo inicial completo e o catálogo de "maus cheiros". Refatore um código seu mantendo os testes verdes a cada passo. | C04-07 |
| L04-5 | [Cracking the Coding Interview](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Cracking%20the%20Coding%20Interview%20-%20189%20Programming%20Questions%20and%20Solutions%20-%20Author%20(Gayle%20Laakmann%20McDowell).pdf) (inglês) — Gayle Laakmann McDowell | Apoio | Seções de Big O e estruturas de dados. Resolva 1 problema por dia sem IA, explicando a complexidade. | C04-08 |
| L04-6 | [Algoritmos — Teoria e Prática](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Algoritmos%20-%20Teoria%20e%20Pr%C3%A1tica%20-%20Autor%20(Thomas%20Cormen).pdf) — Thomas Cormen et al. | Consulta | Referência aprofundada: consulte quando quiser a análise formal de um algoritmo. Não é para ler inteiro. | C04-01, C04-06 |

### 05 — Ambiente profissional, Linux, Git, redes e HTTP

| Semana | Livro | Papel | Foco | Conteúdos |
|---|---|---|---|---|
| L05-1 | [Começando com o Linux](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Come%C3%A7ando%20com%20o%20Linux%20-%20Comandos,%20servi%C3%A7os%20e%20administra%C3%A7%C3%A3o%20-%20Autor%20(Casa%20do%20C%C3%B3digo).pdf) — Casa do Código | Principal | Navegação, permissões, processos e redirecionamento de entrada e saída. | C05-01, C05-02, C05-03 |
| L05-2 | [Controlando Versões com Git e GitHub](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Controlando%20Vers%C3%B5es%20com%20Git%20e%20GitHub%20-%20Autor%20(Casa%20do%20C%C3%B3digo).pdf) — Casa do Código | Principal | Segunda passada: merge, rebase, conflitos e recuperação de alterações. | C05-04 |
| L05-3 | [Desconstruindo a Web — as tecnologias por trás de uma requisição](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Desconstruindo%20a%20Web%20-%20As%20Tecnologias%20por%20Tr%C3%A1s%20de%20uma%20Requisi%C3%A7%C3%A3o%20-%20Autor%20(Casa%20do%20C%C3%B3digo).pdf) — Casa do Código | Principal | O caminho de uma requisição: DNS, TCP, HTTP e TLS. Reproduza cada etapa com curl -v. | C05-05, C05-06, C05-07, C05-08, C05-10 |
| L05-4 | [Guia prático do servidor Linux](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Guia%20pr%C3%A1tico%20do%20servidor%20Linux%20-%20Administra%C3%A7%C3%A3o%20Linux%20para%20iniciantes%20-%20Autor%20(Casa%20do%20C%C3%B3digo).pdf) — Casa do Código | Apoio | Serviços, logs do sistema e diagnóstico em servidores. | C05-09 |
| L05-5 | [Comunicação de Dados e Redes de Computadores](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Comunica%C3%A7%C3%A3o%20de%20Dados%20e%20Redes%20de%20Computadores%20-%20Autor%20(Behrouz%20A.%20Forouzan).pdf) — Behrouz A. Forouzan | Consulta | Referência do modelo TCP/IP e das camadas de rede para tirar dúvidas pontuais. | C05-05 |

### 06 — Dados, SQL e PostgreSQL

| Semana | Livro | Papel | Foco | Conteúdos |
|---|---|---|---|---|
| L06-1 | [Tutorial oficial do PostgreSQL](https://www.postgresql.org/docs/current/tutorial.html) (complemento gratuito) — PostgreSQL Global Development Group | Principal | Tutorial e linguagem SQL: tabelas, consultas, joins, agregações e transações. | C06-01, C06-02, C06-03, C06-04 |
| L06-2 | [Use The Index, Luke!](https://use-the-index-luke.com/) (complemento gratuito) — Markus Winand | Principal | Como índices B-tree funcionam e como ler planos de execução. | C06-04, C06-09 |
| L06-3 | [NoSQL — como armazenar os dados de uma aplicação moderna](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/NoSQL%20-%20Como%20armazenar%20os%20dados%20de%20uma%20aplica%C3%A7%C3%A3o%20moderna%20-%20Autor%20(Casa%20do%20C%C3%B3digo).pdf) — Casa do Código | Apoio | Quando um banco de documentos ou chave-valor faz sentido e o que se perde em relação ao relacional. | C06-08 |
| L06-4 | [MongoDB — construa novas aplicações](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/MongoDB%20-%20Construa%20Novas%20Aplica%C3%A7%C3%B5es%20com%20Novas%20Tecnologias%20-%20Autor%20(Casa%20do%20C%C3%B3digo).pdf) — Casa do Código | Consulta | Leitura opcional para ver um banco de documentos na prática. | C06-08 |

### 07 — Backend Node.js e TypeScript

| Semana | Livro | Papel | Foco | Conteúdos |
|---|---|---|---|---|
| L07-1 | [Guia prático de TypeScript](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Guia%20pr%C3%A1tico%20de%20TypeScript%20-%20Melhore%20suas%20aplica%C3%A7%C3%B5es%20JavaScript%20-%20Autor%20(Casa%20do%20C%C3%B3digo).pdf) — Casa do Código | Principal | Tipos, interfaces, generics e narrowing. Converta um módulo do mini projeto para TypeScript. | C07-01 |
| L07-2 | [Construindo APIs REST com Node.js](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Construindo%20API%20REST%20com%20Node%20JS%20-%20Autor%20(Casa%20do%20C%C3%B3digo).pdf) — Casa do Código | Principal | Rotas, middlewares, validação e acesso ao banco. Compare com a sua API EZBikes. | C07-02, C07-03, C07-04, C07-05, C07-06 |
| L07-3 | [REST — construa API's inteligentes de maneira simples](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/REST%20-%20Construa%20API's%20inteligentes%20de%20maneira%20simples%20-%20Autor%20(Casa%20do%20C%C3%B3digo).pdf) — Casa do Código | Principal | Recursos, métodos, status codes, versionamento e tratamento de erros. | C07-04, C07-09, C07-12 |
| L07-4 | [Princípios de Design e Padrões de Projeto](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Princ%C3%ADpios%20de%20Design%20e%20Padr%C3%B5es%20de%20Projeto%20-%20Autor%20(Robert%20C.%20Martin).pdf) — Robert C. Martin | Principal | Os princípios SOLID com exemplos. Identifique uma violação na sua API. | C07-10, C07-11 |
| L07-5 | [Padrões de Projeto (GoF)](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Padr%C3%B5es%20de%20Projetos%20-%20Solu%C3%A7%C3%B5es%20Reutiliz%C3%A1veis%20de%20Software%20Orientados%20a%20Objetos%20-%20Autor%20(Erich%20Gamma).pdf) — Erich Gamma et al. | Consulta | Catálogo GoF: consulte Strategy, Factory, Adapter e Observer quando aparecerem. | C07-10 |
| L07-6 | [Canivete suíço do desenvolvedor Node](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Canivete%20suico%20do%20desenvolvedor%20Node%20-%20Autor%20(Casa%20do%20C%C3%B3digo).pdf) — Casa do Código | Apoio | Ferramentas e bibliotecas do ecossistema Node; consulte quando precisar. | C07-08, C07-06 |
| L07-7 | [You Don't Know JS: Async & Performance](https://github.com/nao-sabemos-js/You-Dont-Know-JS/blob/portuguese-translation/async%20%26%20performance/README.md) (PT-BR, GitHub) — Kyle Simpson (tradução da comunidade) | Apoio | Capítulos 4 e 5: geradores, controle de fluxo assíncrono e desempenho (workers e paralelismo). Capítulos: [Capítulo 4](https://github.com/nao-sabemos-js/You-Dont-Know-JS/blob/portuguese-translation/async%20%26%20performance/ch4.md), [Capítulo 5](https://github.com/nao-sabemos-js/You-Dont-Know-JS/blob/portuguese-translation/async%20%26%20performance/ch5.md). | C07-08 |

### 08 — Frontend React e aplicação ponta a ponta

| Semana | Livro | Papel | Foco | Conteúdos |
|---|---|---|---|---|
| L08-1 | [HTML5 e CSS3 — domine a web do futuro](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/HTML5%20e%20CSS3%20-%20domine%20a%20web%20do%20futuro%20-%20Autor%20(Casa%20do%20C%C3%B3digo).pdf) — Casa do Código | Principal | Semântica, formulários e layout com CSS. | C08-01, C08-03 |
| L08-2 | [Web Design Responsivo](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Web%20Design%20Responsivo%20-%20P%C3%A1ginas%20adapt%C3%A1veis%20para%20todos%20os%20dispositivos%20-%20Autor%20(Casa%20do%20C%C3%B3digo).pdf) — Casa do Código | Principal | Media queries, layout fluido e imagens responsivas. | C08-06 |
| L08-3 | [Progressive Web Apps com React](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Progressive%20web%20apps%20-%20Construa%20aplica%C3%A7%C3%B5es%20progressivas%20com%20React%20-%20Autor%20(Casa%20do%20C%C3%B3digo).pdf) — Casa do Código | Principal | Componentes, estado e consumo de API em React, com foco no fluxo de dados. | C08-02, C08-03, C08-04, C08-05 |
| L08-4 | [Introdução e boas práticas em UX Design](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Introdu%C3%A7%C3%A3o%20e%20boas%20pr%C3%A1ticas%20em%20UX%20Design%20-%20Autor%20(Casa%20do%20C%C3%B3digo).pdf) — Casa do Código | Apoio | Heurísticas de usabilidade e testes com usuários. Avalie a tela do EZBikes. | C08-06, C08-09 |
| L08-5 | [CSS Eficiente](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/CSS%20Eficiente%20-%20T%C3%A9cnicas%20e%20ferramentas%20que%20fazem%20a%20diferen%C3%A7a%20nos%20seus%20estilos%20-%20Autor%20(Casa%20do%20C%C3%B3digo).pdf) — Casa do Código | Consulta | Organização e manutenção de CSS em projetos maiores. | C08-01 |

### 09 — Arquitetura, containers, cloud e Kubernetes

| Semana | Livro | Papel | Foco | Conteúdos |
|---|---|---|---|---|
| L09-1 | [Arquitetura Limpa](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Arquitetura%20Limpa%20-%20O%20Guia%20do%20Artes%C3%A3o%20para%20Estrutura%20e%20Design%20de%20Software%20-%20Autor%20(Robert%20C.%20Martin).pdf) — Robert C. Martin | Principal | Regra de dependência, fronteiras e camadas. Compare com a arquitetura da sua API. | C09-01, C09-03 |
| L09-2 | [Domain-Driven Design Rápido](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Domain%20Driven%20Design%20Rapido%20-%20Autor%20(Eric%20Evans).pdf) — Abel Avram e Floyd Marinescu (InfoQ) | Apoio | Linguagem ubíqua, entidades, agregados e contextos delimitados. | C09-02 |
| L09-3 | [Containers com Docker](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Containers%20com%20Docker%20-%20Do%20desenvolvimento%20%C3%A0%20produ%C3%A7%C3%A3o%20-%20Autor%20(Casa%20do%20C%C3%B3digo).pdf) — Casa do Código | Principal | Imagens, Dockerfile, volumes, redes e Compose. | C09-04 |
| L09-4 | [Entrega Contínua](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Entrega%20Cont%C3%ADnua%20-%20Como%20Entregar%20Software%20de%20Forma%20R%C3%A1pida%20e%20Confi%C3%A1vel%20-%20Auto%20(Jez%20Humble).pdf) — Jez Humble e David Farley | Principal | Pipeline de implantação, testes no pipeline e estratégias de rollback. | C09-05 |
| L09-5 | [Kubernetes — tudo sobre orquestração de contêineres](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Kubernetes%20-%20Tudo%20sobre%20orquestra%C3%A7%C3%A3o%20de%20cont%C3%AAineres%20-%20Autor%20(Casa%20do%20C%C3%B3digo).pdf) — Casa do Código | Principal | Pods, Deployments, Services, ConfigMaps, Secrets e escalonamento. | C09-07, C09-08 |
| L09-6 | [Amazon AWS — descomplicando a computação na nuvem](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Amazon%20AWS%20-%20Descomplicando%20a%20computa%C3%A7%C3%A3o%20na%20nuvem%20-%20Autor%20(Casa%20do%20C%C3%B3digo).pdf) — Casa do Código | Principal | Serviços essenciais de computação, rede e banco gerenciado, e como pensar em custos. | C09-06, C09-10, C09-11 |
| L09-7 | [DevOps na Prática](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/DevOps%20na%20Pr%C3%A1tica%20-%20Entrega%20de%20Software%20Confi%C3%A1vel%20e%20Automatizada%20-%20Autor%20(Casa%20do%20C%C3%B3digo).pdf) — Casa do Código | Apoio | Visão integrada de pipeline, infraestrutura como código e monitoramento. | C09-05, C09-09 |
| L09-8 | [Introdução à arquitetura e design de software](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Introdu%C3%A7%C3%A3o%20%C3%A0%20arquitetura%20de%20design%20de%20software%20-%20Autor%20(Paulo%20Silveira).pdf) — Paulo Silveira et al. | Consulta | Coletânea introdutória de arquitetura; consulte para ver outras perspectivas. | C09-01 |

### 10 — Observabilidade, SRE e engenharia de dados

| Semana | Livro | Papel | Foco | Conteúdos |
|---|---|---|---|---|
| L10-1 | [Estatística — o que é, para que serve, como funciona](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Estatistica%20-%20O%20que%20e,%20para%20que%20serve,%20como%20funciona%20.pdf) — Charles Wheelan | Principal | Média, mediana, dispersão e distribuições: base para entender percentis (p95/p99). | C10-01 |
| L10-2 | [Site Reliability Engineering (Google, online)](https://sre.google/sre-book/table-of-contents/) (complemento gratuito) — Betsy Beyer et al. | Principal | Capítulos de SLOs, monitoramento de sistemas distribuídos e os quatro sinais de ouro. | C10-02, C10-03, C10-04, C10-05, C10-06 |
| L10-3 | [Big Data — técnicas e tecnologias para extração de valor dos dados](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Big%20Data%20-%20T%C3%A9cnicas%20e%20tecnologias%20para%20extra%C3%A7%C3%A3o%20de%20valor%20dos%20dados%20-%20Autor%20(Casa%20do%20C%C3%B3digo).pdf) — Casa do Código | Principal | Arquiteturas de processamento de dados, pipelines e armazenamento. | C10-08, C10-09 |
| L10-4 | [Como mentir com estatística](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Como%20mentir%20com%20estat%C3%ADstica%20-%20Auto%20(Darrell-Heff).pdf) — Darrell Huff | Apoio | Como gráficos e médias enganam. Revise seus dashboards com esse olhar. | C10-04, C10-10 |

### 11 — Fundamentos de segurança e raciocínio ofensivo/defensivo

| Semana | Livro | Papel | Foco | Conteúdos |
|---|---|---|---|---|
| L11-1 | [OWASP Top 10:2025](https://top10.owasp.org/2025/) (complemento gratuito) — OWASP | Principal | Leia as categorias e os exemplos de prevenção, relacionando cada uma com o EZBikes. | C11-08, C11-07 |
| L11-2 | [OWASP Threat Modeling Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html) (complemento gratuito) — OWASP | Principal | As quatro perguntas da modelagem de ameaças e o uso de STRIDE. | C11-06, C11-09 |
| L11-3 | [Comunicação de Dados e Redes de Computadores](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Comunica%C3%A7%C3%A3o%20de%20Dados%20e%20Redes%20de%20Computadores%20-%20Autor%20(Behrouz%20A.%20Forouzan).pdf) — Behrouz A. Forouzan | Consulta | Capítulos de criptografia e segurança de redes, como referência. | C11-03, C11-05 |

### 12 — AppSec e segurança de aplicações web

| Semana | Livro | Papel | Foco | Conteúdos |
|---|---|---|---|---|
| L12-1 | [Web Security Academy](https://portswigger.net/web-security/learning-paths) (complemento gratuito) — PortSwigger | Principal | Leia o material de cada vulnerabilidade antes dos labs correspondentes. | C12-01, C12-03, C12-04, C12-05, C12-06, C12-07 |
| L12-2 | [OWASP Web Security Testing Guide](https://owasp.org/projects/web-security-testing-guide) (complemento gratuito) — OWASP | Principal | Seções de testes de autenticação, autorização, sessão e validação de entrada. | C12-09, C12-11, C12-12 |
| L12-3 | [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/) (complemento gratuito) — OWASP | Apoio | Cheat sheets de XSS, SQL injection e CSRF como checklist de correção. | C12-04, C12-05, C12-06, C12-13 |

### 13 — DevSecOps, IAM, cloud security, detecção e resposta

| Semana | Livro | Papel | Foco | Conteúdos |
|---|---|---|---|---|
| L13-1 | [Caixa de Ferramentas DevOps](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Caixa%20de%20Ferramentas%20DevOps%20-%20Um%20Guia%20para%20Constru%C3%A7%C3%A3o,%20Administra%C3%A7%C3%A3o%20e%20Arquitetura%20de%20Sistemas%20Modernos%20-%20Autor%20(Casa%20do%20C%C3%B3digo).pdf) — Casa do Código | Principal | Ferramentas de pipeline, configuração e infraestrutura: identifique onde inserir verificações de segurança. | C13-01, C13-02, C13-05 |
| L13-2 | [OAuth 2.0 — proteja suas aplicações com Spring Security](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Oauth%202.0%20Proteja%20Suas%20Aplicacoes%20Com%20O%20Spring%20Security%20Oauth2%20-%20Autor%20(Casa%20do%20C%C3%B3digo).pdf) — Casa do Código | Principal | Foque nos fluxos e papéis do OAuth 2.0 (resource owner, client, authorization server). Os exemplos são em Java/Spring. | C13-06 |
| L13-3 | [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/) (complemento gratuito) — OWASP | Principal | Docker Security, Kubernetes Security, Secrets Management e Logging Cheat Sheets. | C13-04, C13-07, C13-09 |
| L13-4 | [AWS Certified Security Specialty — guia de estudo](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/AWS%20Certified%20Security%20Specialty%20Exam%20-%20Autor%20(Jon%20Bonso%20and%20Carlo%20Acebedo).pdf) (inglês) — Jon Bonso e Carlo Acebedo | Consulta | Seções de IAM, KMS, logs e resposta a incidentes na AWS. | C13-08, C13-10 |

### 14 — Avaliação de segurança autorizada e segurança de IA

| Semana | Livro | Papel | Foco | Conteúdos |
|---|---|---|---|---|
| L14-1 | [OWASP Web Security Testing Guide](https://owasp.org/projects/web-security-testing-guide) (complemento gratuito) — OWASP | Principal | Segunda passada: metodologia, escopo, coleta de evidências e relatório. | C14-01, C14-02, C14-04 |
| L14-2 | [OWASP Top 10 para aplicações com LLM](https://genai.owasp.org/llm-top-10/) (complemento gratuito) — OWASP GenAI Security Project | Principal | Prompt injection, vazamento de dados sensíveis e riscos de RAG. | C14-05, C14-06 |
| L14-3 | [The Clean Coder](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Clean%20Coder,%20The%20-%20A%20Code%20of%20Conduct%20for%20Professional%20Programmers%20-%20Autor%20(Robert%20C.%20Martin).pdf) (inglês) — Robert C. Martin | Apoio | Profissionalismo, compromissos e estimativas — útil para defender decisões no desafio final. | C14-07, C14-08 |

### Pós em paralelo

| Semana | Livro | Papel | Foco | Conteúdos |
|---|---|---|---|---|
| LP-1 | [Big Data — técnicas e tecnologias para extração de valor dos dados](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Big%20Data%20-%20T%C3%A9cnicas%20e%20tecnologias%20para%20extra%C3%A7%C3%A3o%20de%20valor%20dos%20dados%20-%20Autor%20(Casa%20do%20C%C3%B3digo).pdf) — Casa do Código | Apoio | Pipelines, camadas e armazenamento em larga escala. | P02 |
| LP-2 | [Business Intelligence — implementar do jeito certo](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Business%20Intelligence%20-%20Implementar%20do%20jeito%20certo%20e%20a%20custo%20zero%20-%20Autor%20(Casa%20do%20C%C3%B3digo).pdf) — Casa do Código | Apoio | Modelagem analítica e camadas de dados para a atividade de engenharia de dados. | P02 |
| LP-3 | [Site Reliability Engineering (Google, online)](https://sre.google/sre-book/table-of-contents/) (complemento gratuito) — Betsy Beyer et al. | Apoio | Monitoramento, SLOs e orçamento de erro para o trabalho de Observabilidade/SRE. | P03, P04, P05, P06 |
| LP-4 | [Estatística — o que é, para que serve, como funciona](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Estatistica%20-%20O%20que%20e,%20para%20que%20serve,%20como%20funciona%20.pdf) — Charles Wheelan | Apoio | Percentis e distribuições para interpretar métricas de latência. | P05, P06 |
| LP-5 | [Introdução a Data Science](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Introdu%C3%A7%C3%A3o%20a%20data%20science%20-%20Algoritmos%20de%20machine%20learning%20e%20m%C3%A9todos%20de%20an%C3%A1lise%20-%20Autor%20(Casa%20do%20C%C3%B3digo).pdf) — Casa do Código | Apoio | Fundamentos de machine learning antes das aulas de IA generativa e RAG. | P07, P08 |
| LP-6 | [OWASP Top 10 para aplicações com LLM](https://genai.owasp.org/llm-top-10/) (complemento gratuito) — OWASP GenAI Security Project | Apoio | Riscos de aplicações com LLM e RAG. | P08, P14 |
| LP-7 | [Entrega Contínua](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Entrega%20Cont%C3%ADnua%20-%20Como%20Entregar%20Software%20de%20Forma%20R%C3%A1pida%20e%20Confi%C3%A1vel%20-%20Auto%20(Jez%20Humble).pdf) — Jez Humble e David Farley | Apoio | Pipeline de implantação como base para DevSecOps. | P11 |
| LP-8 | [OAuth 2.0 — proteja suas aplicações com Spring Security](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Oauth%202.0%20Proteja%20Suas%20Aplicacoes%20Com%20O%20Spring%20Security%20Oauth2%20-%20Autor%20(Casa%20do%20C%C3%B3digo).pdf) — Casa do Código | Apoio | Fluxos OAuth 2.0 para a aula de identidade e autenticação. | P12 |
| LP-9 | [AWS Certified Security Specialty — guia de estudo](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/AWS%20Certified%20Security%20Specialty%20Exam%20-%20Autor%20(Jon%20Bonso%20and%20Carlo%20Acebedo).pdf) (inglês) — Jon Bonso e Carlo Acebedo | Apoio | IAM, logs e resiliência na nuvem. | P13 |
| LP-10 | [Arquitetura Limpa](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Arquitetura%20Limpa%20-%20O%20Guia%20do%20Artes%C3%A3o%20para%20Estrutura%20e%20Design%20de%20Software%20-%20Autor%20(Robert%20C.%20Martin).pdf) — Robert C. Martin | Apoio | Fronteiras e decisões arquiteturais para o seminário final. | P16 |

### Leitura leve da semana (rodízio)

Em paralelo ao livro técnico, o painel sugere uma leitura de carreira por semana, em rodízio:

1. [O Programador Pragmático](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/O%20Programador%20Pragm%C3%A1tico%20-%20Autor%20(Andrew%20Hunt%20e%20David%20Thomas).pdf) — Andrew Hunt e David Thomas
2. [Apprenticeship Patterns](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Apprenticeship%20Patterns%20-%20Guidance%20for%20the%20Aspiring%20Software%20Craftsman%20-%20Autor%20(Dave%20Hoover%20e%20Adewale%20Oshineye).pdf) — Dave Hoover e Adewale Oshineye (inglês)
3. [Secrets of a Buccaneer-Scholar](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Secrets%20of%20a%20Buccaneer-Scholar%20-%20How%20Self-Education%20and%20the%20Pursuit%20of%20Passion%20Can%20Lead%20to%20a%20Lifetime%20of%20Success%20-%20Autor%20(James%20Marcus%20Bach).pdf) — James Marcus Bach (inglês)
4. [Soft Skills](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Soft%20Skills%20-%20The%20Software%20Developer's%20Life%20Manual%20-%20Autor%20(John%20Sonmez).pdf) — John Sonmez (inglês)
5. [O Programador Apaixonado](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/O%20Programador%20Apaixonado%20-%20Construindo%20uma%20Carreira%20Not%C3%A1vel%20em%20Desenvolvimento%20de%20Software%20-%20Autor%20(Casa%20do%20C%C3%B3digo).pdf) — Chad Fowler
6. [Por que os Generalistas Vencem em um Mundo de Especialistas](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Por%20que%20Os%20Generalistas%20Vencem%20Em%20um%20Mundo%20de%20Especialistas%20-%20Autor(David%20Epstein).pdf) — David Epstein
7. [The Software Craftsman](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/The%20Software%20Craftsman%20-%20Professionalism,%20Pragmatism,%20Pride%20-%20Autor%20(Sandro%20Mancuso).pdf) — Sandro Mancuso (inglês)
8. [The Mythical Man-Month](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/The%20Mythical%20Man-Month%20Essays%20On%20Software%20Engineering%20-%20Author%20(Frederick%20P.%20Brooks).pdf) — Frederick P. Brooks (inglês)
9. [O Ego É Seu Inimigo](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/O%20Ego%20%C3%89%20Seu%20Inimigo.%20Como%20Dominar%20Seu%20Pior%20Advers%C3%A1rio%20-%20Autor%20(Ryan%20Holiday).pdf) — Ryan Holiday
10. [Fragmentos de um programador](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Fragmentos%20de%20um%20programador%20-%20Artigos%20e%20insights%20da%20carreira%20de%20um%20profissional%20-%20Autor%20(Casa%20do%20C%C3%B3digo).pdf) — Casa do Código
11. [Guia do Mestre Programador](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Guia%20do%20Mestre%20Programador%20-%20Pensando%20como%20pirata,%20evoluindo%20como%20jedi%20-%20Autor%20(Casa%20do%20C%C3%B3digo).pdf) — Casa do Código
12. [The Clean Coder](https://github.com/EnzoOliveiradev/BibliotecaDev/blob/main/LivrosDev/Clean%20Coder,%20The%20-%20A%20Code%20of%20Conduct%20for%20Professional%20Programmers%20-%20Autor%20(Robert%20C.%20Martin).pdf) — Robert C. Martin (inglês)

### Lacunas da biblioteca

- **JavaScript como linguagem:** A BibliotecaDev não tem um livro de JavaScript. A trilha usa a série You Don't Know JS em português (tradução da comunidade nao-sabemos-js, lida no GitHub) e o Eloquent JavaScript como prática extra.
- **SQL e PostgreSQL:** Não há livro de SQL relacional. Complementos gratuitos: tutorial oficial do PostgreSQL e Use The Index, Luke!
- **Observabilidade e SRE:** Não há livro de SRE. Complementos gratuitos: Site Reliability Engineering e The Site Reliability Workbook (Google).
- **Segurança de aplicações:** Nenhum livro de AppSec. Use PortSwigger Academy e os guias OWASP (Top 10, WSTG, ASVS, Cheat Sheets). Candidatos para adquirir: "Alice and Bob Learn Application Security" (Tanya Janca), "Threat Modeling: Designing for Security" (Adam Shostack) e "Hacking APIs" (Corey Ball).
- **Dados e sistemas distribuídos:** Candidato para adquirir: "Designing Data-Intensive Applications" (Martin Kleppmann), útil para as etapas 6, 9 e 10 e para a pós.
- **IA generativa e LLMs:** Sem livro específico. Use OWASP Top 10 para LLM e o material das aulas da pós.

## Pós em paralelo — do Notion

| Prazo real | Tarefa | Observações |
|---|---|---|
| 2026-11-30 | [Projeto Aplicado I — entrega](https://app.notion.com/p/418487f0bca281a9afa5e263168609a3) | Organizar enunciado, entregáveis, evidências e submissão (prazo confirmado). |
| 2026-11-30 | [Engenharia de Dados em Larga Escala — atividade](https://app.notion.com/p/418487f0bca281a3a228c519e4f0225e) | Preparar pipeline, segurança, observabilidade e apresentação (prazo confirmado). |
| 2026-12-06 | [Observabilidade, SRE e Engenharia de Confiabilidade de Sistemas — trabalho](https://app.notion.com/p/418487f0bca28116a75bec076fa3e10a) | Revisar enunciado próprio e entregar o trabalho separado (prazo confirmado). |

### Outros tópicos da pós

- **Logs estruturados e stack ELK — material Projeto Aplicado I** — Interpretar JSON logs, MDC/trace_id, ELK e retenção. [Fonte](https://app.notion.com/p/41f487f0bca281d29dd2c51c12e4e131).
- **Prometheus, Grafana e Golden Signals — material Projeto Aplicado I** — Ler counters, histogramas, PromQL e dashboards de SRE. [Fonte](https://app.notion.com/p/41f487f0bca281d29dd2c51c12e4e131).
- **SLI, SLO e error budget — material Projeto Aplicado I** — Definir indicador, objetivo, orçamento e política de alertas. [Fonte](https://app.notion.com/p/41f487f0bca281d29dd2c51c12e4e131).
- **IA generativa e LLMs** — Revisar tokens, inferência, limitações, API e casos de uso. Aula em 28/11/2026. [Fonte](https://app.notion.com/p/418487f0bca281f49fb0d174e9d01bc3).
- **RAG e bancos vetoriais** — Diferenciar embeddings, busca, chunking e avaliação de retrieval. Aula em 12/12/2026. [Fonte](https://app.notion.com/p/418487f0bca281f49fb0d174e9d01bc3).
- **LLMOps e ciclo de vida — aula 20/02** — Trabalhar avaliação, custo, tracing, versionamento de prompt e drift. Aula em 20/02/2027. [Fonte](https://app.notion.com/p/418487f0bca281f49fb0d174e9d01bc3).
- **Projeto Aplicado II — integração IA — aula 06/03** — Integrar componentes IA em uma aplicação escalável. Aula em 06/03/2027. [Fonte](https://app.notion.com/p/418487f0bca281f49fb0d174e9d01bc3).
- **DevSecOps e segurança em pipelines — aula 20/03** — Revisar SSDLC, SAST, SCA, SBOM, DAST e CI segura. Aula em 20/03/2027. [Fonte](https://app.notion.com/p/418487f0bca281f49fb0d174e9d01bc3).
- **Gestão de identidade, autenticação e LGPD — aula 10/04** — Distinguir autenticação, autorização, IAM e proteção de dados. Aula em 10/04/2027. [Fonte](https://app.notion.com/p/418487f0bca281f49fb0d174e9d01bc3).
- **Segurança em cloud e resiliência — aula 24/04** — Identificar riscos em rede, IAM, logs, alta disponibilidade e backup. Aula em 24/04/2027. [Fonte](https://app.notion.com/p/418487f0bca281f49fb0d174e9d01bc3).
- **Segurança de sistemas de IA — aula 08/05** — Trabalhar prompt injection, vazamento de contexto e segurança de retrieval. Aula em 08/05/2027. [Fonte](https://app.notion.com/p/418487f0bca281f49fb0d174e9d01bc3).
- **Projeto Aplicado III — hardening e arquitetura segura — aula 22/05** — Planejar padrões de arquitetura segura e evidências de hardening. Aula em 22/05/2027. [Fonte](https://app.notion.com/p/418487f0bca281f49fb0d174e9d01bc3).
- **Seminário final — projeto arquitetural escalável — aula 12/06** — Apresentar trade-offs, confiabilidade, custo e proteção de dados. Aula em 12/06/2027. [Fonte](https://app.notion.com/p/418487f0bca281f49fb0d174e9d01bc3).

### Calendário de aulas confirmado no Notion (não é prazo de entrega)

| Data | Aula |
|---|---|
| 2026-11-28 | Inteligência Artificial Generativa e Large Language Models |
| 2026-12-12 | Sistemas baseados em RAG e Bancos Vetoriais |
| 2027-02-20 | LLMOps e Ciclo de Vida de Sistemas Inteligentes |
| 2027-03-06 | Projeto Aplicado II: Integração de Inteligência em Sistemas |
| 2027-03-20 | DevSecOps e Segurança em Pipelines de Software |
| 2027-04-10 | Gestão de Identidade, Autenticação e LGPD |
| 2027-04-24 | Segurança em Cloud e Resiliência de Sistemas |
| 2027-05-08 | Segurança de Sistemas de Inteligência Artificial |
| 2027-05-22 | Projeto Aplicado III: Hardening e Arquitetura Segura |
| 2027-06-12 | Seminário de Encerramento: Projeto Arquitetural Escalável |

> Horário habitual informado para as aulas: 08h–12h; conferir atualizações na plataforma de ensino. O Notion é a fonte consultada, mas não há sincronização automática entre Notion e DevPath.

## Projetos de portfólio orientadores

1. **EZBikes JavaScript** (etapas 2, 3, 4): Funções de busca, filtro, estoque e validação, com testes e versionamento, sem infraestrutura.
2. **EZBikes Full Stack** (etapas 6, 7, 8): PostgreSQL, API Node/TypeScript, autenticação por usuário e frontend React.
3. **EZBikes Cloud** (etapas 9): Docker, CI/CD, implantação, observabilidade e decisões de arquitetura.
4. **ObservaLab** (etapas 10): Métricas, logs, traces, SLI/SLO, testes de carga e relatório de incidente.
5. **EZBikes Secure** (etapas 11, 12, 13, 14): STRIDE, OWASP ASVS, testes de segurança em ambiente próprio, CI seguro, hardening e relatório final.

## Prioridades e lógica do painel diário

1. Prazos reais que ocorrerão em até 14 dias (até 1 sessão em orçamentos < 75 min; até 2 em sessões maiores).
2. Revisões vencidas, mesmo de assuntos concluídos.
3. Assuntos em andamento já liberados.
4. Pós-graduação em paralelo às terças, quintas e sábados quando houver tempo e não houver uma entrega da pós já selecionada; a aula mais próxima tem preferência.
5. O próximo assunto liberado da trilha principal, na ordem da etapa.

**Pré-requisitos:** os conteúdos de cada etapa podem ser estudados em ordem flexível; para fazer o desafio de saída, todos os conteúdos obrigatórios da etapa devem estar concluídos (conteúdos opcionais (optional: true) não bloqueiam o desafio de saída da etapa.). A etapa seguinte é liberada quando o desafio da anterior é concluído. A pós não é bloqueada por essas portas.

## Como acompanhar a leitura de código

Faça um teste com 10 critérios: entradas/saídas (2), fluxo de execução (2), valores e efeitos (2), justificativa de decisões (2), alteração correta (2). Repita em códigos novos de dificuldade semelhante a cada 2–4 semanas. A meta de 90% significa 9/10 nesse conjunto controlado, não 90% de qualquer código existente.

## Segurança de uso e escopo

Todos os exercícios ofensivos devem ocorrer apenas em laboratórios expressamente autorizados, PortSwigger Academy ou sistemas próprios. Nunca testar terceiros, produção ou ambientes de trabalho sem aprovação explícita.

## Referências

- [Central da pós no Notion](https://app.notion.com/p/418487f0bca281f49fb0d174e9d01bc3)
- [Projeto Aplicado I: observabilidade](https://app.notion.com/p/41f487f0bca281d29dd2c51c12e4e131)
- [AppSec: anotações do Notion](https://app.notion.com/p/407487f0bca2808dae5ac39a89942192)
- [OWASP Top 10:2025](https://top10.owasp.org/2025/)
- [PortSwigger Web Security Academy](https://portswigger.net/web-security/learning-paths)
- [BibliotecaDev](https://github.com/EnzoOliveiradev/BibliotecaDev)
