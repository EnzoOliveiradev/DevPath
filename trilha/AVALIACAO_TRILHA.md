# Avaliação da trilha DevPath 2.0 → 2.1

> 22/11/2026. Análise da trilha da pasta `trilha/` (2.0, 152 itens) e da [BibliotecaDev](https://github.com/EnzoOliveiradev/BibliotecaDev) (109 PDFs). Os arquivos originais estão em `arquivo/v2.0/`. A versão revisada está em `devpath-trilha.json`, que é a fonte usada pela plataforma; o `TRILHA_COMPLETA.md` e o CSV são gerados a partir dele.

## Veredito

A trilha é boa e coerente com o objetivo: começa pela leitura de código, chega ao Full Stack e termina em segurança. Os portões de saída por etapa, o PRIMM e a pós em paralelo com prazos reais são os pontos mais fortes. Os problemas encontrados são de **ordem** (conteúdos usados antes de serem ensinados), **lacunas** (HTML/CSS, POO, ambiente de desenvolvimento, testes e Git no início) e **detalhes de execução** (links genéricos e estimativas de projetos). Nenhum exige reescrever a trilha; a 2.1 corrige tudo isso mantendo 100% dos 152 itens da 2.0.

## Pontos fortes

- **Progressão clara**, com meta e critério de saída verificável em cada etapa.
- **Desafio de saída** como portão: impede avançar só por "ter visto" o conteúdo.
- **Projetos de portfólio contínuos** (EZBikes) que acumulam de uma etapa para outra.
- **Pós em paralelo** com prazos reais separados das datas de aula, o que evita confundir aula com entrega.
- **Escopo ético explícito** nas etapas de segurança.

## Problemas encontrados e o que mudou

### 1. Conteúdos usados antes de serem ensinados

| Problema na 2.0 | Mudança na 2.1 |
|---|---|
| A etapa 01 pede para "verificar no Node" e "comparar com o debugger", mas não ensina a configurar o ambiente. | Novo **C01-01 Ambiente de estudo: VS Code, terminal e Node.js**. |
| O diagnóstico inicial (baseline) vinha no 9º item, depois de estudar a etapa. Assim ele não mede o ponto de partida. | Virou **C01-02**, logo no início. O desafio de saída mede a evolução em relação a ele. |
| A tabela de execução e os operadores booleanos vinham depois de condicionais e laços, que dependem deles. | Ordem: variáveis → tabela de execução → booleanos → condicionais → funções. |
| **Testes automatizados** só apareciam na etapa 04, mas os mini projetos das etapas 02 e 03 já pedem testes. | Movido para a etapa 02 (**C02-09**, era C04-07). |
| **Git** só aparecia na etapa 05, mas o EZBikes começa na 02. | Novo **C02-10 Git essencial**; o antigo C05-03 virou "Git em equipe: merge, conflitos e revisão". |
| `map/filter/reduce` vinha antes de funções e arrow functions, que são pré-requisito dele. | Funções vêm antes de map/filter/reduce. |
| Backend (CRUD, testes de integração com banco) vinha **antes** de SQL e modelagem. | Etapas trocadas: **06 Dados** e depois **07 Backend**. "Conexões e pools" passou para o backend, onde existe uma API para conectar. |
| Burp Suite e a introdução à PortSwigger Academy vinham no fim (etapa 14), mas os labs da etapa 12 dependem deles. | Os dois abrem a etapa 12. |
| Detecção vinha depois da resposta a incidentes. | "Análise de logs e detecção" passou para a etapa 13, antes de "Resposta a incidentes". |
| Debugging com breakpoints ficava no meio da etapa 03. | Abre a etapa 03, para ser usado em todo o resto. |

### 2. Lacunas de conteúdo

Oito conteúdos novos, todos ligados ao EZBikes:

- **C01-01** Ambiente de estudo (VS Code, terminal, Node, breakpoint).
- **C02-10** Git essencial.
- **C03-04** Classes, protótipos e POO em JavaScript. A 2.0 não tinha POO, que é base para padrões de projeto e para ler código de backend.
- **C06-08** NoSQL: quando usar *(opcional)*. Conecta com a disciplina de Engenharia de Dados em Larga Escala.
- **C07-10** SOLID e padrões de projeto essenciais, antes de "Arquitetura por camadas".
- **C08-01** HTML semântico, CSS e DOM. A 2.0 começava o frontend direto no React.
- **C09-02** Modelagem de domínio — DDD essencial *(opcional)*.
- **C10-01** Estatística para engenharia: médias e percentis. Sem isso, p95, histogramas e SLO ficam decorados, não entendidos.

Conteúdos **opcionais** não bloqueiam o desafio de saída.

### 3. Execução e manutenção

- **Links de material genéricos:** na 2.0, todos os itens de uma etapa apontavam para a mesma página (por exemplo, a etapa 01 inteira para o Guia de JavaScript do MDN). Na 2.1, 104 conteúdos têm link específico, todos conferidos e respondendo HTTP 200 em 22/11/2026.
- **Estimativas:** os mini projetos passaram de 30 para 45 min por sessão, e o projeto final de 45 para 60 min, marcado como "várias sessões". Os minutos continuam sendo de uma sessão, não do total.
- **IDs:** a 2.1 renumera uma única vez para que o ID reflita a posição (C02-09 é o 9º item da etapa 02). A partir de agora, **os IDs são estáveis**: a plataforma sincroniza o progresso por eles. Para reordenar no futuro, mude a ordem em `topic_ids`, nunca o ID. A tabela `legacy_id_map` do JSON e as marcações "era Cxx-yy" no Markdown fazem a correspondência com a 2.0.
- **Pós:** os tópicos com aula marcada ganharam `class_on`. O painel usa essa data para escolher qual tópico da pós estudar nas terças, quintas e sábados.

### 4. Sobreposições mantidas de propósito

Alguns assuntos voltam em mais de um ponto, com mais profundidade a cada vez (ensino em espiral). Mantive essas sobreposições, mas vale saber onde estão:

- Variáveis/operadores (C01-04 → C02-01).
- Funções e callbacks (C01-08 → C02-03 → C03-02).
- Coleções (C02-06 → C04-05).
- Event loop (C03-08 → C07-02).
- Autenticação (C07-07 → C11-04 → C12-09).
- Observabilidade (C10 ↔ P04–P06 da pós).

Na pós, estudar P04–P06 adianta a etapa 10.

## Livros da semana e a BibliotecaDev

**Como funciona:** cada etapa tem de 3 a 8 "semanas de leitura", cada uma com um livro, um foco do que ler e os conteúdos relacionados. A ideia é ler cerca de 20 min por dia, 5 dias por semana. O painel mostra como **livro da semana** a primeira leitura não concluída da etapa atual. Em paralelo, sugere uma **leitura leve** de carreira, em rodízio semanal. Todos os PDFs citados (58) foram conferidos no repositório.

**Correlação:** a BibliotecaDev cobre bem algoritmos (*Entendendo Algoritmos*), código e design (*Código Limpo*, *Refatoração*, *Arquitetura Limpa*, *Código Legado*), testes, Git, Linux, redes/web (*Desconstruindo a Web*), Node/REST/TypeScript, frontend, Docker/Kubernetes/CI-CD e carreira.

**Lacunas da biblioteca:** são justamente nos eixos centrais da sua meta. Para cada uma, a trilha indica um complemento **gratuito e legal**:

| Área | Situação na BibliotecaDev | Complemento usado na trilha |
|---|---|---|
| JavaScript como linguagem | Nenhum livro | Eloquent JavaScript; You Don't Know JS Yet |
| SQL e PostgreSQL | Só NoSQL/MongoDB | Tutorial oficial do PostgreSQL; Use The Index, Luke! |
| Observabilidade/SRE | Nenhum livro | Site Reliability Engineering (Google) |
| Segurança de aplicações | Nenhum livro (só OAuth com Spring e AWS Security) | PortSwigger Academy; OWASP Top 10, WSTG, ASVS e Cheat Sheets |
| IA/LLM | Nenhum livro | OWASP Top 10 para LLM |

Candidatos para adquirir: *Alice and Bob Learn Application Security* (Tanya Janca), *Threat Modeling: Designing for Security* (Adam Shostack), *Hacking APIs* (Corey Ball) e *Designing Data-Intensive Applications* (Martin Kleppmann).

**Observações sobre a biblioteca:**

- Alguns nomes de arquivo trazem autoria imprecisa. *Domain Driven Design Rápido* é de Abel Avram e Floyd Marinescu (InfoQ), não de Eric Evans; *Estatística — o que é, para que serve* é de Charles Wheelan. A trilha exibe a autoria corrigida.
- Os livros de certificação AWS (Cloud Practitioner, Security Specialty) entram só como consulta. Se quiser uma certificação, o melhor momento é logo após a etapa 09 (Cloud Practitioner) e a 13 (Security Specialty).
- O DevPath apenas aponta para os PDFs do seu repositório; nenhum arquivo é copiado para a plataforma.

## Números

| | 2.0 | 2.1 |
|---|---:|---:|
| Etapas | 14 | 14 |
| Conteúdos principais (com desafios) | 136 | 144 |
| Tópicos da pós | 16 | 16 |
| Horas de sessões base | 94,5 | 100,3 |
| Links de material específicos | — | 104 |
| Semanas de leitura | — | 63 + 10 da pós |
