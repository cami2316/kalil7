# Configuração do .env.local - Instruções Passo a Passo

## 1. Configurar DATABASE_URL (Supabase)

Abra o arquivo `.env.local` na raiz do projeto e execute os passos:

### Passo 1: Obter a Senha do Supabase
1. No painel do Supabase, vá para **Settings** > **Database**
2. Você verá a seção "Connection string" com a URL que começar com `postgresql://`
3. A senha foi criada quando você gerou o projeto. Se não lembrar, pode resetá-la em **Settings** > **Database** > **Reset password**

### Passo 2: Substituir no .env.local
No arquivo `.env.local`, procure pela linha:
```
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.guwspkqevwvxrxyrmgtp.supabase.co:5432/postgres"
```

Substitua `[YOUR-PASSWORD]` pela sua senha real. Exemplo:
```
DATABASE_URL="postgresql://postgres:MinhaSeNha123@db.guwspkqevwvxrxyrmgtp.supabase.co:5432/postgres"
```

## 2. Gerar NEXTAUTH_SECRET

Execute este comando no terminal para gerar uma chave segura:
```bash
openssl rand -base64 32
```

Copie o resultado e substitua `sua-chave-secreta-aleatoria-aqui-min-32-caracteres` no arquivo `.env.local`.

Exemplo de resultado:
```
NEXTAUTH_SECRET="aBc123XyZ9LmN+oPqRsT/UvWxYz0AbCdEfGhIjKl=="
```

## 3. Configurar Email Gmail (Opcional por enquanto)

Você pode deixar os valores padrão ou configurar depois. Para agora, apenas certifique-se que as linhas existem:
```
EMAIL_USER="seu-email@gmail.com"
EMAIL_PASS="senha-de-app-do-gmail-aqui"
```

## 4. Próximos Passos

Após preencher o `.env.local`:

1. Salve o arquivo
2. Execute no terminal:
   ```bash
   npx prisma migrate dev --name init
   ```
   Isso criará todas as tabelas no Supabase.

3. Em seguida, execute:
   ```bash
   npm run seed
   ```
   Isso criará os 4 usuários iniciais.

4. Finalize com:
   ```bash
   npm run dev
   ```
   O site estará disponível em http://localhost:3000

## Credenciais Iniciais para Login

Após executar o seed, use estas credenciais para acessar o portal em `http://localhost:3000/partners/login`:

- partner1@kalil7.com / password123
- partner2@kalil7.com / password123
- partner3@kalil7.com / password123
- partner4@kalil7.com / password123

Mude as senhas após o primeiro login!
