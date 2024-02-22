import { supabaseAuth } from './constants'

import { supabase } from '@/supabase'

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

export const updateProfile = async (firstName: string, lastName: string) => {
  const updates = {
    id: (await supabase.auth.getUser()).data.user.id,
    firstName,
    lastName
  }

  try {
    const { error } = await supabase.from('profiles').upsert(updates)

    if (error) {
      throw error
    }
  } catch (error) {
    throw error
  }
}

export const getProfilesDetails = async () => {
  try {
    const { data, error } = await supabase.from('profiles').select('*')

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error.message)
    throw error
  }
}
