// Storage centralizado — todas as operações de arquivo passam por aqui, nunca importar Supabase Storage fora deste arquivo

import { createClient } from "@/lib/db/supabase/client";

export async function uploadFile(bucket: string, path: string, file: File) {
  const supabase = createClient();
  return await supabase.storage.from(bucket).upload(path, file);
}

export async function getPublicUrl(bucket: string, path: string) {
  const supabase = createClient();
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

export async function deleteFile(bucket: string, path: string) {
  const supabase = createClient();
  return await supabase.storage.from(bucket).remove([path]);
}
