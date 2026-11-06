-- Migration para revisão/aplicação humana. Não executada pelo agente.
ALTER TABLE public.equipment ADD COLUMN IF NOT EXISTS photo_url TEXT;
ALTER TABLE public.equipment ADD COLUMN IF NOT EXISTS photo_source_url TEXT;
ALTER TABLE public.equipment ADD COLUMN IF NOT EXISTS photo_author TEXT;
ALTER TABLE public.equipment ADD COLUMN IF NOT EXISTS photo_id TEXT;
ALTER TABLE public.equipment ADD COLUMN IF NOT EXISTS photo_license TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS equipment_photo_id_key ON public.equipment(photo_id);
-- No dashboard do Supabase, crie o bucket PUBLICO "equipment-images" antes de publicar as fotos.
-- Não abra a política de escrita do Storage ao browser; uploads somente por operador autenticado
-- usando o utilitário local, fora de automações e com chave de serviço obtida em variável de ambiente.
