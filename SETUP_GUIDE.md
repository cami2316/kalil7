# Guia de Configuração do Portal de Parceiros - Kalil 7 Services

Este documento fornece instruções passo a passo para configurar o banco de dados gratuito no Supabase e o envio de emails via Gmail para o portal de parceiros.

## 1. Configuração do Banco de Dados (Supabase)

### Passo 1: Criar Conta no Supabase
1. Acesse [supabase.com](https://supabase.com).
2. Clique em "Start your project" e crie uma conta gratuita (use email e senha).
3. Verifique seu email para confirmar a conta.

### Passo 2: Criar um Novo Projeto
1. No painel do Supabase, clique em "New project".
2. Preencha os detalhes:
   - **Name**: kalil7-portal (ou nome similar).
   - **Database Password**: Escolha uma senha forte (anote-a).
   - **Region**: Selecione uma região próxima (ex.: East US).
3. Clique em "Create new project". Aguarde alguns minutos para a criação.

### Passo 3: Obter a String de Conexão
1. No painel do projeto, vá para "Settings" > "Database".
2. Copie a "Connection string" (URI) que começa com `postgresql://`.
3. Substitua `[YOUR-PASSWORD]` pela senha escolhida no Passo 2.
4. No arquivo `prisma/schema.prisma` do projeto, substitua a linha `url = "file:./dev.db"` pela string copiada (ex.: `url = "postgresql://postgres:[SENHA]@db.[PROJETO-ID].supabase.co:5432/postgres"`).

### Passo 4: Executar Migrações
1. No terminal, execute: `npx prisma migrate dev --name init`.
2. Isso criará as tabelas no Supabase.
### Passo 5: Executar Seed para Usuários Iniciais
1. No terminal: `npm run seed`.
2. Isso criará 4 usuários iniciais com senhas padrão.
## 2. Configuração do Envio de Emails (Gmail)

### Passo 1: Ativar Autenticação de Dois Fatores no Gmail
1. Acesse [myaccount.google.com](https://myaccount.google.com).
2. Vá para "Segurança" > "Verificação em duas etapas".
3. Ative a verificação e siga os passos.

### Passo 2: Gerar Senha de App
1. Ainda em "Segurança", role para baixo e clique em "Senhas de app".
2. Selecione "Mail" e "Outro (nome personalizado)", digite "Kalil7 Portal".
3. Gere a senha (16 caracteres) e anote-a (ex.: abcd efgh ijkl mnop).

### Passo 3: Configurar no Projeto
1. No arquivo `.env.local` (crie se não existir), adicione:
   ```
   EMAIL_USER=seu-email@gmail.com
   EMAIL_PASS=abcd efgh ijkl mnop  # Senha de app gerada
   NEXTAUTH_SECRET=uma-chave-secreta-aleatoria  # Gere uma chave aleatória
   NEXTAUTH_URL=http://localhost:3000  # Para desenvolvimento
   ```
2. Substitua `seu-email@gmail.com` pelo seu Gmail.

## 3. Configuração Inicial do Portal

### Passo 1: Executar o Projeto
1. No terminal: `npm run dev`.
2. Acesse http://localhost:3000.

### Passo 2: Criar Usuários Iniciais
- O portal criará automaticamente 4 usuários iniciais com emails e senhas padrão (veja o código em `lib/seed.ts`).
- Para acessar: Use os emails listados no console após a primeira execução.

### Passo 3: Testar Funcionalidades
- Faça login como um parceiro.
- Adicione uma agenda, emita uma invoice (será enviada por email), e salve dados de contractors/clientes.

## Notas Importantes
- O Supabase é gratuito até 500MB de dados e 50MB de bandwidth mensal.
- Monitore o uso no painel do Supabase para evitar exceder limites.
- Para produção, configure `NEXTAUTH_URL` com o domínio real.
- Se houver erros, verifique os logs no terminal e no painel do Supabase.

Para dúvidas, consulte a documentação do Supabase e NextAuth.