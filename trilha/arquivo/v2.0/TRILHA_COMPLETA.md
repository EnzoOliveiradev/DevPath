# DevPath 2.0 — trilha completa de lógica à cibersegurança

> Atualizado em 22/11/2026 com o conteúdo da Central de Estudos e das Entregas da pós no Notion.

## Objetivo

Desenvolver leitura, previsão, depuração e implementação independente de código; depois arquitetura e segurança. A pós ocorre em trilha paralela para não perder aulas e prazos.

**Método de cada sessão:** Predict → Run → Investigate → Modify → Make (PRIMM), com tentativa independente, testes e revisão espaçada.

**Critério sugerido antes de avançar:** compreender pelo menos 80% de critérios definidos de código inédito, recuperar 4/5 de memória após 48h e resolver com ajuda 0 ou 1 (nenhuma/documentação). Não é certificação, diagnóstico ou correção automática.

**Carga inicial:** 30–60 min/sessão, 5 dias/semana. Evoluir a 1–2h quando a constância estiver estabelecida. Os minutos do catálogo representam sessões introdutórias, não o total para dominar o assunto; capstones, revisões e correções adicionam trabalho.

## Mapa geral

| Etapa | Tema | Módulos | Horas de sessões base |
|---|---|---:|---:|
| 01 | Raciocínio computacional e leitura de código | 10 | 5.5 |
| 02 | JavaScript essencial | 10 | 5.5 |
| 03 | JavaScript intermediário e debugging | 10 | 5.5 |
| 04 | Estruturas de dados, algoritmos e qualidade | 9 | 5.0 |
| 05 | Ambiente profissional, Linux, Git, redes e HTTP | 10 | 5.5 |
| 06 | Backend Node.js e TypeScript | 10 | 7.8 |
| 07 | Dados, SQL e PostgreSQL | 9 | 7.0 |
| 08 | Frontend React e aplicação ponta a ponta | 8 | 6.2 |
| 09 | Arquitetura, containers, cloud e Kubernetes | 10 | 7.8 |
| 10 | Observabilidade, SRE e engenharia de dados | 9 | 7.0 |
| 11 | Fundamentos de segurança e raciocínio ofensivo/defensivo | 9 | 7.0 |
| 12 | AppSec e segurança de aplicações web | 12 | 9.2 |
| 13 | DevSecOps, IAM, cloud security e hardening | 10 | 7.8 |
| 14 | Pentest autorizado, resposta a incidentes e segurança de IA | 10 | 7.8 |

> Além das 136 aulas/desafios principais, há 16 tópicos paralelos da pós. O conteúdo-base soma 94,5 h de sessões sugeridas; a formação completa exigirá bem mais prática e revisão. Não há prazo fixo de conclusão.

## Trilha principal — módulos e portões de progresso

### 01 — Raciocínio computacional e leitura de código

**Meta:** Interpretar programas simples, rastrear estado e descrever o fluxo sem ajuda
**Saída:** Ler dois trechos inéditos de 20–40 linhas e acertar pelo menos 8/10 critérios sem IA

- **C01-01 — Raciocínio lógico e pseudocódigo** (30 min): Decompor problemas em entrada, processamento e saída Prática: Escreva pseudocódigo para validar um pedido e execute mentalmente 3 cenários. [Material](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide).
- **C01-02 — Variáveis, tipos e operadores** (30 min): Rastrear mudanças de estado e coerção de tipos Prática: Faça uma tabela de variáveis linha a linha e preveja 5 saídas. [Material](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide).
- **C01-03 — Condicionais e laços** (30 min): Entender ramificações, loop e condição de parada Prática: Preveja a saída de 5 laços e corrija um loop infinito. [Material](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide).
- **C01-04 — Funções e escopo** (30 min): Distinguir parâmetros, argumentos, retornos e variáveis locais Prática: Explique a execução de 3 chamadas aninhadas e modifique uma função. [Material](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide).
- **C01-05 — Tabela de execução (dry run)** (30 min): Manter uma trilha de valores durante a execução Prática: Monte o trace de um algoritmo sem rodar e compare com o debugger. [Material](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide).
- **C01-06 — Operadores booleanos e tabelas verdade** (30 min): Interpretar AND, OR, NOT e short-circuit Prática: Monte 8 previsões de expressão e verifique no Node. [Material](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide).
- **C01-07 — Erros, casos de borda e invariantes** (30 min): Descrever pré-condições, pós-condições e falhas esperadas Prática: Liste 5 entradas extremas e defina o comportamento esperado. [Material](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide).
- **C01-08 — Entrada, processamento e saída** (30 min): Identificar contratos de funções e transformações Prática: Leia um código alheio e desenhe seu fluxo de dados. [Material](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide).
- **C01-09 — Leitura de código sem IA — baseline** (30 min): Medir a capacidade atual em trechos desconhecidos Prática: Resolva um teste com 10 critérios, sem consultar nem IA. [Material](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide).
- **C01-10 — Desafio de saída 01 — interpretar código** (60 min): Explicar, prever e alterar códigos curtos inéditos Prática: Acerte 8/10 critérios em dois trechos diferentes, justificando cada saída. [Material](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide).

### 02 — JavaScript essencial

**Meta:** Ler e escrever operações básicas sem depender de exemplos prontos
**Saída:** Implementar 4 funções sem IA e explicar como a execução altera os valores

- **C02-01 — Sintaxe, declaração e operadores JS** (30 min): Diferenciar let/const e tipos primitivos no runtime Prática: Preveja saídas com comparações, coerção e operadores de atribuição. [Material](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide).
- **C02-02 — Arrays: map, filter e reduce** (30 min): Ler pipelines de transformação de coleções Prática: Preveja e modifique map/filter/reduce em 3 conjuntos de dados. [Material](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide).
- **C02-03 — Objetos e destructuring** (30 min): Interpretar propriedades, cópias, referências e spread Prática: Explique mutabilidade e corrija uma alteração indesejada. [Material](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide).
- **C02-04 — Strings, numbers e datas** (30 min): Tratar parsing, formatação e validação básica Prática: Implemente normalização de nomes e números sem copiar. [Material](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide).
- **C02-05 — Funções, callbacks básicos e arrow functions** (30 min): Rastrear parâmetros e callbacks de transformação Prática: Transforme uma função tradicional em arrow e teste seu retorno. [Material](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide).
- **C02-06 — Arrays, objetos, Map e Set** (30 min): Selecionar estrutura adequada para cada problema Prática: Agrupe registros e remova duplicatas usando duas estruturas diferentes. [Material](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide).
- **C02-07 — Nullish coalescing e optional chaining** (30 min): Interpretar dados opcionais e valores ausentes Prática: Corrija uma leitura de objeto aninhado que gera erro. [Material](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide).
- **C02-08 — JSON, serialização e parsing** (30 min): Entender dados na fronteira entre serviços Prática: Converta um payload e valide um formato esperado. [Material](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide).
- **C02-09 — Mini projeto JS — estoque EZBikes** (30 min): Modelar produtos e filtrar bicicletas por preço/categoria Prática: Crie consulta de estoque e testes simples, com explicação linha a linha. [Material](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide).
- **C02-10 — Desafio de saída 02 — funções e coleções** (60 min): Resolver transformações inéditas sem depender de IA Prática: Implemente 4 funções e explique duas implementações de terceiros. [Material](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide).

### 03 — JavaScript intermediário e debugging

**Meta:** Entender assincronismo e depurar aplicações sem depender da solução de IA
**Saída:** Explicar ordem de execução, capturar erros e isolar um bug reproduzível

- **C03-01 — Closures e callbacks** (30 min): Explicar estado capturado, efeitos e callbacks Prática: Preveja saídas de closures e conserte um callback com estado inesperado. [Material](https://nodejs.org/en/learn).
- **C03-02 — Hoisting, escopo lexical e this** (30 min): Diferenciar ambientes de execução e binding Prática: Rastreie 4 exemplos de this e escopo, prevendo o resultado. [Material](https://nodejs.org/en/learn).
- **C03-03 — Promises e async/await** (30 min): Explicar execução assíncrona e propagação de erros Prática: Preveja a ordem de 8 logs com promises e temporizadores. [Material](https://nodejs.org/en/learn).
- **C03-04 — Event loop e microtasks** (30 min): Diferenciar pilha, fila e tarefas assíncronas Prática: Desenhe a ordem de eventos de um snippet com await e timers. [Material](https://nodejs.org/en/learn).
- **C03-05 — Módulos e tratamento de erros** (30 min): Aplicar import/export, throw, try/catch e erro tipado Prática: Separe funções em módulos e trate três casos de erro. [Material](https://nodejs.org/en/learn).
- **C03-06 — Debugging com breakpoints** (30 min): Usar depurador, stack trace, watch e passos Prática: Investigue um bug real e registre causa e correção. [Material](https://nodejs.org/en/learn).
- **C03-07 — Manipulação imutável e efeitos colaterais** (30 min): Identificar mutações inesperadas e funções puras Prática: Refatore função com mutação global e compare os testes. [Material](https://nodejs.org/en/learn).
- **C03-08 — Leitura de código legado** (30 min): Reconstruir fluxo de funções em diferentes arquivos Prática: Explique o comportamento de 60 linhas desconhecidas antes de editar. [Material](https://nodejs.org/en/learn).
- **C03-09 — Mini projeto — cliente HTTP resiliente** (30 min): Tratar timeout, retries limitados e erros de uma API Prática: Consuma uma API simulada com erros e logs, com testes. [Material](https://nodejs.org/en/learn).
- **C03-10 — Desafio de saída 03 — depuração** (60 min): Diagnosticar um bug novo e explicar a correção Prática: Identifique causa raiz em menos de 45 min e deixe teste de regressão. [Material](https://nodejs.org/en/learn).

### 04 — Estruturas de dados, algoritmos e qualidade

**Meta:** Escolher estruturas, compreender custos e verificar comportamentos
**Saída:** Passar testes de correção e justificar complexidade e casos limites

- **C04-01 — Complexidade e algoritmos** (30 min): Explicar O(1), O(n), O(n²), custo de memória Prática: Compare duas soluções com tamanhos crescentes e justifique o custo. [Material](https://developer.mozilla.org/en-US/docs/Web/JavaScript).
- **C04-02 — Busca linear e binária** (30 min): Entender precondições e invariantes de busca Prática: Implemente duas buscas e teste lista vazia e duplicados. [Material](https://developer.mozilla.org/en-US/docs/Web/JavaScript).
- **C04-03 — Ordenação e comparadores** (30 min): Explicar critério de ordenação e estabilidade Prática: Ordene pedidos por critérios sem modificar os dados originais. [Material](https://developer.mozilla.org/en-US/docs/Web/JavaScript).
- **C04-04 — Pilha, fila, lista e hash map** (30 min): Aplicar estruturas a problemas de operação Prática: Simule fila de atendimento e cache de consultas. [Material](https://developer.mozilla.org/en-US/docs/Web/JavaScript).
- **C04-05 — Recursão e iteração** (30 min): Identificar caso-base, progresso e stack Prática: Reescreva uma solução recursiva de forma iterativa. [Material](https://developer.mozilla.org/en-US/docs/Web/JavaScript).
- **C04-06 — Algoritmos de grafos: introdução** (30 min): Modelar dependências e percursos em grafos Prática: Represente pré-requisitos de uma trilha e detecte ciclo simples. [Material](https://developer.mozilla.org/en-US/docs/Web/JavaScript).
- **C04-07 — Testes automatizados** (30 min): Criar testes unitários, parametrizados e casos de borda Prática: Escreva 10 testes de funções puras com runner do Node. [Material](https://developer.mozilla.org/en-US/docs/Web/JavaScript).
- **C04-08 — Refatoração e legibilidade** (30 min): Reduzir duplicação e melhorar nomes e contratos Prática: Melhore código feio sem mudar seus resultados e prove por testes. [Material](https://developer.mozilla.org/en-US/docs/Web/JavaScript).
- **C04-09 — Desafio de saída 04 — algoritmos testáveis** (60 min): Justificar estratégia e comparar alternativas Prática: Resolva 2 problemas e entregue testes, complexidade e trade-offs. [Material](https://developer.mozilla.org/en-US/docs/Web/JavaScript).

### 05 — Ambiente profissional, Linux, Git, redes e HTTP

**Meta:** Entender o caminho da requisição desde sistema operacional até servidor
**Saída:** Diagnosticar conexão HTTP e publicar repositório com histórico claro

- **C05-01 — Linux e shell** (30 min): Navegar em arquivos, processos, streams e permissões Prática: Investigue logs, variáveis de ambiente e códigos de saída. [Material](https://linuxjourney.com/).
- **C05-02 — Processos, memória e sistema de arquivos** (30 min): Entender PID, sockets, processos filhos e sinais Prática: Identifique processo que usa uma porta e encerre-o corretamente. [Material](https://linuxjourney.com/).
- **C05-03 — Git e fluxo de branches** (30 min): Reverter, fazer merge, resolver conflito e revisar diffs Prática: Crie branch, PR simulado, conflito e restauração sem apagar trabalho. [Material](https://linuxjourney.com/).
- **C05-04 — Terminal e scripts de automação** (30 min): Construir scripts defensivos e reproduzíveis Prática: Automatize testes e validação de ambiente com tratamento de erro. [Material](https://linuxjourney.com/).
- **C05-05 — Modelos TCP/IP, DNS e roteamento** (30 min): Explicar resolução DNS, portas e tráfego Prática: Rastreie requisição de domínio até IP e porta, com ferramentas locais. [Material](https://linuxjourney.com/).
- **C05-06 — HTTP, APIs REST e status codes** (30 min): Interpretar método, cabeçalho, corpo, cache e status Prática: Use curl para diagnosticar um 401, 404 e 500. [Material](https://linuxjourney.com/).
- **C05-07 — TLS, certificados e HTTPS** (30 min): Descrever handshake, validação e criptografia de transporte Prática: Inspecione certificado e explique como o cliente confia no servidor. [Material](https://linuxjourney.com/).
- **C05-08 — Cookies, sessões e CORS** (30 min): Explicar escopos e fluxos de sessão no navegador Prática: Compare request autenticado e preflight no devtools. [Material](https://linuxjourney.com/).
- **C05-09 — Logs e diagnóstico em CLI** (30 min): Correlacionar falhas entre cliente e servidor Prática: Investigue uma falha simulada com curl e logs em dois serviços. [Material](https://linuxjourney.com/).
- **C05-10 — Desafio de saída 05 — diagnosticar uma API** (60 min): Localizar problema de rede/HTTP com evidências Prática: Explique a sequência DNS→TLS→HTTP e reproduza/solucione uma falha. [Material](https://linuxjourney.com/).

### 06 — Backend Node.js e TypeScript

**Meta:** Construir e explicar APIs com autenticação, validação e tratamento de erros
**Saída:** Entregar uma API com testes e revisar sem ajuda um endpoint desconhecido

- **C06-01 — TypeScript: tipos e interfaces** (45 min): Modelar contratos, unions, generics básicos e narrowing Prática: Converta módulo JS para TS e elimine any injustificado. [Material](https://nodejs.org/en/learn).
- **C06-02 — Node.js: runtime e módulos** (45 min): Entender event loop, módulos e APIs nativas Prática: Explique ciclo de execução de servidor Node e seus erros. [Material](https://nodejs.org/en/learn).
- **C06-03 — Servidor HTTP e roteamento** (45 min): Separar rotas, handlers e serviços Prática: Crie rotas de catálogo com respostas HTTP corretas. [Material](https://nodejs.org/en/learn).
- **C06-04 — Criar uma API com Node.js** (45 min): Integrar validação, services e erros HTTP Prática: Implemente CRUD de bicicletas com casos de borda. [Material](https://nodejs.org/en/learn).
- **C06-05 — Validação de entradas e contratos** (45 min): Distinguir confiança externa de dados internos Prática: Adicione schema validation e testes de entradas malformadas. [Material](https://nodejs.org/en/learn).
- **C06-06 — Assincronismo e concorrência no backend** (45 min): Gerenciar promise, limites de paralelismo e cancelamento Prática: Processe lote com controle de concorrência e erros. [Material](https://nodejs.org/en/learn).
- **C06-07 — Autenticação e autorização no backend** (45 min): Diferenciar identidade, sessão e permissão Prática: Projete roles e teste acesso a objetos de outros usuários. [Material](https://nodejs.org/en/learn).
- **C06-08 — Testes de integração para APIs** (45 min): Testar rotas, banco de teste e erros Prática: Automatize fluxo criação→consulta→alteração→erro. [Material](https://nodejs.org/en/learn).
- **C06-09 — Arquitetura por camadas** (45 min): Diferenciar controller, service, repository e domain Prática: Refatore um endpoint sem mudar contrato público. [Material](https://nodejs.org/en/learn).
- **C06-10 — Desafio de saída 06 — API EZBikes** (60 min): Entregar catálogo/estoque autenticado com documentação Prática: Demonstre rotas com testes, leitura de código e decisões justificadas. [Material](https://nodejs.org/en/learn).

### 07 — Dados, SQL e PostgreSQL

**Meta:** Ler, escrever e otimizar consultas sem comprometer consistência
**Saída:** Explicar planos de consulta e garantir isolamento por usuário

- **C07-01 — Modelagem relacional** (45 min): Representar entidades, cardinalidade e regras de integridade Prática: Desenhe ER de produtos, pedidos, clientes e pagamentos fictícios. [Material](https://www.postgresql.org/docs/current/tutorial.html).
- **C07-02 — SQL: consultas e JOINs** (45 min): Compor joins, filtros e agregações sem depender de ORM Prática: Escreva 10 queries para responder perguntas do negócio. [Material](https://www.postgresql.org/docs/current/tutorial.html).
- **C07-03 — Chaves, constraints e normalização** (45 min): Prevenir inconsistência e redundância de dados Prática: Introduza PK, FK, CHECK, UNIQUE e justifique cada uma. [Material](https://www.postgresql.org/docs/current/tutorial.html).
- **C07-04 — Transações e índices** (45 min): Compreender ACID, concorrência e desempenho Prática: Simule atualização concorrente e examine plano de consulta. [Material](https://www.postgresql.org/docs/current/tutorial.html).
- **C07-05 — PostgreSQL e RLS** (45 min): Restringir leitura/escrita por proprietário autenticado Prática: Crie políticas de isolamento e teste com dois usuários. [Material](https://www.postgresql.org/docs/current/tutorial.html).
- **C07-06 — Migrações, dados de teste e rollback** (45 min): Versionar alterações mantendo integridade Prática: Crie migração reversível e teste em banco descartável. [Material](https://www.postgresql.org/docs/current/tutorial.html).
- **C07-07 — Conexões, pools e transações** (45 min): Investigar gargalos e falhas de conexão Prática: Simule conexões concorrentes e explique escolha do pool. [Material](https://www.postgresql.org/docs/current/tutorial.html).
- **C07-08 — Segurança de consultas e dados** (45 min): Evitar SQL injection, segredo exposto e privilégio excessivo Prática: Refatore SQL concatenado para consultas parametrizadas. [Material](https://www.postgresql.org/docs/current/tutorial.html).
- **C07-09 — Desafio de saída 07 — PostgreSQL confiável** (60 min): Modelar e demonstrar acesso e consistência Prática: Entregue schema, queries, testes de RLS e explicação de índices. [Material](https://www.postgresql.org/docs/current/tutorial.html).

### 08 — Frontend React e aplicação ponta a ponta

**Meta:** Ler componentes e conectar interface, API e persistência de dados
**Saída:** Entregar tela integrada com tratamento de estados e testes

- **C08-01 — React: componentes e props** (45 min): Ler fluxo de props, composição e renderização Prática: Explique árvore de componentes e altere prop recebida. [Material](https://react.dev/learn).
- **C08-02 — Estado, eventos e formulários** (45 min): Prever renderização e atualizações de estado Prática: Faça um formulário validado de cadastro de bicicleta. [Material](https://react.dev/learn).
- **C08-03 — React: efeitos e comunicação** (45 min): Usar efeitos apenas quando necessários Prática: Depure um efeito que produz renderização indevida. [Material](https://react.dev/learn).
- **C08-04 — Fetch, loading, erros e autenticação** (45 min): Tratar sucesso, latência e falhas de rede Prática: Crie listagem com estados vazio, erro e carregando. [Material](https://react.dev/learn).
- **C08-05 — Acessibilidade, responsividade e UX** (45 min): Aplicar semântica, teclado e feedback de erros Prática: Teste tela por teclado e ajuste leitura mobile. [Material](https://react.dev/learn).
- **C08-06 — Next.js: rotas e renderização** (45 min): Entender roteamento e fronteira cliente/servidor Prática: Explique ciclo de dados de uma página autenticada. [Material](https://react.dev/learn).
- **C08-07 — Testes de interface e ponta a ponta** (45 min): Cobrir fluxo do usuário sem testes frágeis Prática: Teste um fluxo de compra simulada e erros de formulário. [Material](https://react.dev/learn).
- **C08-08 — Desafio de saída 08 — Full Stack EZBikes** (60 min): Integrar componentes, API e PostgreSQL Prática: Demonstre CRUD, login, testes e explique fluxo de ponta a ponta. [Material](https://react.dev/learn).

### 09 — Arquitetura, containers, cloud e Kubernetes

**Meta:** Justificar decisões e operar uma aplicação implantada
**Saída:** Desenhar arquitetura escalável e explicar a recuperação de uma falha

- **C09-01 — Arquitetura de aplicações** (45 min): Comparar modularidade, acoplamento, coesão e trade-offs Prática: Desenhe monólito modular e explique quando NÃO criar microsserviços. [Material](https://docs.docker.com/get-started/).
- **C09-02 — Design de APIs e contratos** (45 min): Versionar endpoints e mapear falhas Prática: Revise contrato, status, idempotência e paginação. [Material](https://docs.docker.com/get-started/).
- **C09-03 — Docker e Compose** (45 min): Construir imagens reproduzíveis e minimizar superfície Prática: Containerize API+DB com healthcheck e usuário não root. [Material](https://docs.docker.com/get-started/).
- **C09-04 — CI/CD e deploy com rollback** (45 min): Desenhar pipeline build, test e deploy confiável Prática: Crie pipeline com testes e plano de rollback. [Material](https://docs.docker.com/get-started/).
- **C09-05 — Arquitetura cloud e escalabilidade** (45 min): Entender redes cloud, balanceamento e autoscaling Prática: Desenhe VPC, load balancer, serviços e banco gerenciado. [Material](https://docs.docker.com/get-started/).
- **C09-06 — Kubernetes: pods, Deployments e Services** (45 min): Identificar responsabilidades do plano de controle e workload Prática: Suba em kind, altere réplicas e analise service discovery. [Material](https://docs.docker.com/get-started/).
- **C09-07 — Kubernetes: ConfigMap, Secret e HPA** (45 min): Explicar configuração, segredo e escalabilidade Prática: Implante configuração e simule gatilho de escala em laboratório. [Material](https://docs.docker.com/get-started/).
- **C09-08 — Resiliência, filas e idempotência** (45 min): Planejar retry, timeout, backoff e dead-letter queue Prática: Projete processamento de pedidos que suporte reentrega. [Material](https://docs.docker.com/get-started/).
- **C09-09 — Custo, disponibilidade e segurança cloud** (45 min): Justificar trade-offs de disponibilidade e custo Prática: Compare duas arquiteturas e estimativa qualitativa de custos. [Material](https://docs.docker.com/get-started/).
- **C09-10 — Desafio de saída 09 — arquitetura implantada** (60 min): Operar stack e defender escolhas Prática: Desenhe, implante e faça review técnico de falha e rollback. [Material](https://docs.docker.com/get-started/).

### 10 — Observabilidade, SRE e engenharia de dados

**Meta:** Diagnosticar um sistema e medir qualidade sem depender de opinião
**Saída:** Instrumentar serviço, definir SLO e interpretar métricas/logs

- **C10-01 — Logs estruturados e correlação** (45 min): Interpretar logs JSON, trace_id e contexto Prática: Instrumente endpoints e encontre um erro usando trace_id. [Material](https://app.notion.com/p/41f487f0bca281d29dd2c51c12e4e131).
- **C10-02 — Métricas, Prometheus e PromQL** (45 min): Ler counters, gauges, histograms e consultas Prática: Construa consultas para RPS, taxa de falha e p95. [Material](https://app.notion.com/p/41f487f0bca281d29dd2c51c12e4e131).
- **C10-03 — Grafana e alertas** (45 min): Escolher painéis e alertas úteis Prática: Crie dashboard de Golden Signals e teste alerta. [Material](https://app.notion.com/p/41f487f0bca281d29dd2c51c12e4e131).
- **C10-04 — Traces distribuídos com OpenTelemetry** (45 min): Investigar latência entre componentes Prática: Registre trace da requisição API→banco e identifique gargalo. [Material](https://app.notion.com/p/41f487f0bca281d29dd2c51c12e4e131).
- **C10-05 — SLIs, SLOs e error budget** (45 min): Diferenciar medições, metas e compromissos Prática: Defina SLO 99,9% e calcule orçamento de erro com janela correta. [Material](https://app.notion.com/p/41f487f0bca281d29dd2c51c12e4e131).
- **C10-06 — Testes de carga e análise de saturação** (45 min): Medir latência, erros e limites de recursos Prática: Rode teste k6 em ambiente local e explique saturação. [Material](https://app.notion.com/p/41f487f0bca281d29dd2c51c12e4e131).
- **C10-07 — Engenharia de dados: ETL, pipelines e camadas** (45 min): Compreender Bronze/Silver/Gold e idempotência Prática: Modele pipeline de CNPJ com dados fictícios e checagens. [Material](https://app.notion.com/p/41f487f0bca281d29dd2c51c12e4e131).
- **C10-08 — Qualidade de dados e observabilidade de pipelines** (45 min): Detectar atraso, falha e inconsistência Prática: Adicione métricas de freshness, linhas inválidas e retries. [Material](https://app.notion.com/p/41f487f0bca281d29dd2c51c12e4e131).
- **C10-09 — Desafio de saída 10 — ObservaLab** (60 min): Instrumentar e explicar um incidente Prática: Demonstre dashboards, SLO, causa raiz e correção medida. [Material](https://app.notion.com/p/41f487f0bca281d29dd2c51c12e4e131).

### 11 — Fundamentos de segurança e raciocínio ofensivo/defensivo

**Meta:** Descrever superfícies de ataque, identidades, riscos e mitigações
**Saída:** Criar modelo de ameaças verificável de uma aplicação

- **C11-01 — Ética, autorização e escopo de testes** (45 min): Definir alvos autorizados e limites do laboratório Prática: Documente escopo para app própria e critério de encerramento. [Material](https://www.nist.gov/cyberframework).
- **C11-02 — Confidencialidade, integridade e disponibilidade** (45 min): Relacionar objetivos de segurança aos riscos de negócio Prática: Classifique 8 cenários pelo objetivo afetado. [Material](https://www.nist.gov/cyberframework).
- **C11-03 — Fundamentos de criptografia e hashing** (45 min): Diferenciar cifra, hash, assinatura, salt e KDF Prática: Explique proteção de senha e segredo em repouso e trânsito. [Material](https://www.nist.gov/cyberframework).
- **C11-04 — Identidade, autenticação, MFA e sessões** (45 min): Avaliar autenticação e risco de roubo de sessão Prática: Desenhe login, renovação e logout e suas ameaças. [Material](https://www.nist.gov/cyberframework).
- **C11-05 — Redes e defesa: segmentação, firewalls e logs** (45 min): Interpretar controles de rede e exposição Prática: Desenhe zonas de confiança e identifique caminhos indevidos. [Material](https://www.nist.gov/cyberframework).
- **C11-06 — Ameaças, STRIDE e análise de risco** (45 min): Classificar ameaças e associar controles Prática: Faça STRIDE sobre fluxo login→API→Postgres. [Material](https://www.nist.gov/cyberframework).
- **C11-07 — Vulnerabilidades, CVSS e EPSS** (45 min): Distinguir severidade de probabilidade de exploração Prática: Priorize correções em 5 achados hipotéticos com justificativa. [Material](https://www.nist.gov/cyberframework).
- **C11-08 — OWASP Top 10:2025 — visão geral** (45 min): Identificar categorias e falhas fundamentais Prática: Mapeie 10 categorias para medidas preventivas no EZBikes. [Material](https://www.nist.gov/cyberframework).
- **C11-09 — Desafio de saída 11 — threat model** (60 min): Justificar 5 riscos, mitigação e teste Prática: Entregue DFD, STRIDE, classificação e backlog de remediações. [Material](https://www.nist.gov/cyberframework).

### 12 — AppSec e segurança de aplicações web

**Meta:** Reconhecer vulnerabilidades, prevenir e validar correções em laboratório
**Saída:** Completar laboratórios autorizados e produzir testes de regressão

- **C12-01 — Broken Access Control e IDOR** (45 min): Distinguir autenticação de autorização por recurso Prática: Resolva laboratório autorizado e escreva teste de acesso cruzado. [Material](https://portswigger.net/web-security/learning-paths).
- **C12-02 — SQL injection e consultas seguras** (45 min): Identificar entrada não confiável em consultas Prática: Reproduza em laboratório e corrija com parametrização. [Material](https://portswigger.net/web-security/learning-paths).
- **C12-03 — XSS e contextos de saída** (45 min): Explicar escape contextual e CSP Prática: Resolva laboratório de XSS e aplique encoding adequado. [Material](https://portswigger.net/web-security/learning-paths).
- **C12-04 — CSRF, cookies e SameSite** (45 min): Distinguir pedido autenticado de intenção do usuário Prática: Avalie proteção CSRF em app local e teste regressão. [Material](https://portswigger.net/web-security/learning-paths).
- **C12-05 — SSRF e destinos de rede** (45 min): Analisar acesso servidor→URL em laboratório Prática: Implemente allowlist de destinos e teste bloqueios. [Material](https://portswigger.net/web-security/learning-paths).
- **C12-06 — Path traversal e upload seguro** (45 min): Validar caminhos e uploads sem confiar no cliente Prática: Proteja rota de download e arquivo em ambiente controlado. [Material](https://portswigger.net/web-security/learning-paths).
- **C12-07 — Authentication flaws e gestão de sessão** (45 min): Identificar falhas de login, reset e rotação Prática: Teste fluxos inválidos e implemente limite de tentativas. [Material](https://portswigger.net/web-security/learning-paths).
- **C12-08 — Validação, serialização e injeção de comando** (45 min): Mapear dados externos até operações perigosas Prática: Refatore execução de comando insegura para API segura. [Material](https://portswigger.net/web-security/learning-paths).
- **C12-09 — API Security e rate limiting** (45 min): Analisar BOLA, função, recursos e schemas Prática: Revise endpoints com testes negativos e proteção de abuso. [Material](https://portswigger.net/web-security/learning-paths).
- **C12-10 — OWASP ASVS e code review seguro** (45 min): Traduzir requisitos em testes verificáveis Prática: Faça checklist de segurança de 2 endpoints e registre evidências. [Material](https://portswigger.net/web-security/learning-paths).
- **C12-11 — Burp Suite: proxy e repeater em laboratório** (45 min): Interpretar requisições HTTP, cookies e respostas Prática: Interceptar apenas a app local/labs autorizados e documentar achados. [Material](https://portswigger.net/web-security/learning-paths).
- **C12-12 — Desafio de saída 12 — revisão segura de API** (60 min): Encontrar e corrigir problemas com testes Prática: Escreva relatório curto de vulnerabilidade, correção e teste preventivo. [Material](https://portswigger.net/web-security/learning-paths).

### 13 — DevSecOps, IAM, cloud security e hardening

**Meta:** Integrar segurança ao ciclo de entrega e à infraestrutura
**Saída:** Demonstrar pipeline seguro e cloud com menor privilégio

- **C13-01 — SSDLC, shift-left e security champions** (45 min): Integrar controles ao planejamento e review Prática: Desenhe critérios de segurança por fase do pipeline. [Material](https://cheatsheetseries.owasp.org/).
- **C13-02 — SAST, DAST, SCA e SBOM** (45 min): Distinguir análise de código, app e dependências Prática: Configure scanners em app de laboratório e revise falsos positivos. [Material](https://cheatsheetseries.owasp.org/).
- **C13-03 — Software supply chain e dependências** (45 min): Identificar typosquatting, dependency confusion e versões Prática: Revise lockfile e gere inventário de dependências. [Material](https://cheatsheetseries.owasp.org/).
- **C13-04 — Secrets management e rotação** (45 min): Evitar segredos em repositório, logs e CI Prática: Substitua token hardcoded por variável/secret seguro. [Material](https://cheatsheetseries.owasp.org/).
- **C13-05 — GitHub Actions e pipeline seguro** (45 min): Aplicar mínimo privilégio e approvals Prática: Crie pipeline de testes, SCA, SAST e artifacts com permissões mínimas. [Material](https://cheatsheetseries.owasp.org/).
- **C13-06 — IAM, OAuth2/OIDC e LGPD** (45 min): Relacionar identidade, escopos e proteção de dados Prática: Revise desenho de login, roles, consentimento e retenção. [Material](https://cheatsheetseries.owasp.org/).
- **C13-07 — Hardening Linux, Docker e Kubernetes** (45 min): Reduzir privilégios, recursos expostos e capabilities Prática: Aplique usuário não root, read-only rootfs e NetworkPolicy em lab. [Material](https://cheatsheetseries.owasp.org/).
- **C13-08 — Cloud Security: IAM, redes e auditoria** (45 min): Inspecionar políticas e separação de responsabilidades Prática: Proponha política IAM mínima e log de auditoria. [Material](https://cheatsheetseries.owasp.org/).
- **C13-09 — Resiliência e resposta a incidentes** (45 min): Criar playbook, detecção, contenção e recuperação Prática: Execute tabletop de vazamento fictício e registre decisões. [Material](https://cheatsheetseries.owasp.org/).
- **C13-10 — Desafio de saída 13 — pipeline seguro** (60 min): Garantir gates automáticos e mitigação rastreável Prática: Demonstre PR bloqueada por falha e corrigida com evidências. [Material](https://cheatsheetseries.owasp.org/).

### 14 — Pentest autorizado, resposta a incidentes e segurança de IA

**Meta:** Consolidar fundamentos de AppSec e compreender testes em ambiente autorizado
**Saída:** Produzir relatório técnico e capstone seguro, sem atacar sistemas externos

- **C14-01 — PortSwigger Academy — trilha inicial** (45 min): Executar labs guiados de HTTP, autenticação e controle de acesso Prática: Complete labs Apprentice em ambiente autorizado com notas. [Material](https://portswigger.net/web-security/learning-paths).
- **C14-02 — Metodologia de avaliação e escopo** (45 min): Separar descoberta, validação e comunicação responsável Prática: Escreva autorização, escopo e critérios antes do teste. [Material](https://portswigger.net/web-security/learning-paths).
- **C14-03 — Reconhecimento passivo e mapeamento em laboratório** (45 min): Identificar pontos de entrada de uma app própria Prática: Mapeie rotas e dependências da EZBikes local. [Material](https://portswigger.net/web-security/learning-paths).
- **C14-04 — Testes de autorização e lógica de negócio** (45 min): Explorar somente laboratório próprio ou intencional Prática: Investigue controles por usuário e proponha testes de regressão. [Material](https://portswigger.net/web-security/learning-paths).
- **C14-05 — Mitigação, reteste e relatório técnico** (45 min): Traduzir falhas em risco e ações de correção Prática: Gere achados com impacto, evidência, fix e reteste. [Material](https://portswigger.net/web-security/learning-paths).
- **C14-06 — Análise de logs e detecção** (45 min): Distinguir eventos normais de indicadores de incidente Prática: Correlacione eventos suspeitos gerados em laboratório. [Material](https://portswigger.net/web-security/learning-paths).
- **C14-07 — Segurança de APIs de IA e prompt injection** (45 min): Reconhecer entrada não confiável e fronteiras de confiança Prática: Modele prompt injection em app RAG de testes sem dados reais. [Material](https://portswigger.net/web-security/learning-paths).
- **C14-08 — RAG seguro e proteção de dados** (45 min): Entender permissões no retrieval, PII e exfiltração Prática: Implemente filtro de acesso por documento e teste bypass. [Material](https://portswigger.net/web-security/learning-paths).
- **C14-09 — Projeto final — EZBikes Secure** (45 min): Unir JS, API, banco, infraestrutura, observabilidade e segurança Prática: Entregue solução com PR, dashboard, threat model e testes autorizados. [Material](https://portswigger.net/web-security/learning-paths).
- **C14-10 — Desafio de saída 14 — revisão arquitetural** (60 min): Ler, explicar e defender decisões em solução desconhecida Prática: Explique 90% dos critérios de leitura em amostra definida e corrija um bug sem IA. [Material](https://portswigger.net/web-security/learning-paths).

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
- **IA generativa e LLMs** — Revisar tokens, inferência, limitações, API e casos de uso. [Fonte](https://app.notion.com/p/418487f0bca281f49fb0d174e9d01bc3).
- **RAG e bancos vetoriais** — Diferenciar embeddings, busca, chunking e avaliação de retrieval. [Fonte](https://app.notion.com/p/418487f0bca281f49fb0d174e9d01bc3).
- **LLMOps e ciclo de vida — aula 20/02** — Trabalhar avaliação, custo, tracing, versionamento de prompt e drift. [Fonte](https://app.notion.com/p/418487f0bca281f49fb0d174e9d01bc3).
- **Projeto Aplicado II — integração IA — aula 06/03** — Integrar componentes IA em uma aplicação escalável. [Fonte](https://app.notion.com/p/418487f0bca281f49fb0d174e9d01bc3).
- **DevSecOps e segurança em pipelines — aula 20/03** — Revisar SSDLC, SAST, SCA, SBOM, DAST e CI segura. [Fonte](https://app.notion.com/p/418487f0bca281f49fb0d174e9d01bc3).
- **Gestão de identidade, autenticação e LGPD — aula 10/04** — Distinguir autenticação, autorização, IAM e proteção de dados. [Fonte](https://app.notion.com/p/418487f0bca281f49fb0d174e9d01bc3).
- **Segurança em cloud e resiliência — aula 24/04** — Identificar riscos em rede, IAM, logs, alta disponibilidade e backup. [Fonte](https://app.notion.com/p/418487f0bca281f49fb0d174e9d01bc3).
- **Segurança de sistemas de IA — aula 08/05** — Trabalhar prompt injection, vazamento de contexto e segurança de retrieval. [Fonte](https://app.notion.com/p/418487f0bca281f49fb0d174e9d01bc3).
- **Projeto Aplicado III — hardening e arquitetura segura — aula 22/05** — Planejar padrões de arquitetura segura e evidências de hardening. [Fonte](https://app.notion.com/p/418487f0bca281f49fb0d174e9d01bc3).
- **Seminário final — projeto arquitetural escalável — aula 12/06** — Apresentar trade-offs, confiabilidade, custo e proteção de dados. [Fonte](https://app.notion.com/p/418487f0bca281f49fb0d174e9d01bc3).

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

1. **EZBikes JavaScript:** funções de busca, filtro, estoque e validação, sem infraestrutura.
2. **EZBikes Full Stack:** API Node/TypeScript, PostgreSQL, autenticação por usuário e frontend React.
3. **EZBikes Cloud:** Docker, CI/CD, implantação, observabilidade e decisões de arquitetura.
4. **ObservaLab:** métricas, logs, traces, SLI/SLO, testes de carga e relatório de incidente.
5. **EZBikes Secure:** STRIDE, OWASP ASVS, testes de segurança em ambiente próprio, CI seguro, hardening e relatório final.

## Prioridades e lógica do painel diário

1. Prazos reais que ocorrerão em até 14 dias (até 1 sessão em orçamentos < 75 min; até 2 em sessões maiores).
2. Revisões vencidas, mesmo de assuntos concluídos.
3. Assuntos em andamento.
4. Pós-graduação em paralelo às terças, quintas e sábados quando houver tempo e não houver uma entrega da pós já selecionada.
5. O primeiro assunto da etapa principal cujo pré-requisito foi concluído.

**Pré-requisitos:** os tópicos de cada etapa podem ser estudados em ordem flexível; para realizar o desafio final da etapa, todos os outros tópicos da mesma etapa devem estar concluídos. A etapa seguinte se libera quando o desafio final da etapa anterior for marcado como concluído. A pós não é bloqueada por essas portas.

## Como acompanhar a leitura de código

Faça um teste com 10 critérios: entradas/saídas (2), fluxo de execução (2), valores e efeitos (2), justificativa de decisões (2), alteração correta (2). Repita em códigos novos de dificuldade semelhante a cada 2–4 semanas. A meta de 90% significa 9/10 nesse conjunto controlado, não 90% de qualquer código existente.

## Segurança de uso e escopo

Todos os exercícios ofensivos devem ocorrer apenas em laboratórios expressamente autorizados, PortSwigger Academy ou sistemas próprios. Nunca testar terceiros, produção ou ambientes de trabalho sem aprovação explícita.

## Referências e notas de proveniência

- [Notion — central da pós](https://app.notion.com/p/418487f0bca281f49fb0d174e9d01bc3)
- [Notion — entregas](https://app.notion.com/p/418487f0bca281b8a1afd6daf2bb00ae)
- [Notion — Observabilidade / SRE](https://app.notion.com/p/41f487f0bca281d29dd2c51c12e4e131)
- [Notion — AppSec](https://app.notion.com/p/407487f0bca2808dae5ac39a89942192)
- [OWASP Top 10 2025](https://top10.owasp.org/2025/)
- [PortSwigger — Learning Paths](https://portswigger.net/web-security/learning-paths)
- [NIST CSF](https://www.nist.gov/cyberframework)

O currículo, exercícios e avaliações são propostas elaboradas para a plataforma. As datas e conteúdos explicitamente rotulados como aula ou trabalho são provenientes das páginas consultadas no Notion; algumas rubricas oficiais ainda precisam de conferência.
