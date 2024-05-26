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
    const { data, error } = await supabaseAuth.signUp({
      email,
      password
    })

    if (error) {
      throw error
    }

    return data.user
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

export const updateProfileFirstName = async (userId: string, firstName: string) => {
  const { data, error } = await supabase.from('profiles').update({ firstName }).eq('id', userId)
  if (error) {
    console.log(error)
    throw new Error(error.message)
  }

  return data
}

export const updateProfile = async (firstName: string, lastName: string, userId: string) => {
  const updates = {
    id: userId,
    firstName,
    lastName
  }

  try {
    const { data, error } = await supabase.from('profiles').upsert(updates)
    console.log('iciiiiii', data)
    console.log(error)
    if (error) {
      throw error
    }
  } catch (error) {
    throw error
  }
}

export const getProfilesDetails = async () => {
  try {
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', (await supabase.auth.getUser()).data.user.id)

    return {
      id: profileData[0].id,
      firstName: profileData[0].firstName,
      lastName: profileData[0].lastName
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error.message)
    throw error
  }
}

export const getUserId = async () => (await supabase.auth.getSession()).data.session.user.id
