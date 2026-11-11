-- Supabase (PostgreSQL). Cole no SQL Editor do projeto.
create table if not exists public.tarefas (
  id bigint generated always as identity primary key,
  titulo varchar(150) not null,
  responsavel varchar(100) not null default '',
  status text not null default 'pendente'
    check (status in ('pendente', 'andamento', 'concluida')),
  criado_em timestamptz not null default now()
);

-- RLS ativo sem políticas: somente a service role (usada no PHP) acessa a tabela.
alter table public.tarefas enable row level security;

insert into public.tarefas (titulo, responsavel, status) values
  ('Organizar cadastro de alunos', 'Secretaria', 'andamento'),
  ('Revisar inventário de equipamentos', 'TI', 'pendente'),
  ('Publicar calendário do semestre', 'Coordenação', 'concluida');
