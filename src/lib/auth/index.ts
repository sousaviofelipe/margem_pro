// Autenticação centralizada — todas as funções de auth passam por aqui, nunca importar Supabase Auth fora deste arquivo

import { createClient } from "@/lib/db/supabase/client";

export async function signUp(email: string, password: string, name: string) {
  const supabase = createClient();
  return await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });
}

export async function signIn(email: string, password: string) {
  const supabase = createClient();
  return await supabase.auth.signInWithPassword({ email, password });
}

export async function signOut() {
  const supabase = createClient();
  return await supabase.auth.signOut();
}

export async function getUser() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export async function getSession() {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  return data.session;
}
