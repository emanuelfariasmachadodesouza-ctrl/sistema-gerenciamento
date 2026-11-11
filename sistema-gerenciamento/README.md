# Sistema de gerenciamento

Exemplo de portfólio: gerenciador de tarefas em PHP 8 + JavaScript + Supabase (PostgreSQL), acessado pela API REST do Supabase via cURL.

## Banco
1. Crie um projeto no Supabase.
2. Cole `database/schema.sql` no SQL Editor e execute.

## Deploy na Vercel
1. Suba para o GitHub e importe na Vercel.
2. Defina `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` em *Environment Variables* (a service role key nunca deve ir para o código).
3. Faça o deploy. O PHP roda via runtime `vercel-php` (ver `vercel.json`).

## Rodar local (XAMPP/WAMP)
1. Copie `api/config.local.example.php` para `api/config.local.php` e preencha URL e chave.
2. Garanta que `extension=curl` está ativa no `php.ini`.
3. Copie a pasta para `htdocs` e acesse `http://localhost/sistema-gerenciamento/` (ajuste o caminho `API` em `app.js` para `/sistema-gerenciamento/api/tarefas.php`).
