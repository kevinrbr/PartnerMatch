import { supabaseAuth } from "./constants";

export const signInWithEmail = async (email: string, password: string) => {
  const { error, data } = await supabaseAuth.signInWithPassword({
    email: email,
    password: password,
  })

  console.log(error);

  return { data, error };
}

export const signUpWithEmail = async (email: string, password: string) => {
  const {
    data: { session },
    error,
  } = await supabaseAuth.signUp({
    email: email,
    password: password,
  });

  return { error, session };
}

export const signOut = async () => {
  const { error } = await supabaseAuth.signOut();

  if (error) {
    console.error('Erreur lors de la déconnexion:', error.message);
  }
}