-- Brief de Marca: una fila por envio del formulario /brief.
--
-- Diseño deliberado:
--  - Tabla aislada, sin FK a auth.users: la app no tiene login todavia, y no
--    debe necesitarlo para que alguien llene su brief.
--  - RLS habilitada y SIN POLITICAS: nadie desde el navegador (anon ni
--    authenticated) puede leer ni escribir. Solo la service_role key, usada
--    unicamente en el servidor (POST /api/brief), tiene acceso.
create table public.briefs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- columnas clave para filtrar y contactar rapido sin parsear el jsonb
  nombre text not null,
  negocio text not null,
  ciudad_pais text not null,
  whatsapp text not null,
  email text,
  categoria text,
  etapa text,
  objetivo_principal text,
  zona_horaria text,

  -- todas las respuestas, con el id de cada pregunta como clave
  respuestas jsonb not null,

  version_formulario text not null default 'v1',
  estado text not null default 'nuevo'
    check (estado in ('nuevo', 'revisado', 'propuesta_enviada', 'cerrado'))
);

alter table public.briefs enable row level security;
-- Sin políticas para anon/authenticated: solo el servidor (service role) accede.

create index briefs_created_at_idx on public.briefs (created_at desc);
create index briefs_estado_idx on public.briefs (estado);
