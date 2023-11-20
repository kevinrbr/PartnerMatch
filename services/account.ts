import { supabase } from "../supabase";

export async function signInWithPassword(email: string, password: string) {
    const { error, data } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })

    return { data, error };
}

export async function signUpWithPassword(email: string, password: string) {
    const {
        data: { session },
        error,
      } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      return { error, session };
}

export async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Erreur lors de la déconnexion:', error.message);
    }
}