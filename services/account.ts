import { supabaseAuth } from './constants'

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const { error } = await supabaseAuth.signInWithPassword({
      email,
      password
    })

    if (error) {
      throw error
    }
  } catch (error) {
    throw error
  }
}

export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const { error } = await supabaseAuth.signUp({
      email,
      password
    })

    if (error) {
      throw error
    }
  } catch (error) {
    throw error
  }
}

export const signOut = async () => {
  const { error } = await supabaseAuth.signOut()

  if (error) {
    console.error('Erreur lors de la déconnexion:', error.message)
  }
}
