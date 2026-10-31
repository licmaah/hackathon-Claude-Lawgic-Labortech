create table public.empresas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  razon_social text not null default '',
  avance jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);

create table public.revisiones_ia (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  documento text not null,
  created_at timestamptz not null default now()
);
create index revisiones_ia_user_fecha on public.revisiones_ia (user_id, created_at desc);

alter table public.empresas enable row level security;
alter table public.admins enable row level security;
alter table public.revisiones_ia enable row level security;

revoke all on public.empresas, public.admins, public.revisiones_ia from anon;
grant select, insert, update on public.empresas to authenticated;
grant select on public.admins to authenticated;
grant select, insert on public.revisiones_ia to authenticated;

create policy "cada admin ve su propia fila" on public.admins
  for select to authenticated using (user_id = (select auth.uid()));

create policy "la empresa ve lo suyo y el despacho ve todo" on public.empresas
  for select to authenticated using (
    user_id = (select auth.uid())
    or exists (select 1 from public.admins a where a.user_id = (select auth.uid()))
  );
create policy "la empresa crea su fila" on public.empresas
  for insert to authenticated with check (user_id = (select auth.uid()));
create policy "la empresa edita su fila" on public.empresas
  for update to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

create policy "cada usuario ve sus revisiones" on public.revisiones_ia
  for select to authenticated using (user_id = (select auth.uid()));
create policy "cada usuario registra sus revisiones" on public.revisiones_ia
  for insert to authenticated with check (user_id = (select auth.uid()));
