# DevPath — sistema pessoal de estudos

MVP real em **Next.js 16 + TypeScript + Supabase** pronto para publicação na **Vercel**.

## O que já funciona

- Cadastro e login com e-mail/senha pelo Supabase Auth.
- **Trilha 2.1** (`trilha/devpath-trilha.json`): 14 etapas da lógica à cibersegurança, 144 conteúdos (com 14 desafios de saída) e 16 tópicos da pós, sincronizados automaticamente com a conta do usuário. A avaliação que originou a 2.1 está em `trilha/AVALIACAO_TRILHA.md`.
- Painel diário que prioriza **entregas em até 14 dias**, **revisões vencidas**, assuntos em andamento, a **pós às terças, quintas e sábados** (aula mais próxima primeiro) e o próximo conteúdo **liberado** da trilha, com orçamento diário ajustável de **30, 60 ou 90 minutos** (uma entrega urgente pode ultrapassá-lo).
- Registro de sessões por assunto, tempo efetivo, tipo (aprendizado/prática/revisão), memória de 0 a 5, nível de ajuda de 0 a 3 e observações.
- Próxima revisão calculada a partir da memória: 0–2 → 1 dia, 3 → 3 dias, 4 → 7 dias, 5 → 14 dias.
- Marcação de conteúdo como concluído/reaberto, inclusão de novos assuntos, busca por trilha, histórico e estatísticas.
- Layout responsivo para celular e desktop.
- Banco PostgreSQL com **Row Level Security**: cada usuário acessa somente seus próprios dados.

### Novo na v2 — sessão guiada

- Disponível para 8 assuntos de Fundamentos e JavaScript (botão **Sessão guiada** no painel e nas trilhas). Os demais continuam com o registro manual.
- Cada sessão apresenta os conceitos-chave e 5 exercícios no método PRIMM: **prever** a saída de um código (múltipla escolha) e **executá-lo** para conferir, **recuperar** um conceito, **investigar** explicando um trecho com suas palavras e depois comparando com uma resposta de referência, e **modificar/criar** código que é testado automaticamente.
- O código roda no navegador, em um Web Worker isolado da página, com limite de 2 s para interromper laços infinitos.
- A **nota de memória** (0–5) passa a ser calculada pelos acertos; o **nível de ajuda** (0–3) pelas dicas usadas e pelas soluções vistas. A próxima revisão usa essa nota.
- Cada resposta é salva em `exercise_attempts`; a aba Evolução mostra o **acerto nos exercícios** ao lado da memória média.
- Os gabaritos são verificados por testes: o código de cada "Prever" é executado e comparado à alternativa correta, e cada solução de referência precisa passar nos testes do exercício.

### Novo na v3 — trilha por etapas e livros da semana

- **Portões de progresso:** os conteúdos de uma etapa podem ser feitos em qualquer ordem. O desafio de saída é liberado quando os obrigatórios da etapa terminam, e a etapa seguinte quando o desafio é concluído. Conteúdos opcionais e a pós não bloqueiam nada.
- **Aba Trilha:** mapa das 14 etapas, meta e critério de saída de cada uma, prática sugerida, material específico e livros relacionados em cada conteúdo. Há filtros por etapa, área e busca por código.
- **Livros da semana (aba Biblioteca e painel):** 63 semanas de leitura ligadas às etapas, com PDFs da [BibliotecaDev](https://github.com/EnzoOliveiradev/BibliotecaDev) e complementos gratuitos onde a biblioteca tem lacunas. O painel mostra a leitura atual e uma leitura leve de carreira em rodízio semanal. O progresso fica em `reading_progress`.
- **Sincronização:** ao entrar, o app cria ou atualiza os itens da trilha pelo ID (`code`) sem mexer em status e revisões. Assuntos antigos com o mesmo título são adotados e mantêm o histórico. Assuntos personalizados ficam fora das etapas e entram no plano quando têm prazo ou estão em andamento.
- **Leitor de PDF no app:** os livros da BibliotecaDev abrem dentro do DevPath (botão **Ler no app** ou clique no título). O PDF vem direto do GitHub (`raw.githubusercontent.com`, com CORS liberado) e é desenhado com PDF.js; nada é copiado para o projeto. Tem navegação por página, zoom e teclado (← → e Esc), e lembra a última página lida neste navegador.
- **You Don't Know JS em português:** os 6 livros da [tradução da comunidade](https://github.com/nao-sabemos-js/You-Dont-Know-JS) entram nas etapas 01, 02, 03 e 07, com os capítulos indicados em cada semana de leitura. Eles abrem no GitHub: a tradução é CC BY-NC-ND 3.0 e seus termos proíbem disponibilizar o conteúdo fora de lá, então o DevPath só aponta para os capítulos.
- **Editar a trilha:** altere `trilha/devpath-trilha.json` e rode `npm run trilha:build` para regenerar `TRILHA_COMPLETA.md` e o CSV. Nunca mude o ID de um item; para reordenar, mude a ordem.

**Importante:** A agenda é uma heurística transparente de priorização, não um algoritmo cientificamente validado de repetição espaçada. Métricas dependem do autorrelato do usuário. Não há geração por IA, notificações push, nem integração automática com o calendário nesta versão.

## 1. Pré-requisitos

- Node.js 22+.
- Conta e projeto Supabase (pode ser plano gratuito, observando limites vigentes).
- GitHub e Vercel para hospedagem Git-driven.

## 2. Criar o banco de dados

1. Crie **um projeto novo** no [Supabase](https://supabase.com/dashboard).
2. Abra **SQL Editor**.
3. Cole e execute o arquivo `supabase/schema.sql` **uma única vez**.
4. Em **Authentication > Providers > Email**, habilite e-mail/senha. Em produção, mantenha confirmação de e-mail se apropriado.
5. Em **Project Settings / Connect / API Keys**, copie a URL do projeto e a **publishable key** (não a secret/service-role key).
6. Confira em **API / Data API** se `public.study_topics` e `public.study_sessions` são expostas para o papel `authenticated`. As permissões e políticas do SQL já restringem as linhas ao proprietário.

> Se quiser usar um projeto Supabase existente, faça backup e revise as tabelas/políticas antes de executar o SQL. Este arquivo foi pensado para um projeto novo; não é uma migração idempotente para upgrades de schema.

### 2.1 Atualização v2 — sessões guiadas

Depois do `schema.sql`, execute também `supabase/v2_guided_sessions.sql` no SQL Editor. Ele adiciona às sessões a origem (`manual`/`guided`) e a contagem de acertos, e cria a tabela `exercise_attempts` com RLS. Pode ser executado mais de uma vez. Sem ele, o app continua funcionando, mas não consegue salvar sessões guiadas.

### 2.2 Atualização v3 — trilha por etapas

Execute em seguida `supabase/v3_trilha.sql`. Ele adiciona aos assuntos os campos da trilha (`code`, `phase`, `kind`, pré-requisitos, prática, data de aula), a área "Cibersegurança", a chave de sincronização `unique (user_id, code)` e a tabela `reading_progress` com RLS. Pode ser executado mais de uma vez. Sem ele, o app mostra um aviso indicando o arquivo e continua com os assuntos já existentes.

## 3. Executar localmente

```bash
npm install
cp .env.example .env.local
# Edite .env.local com suas duas variáveis
npm run dev
```

Abra `http://localhost:3000` e crie sua conta. Se o Supabase exigir confirmação, verifique o e-mail antes de entrar.

**Variáveis públicas:**

```env
NEXT_PUBLIC_SUPABASE_URL=https://SEU_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_SUA_CHAVE
```

Não use `service_role`, chave secreta, senha de banco ou token pessoal em variáveis `NEXT_PUBLIC_`.

## 4. Deploy na Vercel

1. Crie um repositório privado no GitHub e envie os arquivos do projeto **sem** `.env.local`.
2. Vá a [vercel.com/new](https://vercel.com/new), importe o repositório.
3. Framework: **Next.js** (detecção automática).
4. Cadastre as duas variáveis de ambiente acima em Production/Preview, conforme a necessidade.
5. Acione **Deploy**. A Vercel fornece uma URL para a aplicação.
6. No Supabase Auth, configure **Site URL** e URLs de redirecionamento apropriadas para o domínio final, se usar confirmação de e-mail ou fluxos por link.
7. Verifique cadastro, login, gravação de sessão e acesso isolado entre duas contas de teste.

Não é necessário criar um servidor Node independente: frontend e lógica de apresentação rodam no Next.js, enquanto Auth e persistência usam o Supabase via SDK.

## 5. Testes

```bash
npm test
npm run typecheck
npm run build
```

Testes sem dependência de banco cobrem agendamento, intervalos, datas e checagens básicas de RLS; execute testes manuais no projeto Supabase para verificar políticas e autenticação. Os testes estruturais não são substitutos de auditoria de segurança.

## 6. Lógica do método de estudo

Cada sessão registra o esforço e o resultado. O estudante pratica:

1. **Predict**: prever o comportamento do trecho.
2. **Run**: executar para verificar.
3. **Investigate**: explicar o fluxo do código.
4. **Modify**: fazer alterações.
5. **Make**: implementar algo novo sem copiar.

Nas sessões guiadas, a plataforma corrige os exercícios e calcula memória e autonomia. Nas sessões registradas manualmente, esses indicadores continuam sendo informados pelo próprio usuário.

## 7. Próximas evoluções recomendadas

1. Sessões guiadas para mais conteúdos (hoje: 8 das etapas 01–03), começando pelo diagnóstico inicial (C01-02) e pelos desafios de saída.
2. Avaliação semanal padronizada e comparação de retenção independente.
3. Replanejamento de sessões em função dos resultados reais, e não apenas status.
4. Lembretes opt-in e integração com calendário/Notion da pós.

## 8. Observações de segurança

- As políticas RLS limitam select/insert/update/delete a `auth.uid() = user_id`.
- Inserções/atualizações de sessões verificam que o `topic_id` pertence ao usuário logado.
- O frontend usa somente a chave publicável.
- Em produção, considere limite de taxa, proteção contra abuso e logs mínimos.
- Para dados educacionais sensíveis e arquivos pessoais, realize análise de privacidade antes de ampliar recursos.

## Estrutura

```text
src/app/page.tsx              Aplicação, painel, histórico, evolução e formulários
src/app/trail-view.tsx        Aba Trilha (etapas, portões, livros por conteúdo)
src/app/library-view.tsx      Aba Biblioteca e card do livro da semana
src/app/pdf-reader.tsx        Leitor de PDF (PDF.js) para os livros da BibliotecaDev
src/app/guided-session.tsx    Sessão guiada PRIMM
src/app/globals.css, trail.css Estilo responsivo
src/lib/trail.ts              Trilha 2.1, sincronização e livros da semana
src/lib/planner.ts            Portões, prioridades, datas e revisões
src/lib/exercises.ts          Exercícios das sessões guiadas (por código da trilha)
src/lib/runner.ts             Execução isolada do código (Web Worker)
src/lib/supabase.ts           Cliente Supabase browser
trilha/devpath-trilha.json    Fonte da trilha (gera o .md e o .csv)
trilha/AVALIACAO_TRILHA.md    Avaliação da 2.0 e mudanças da 2.1
scripts/build-trilha.mjs      npm run trilha:build
supabase/*.sql                schema.sql → v2_guided_sessions.sql → v3_trilha.sql
tests/*.test.mjs              Regras, trilha, exercícios e SQL
```
