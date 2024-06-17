import { supabaseAuth } from './constants'

import { supabase } from '@/supabase'

export const signUpWithEmail = async (email, password) => {
  try {
    const { data, error } = await supabaseAuth.signUp({
      email,
      password
    })

    if (error) {
      throw error
    }

    return data.user.id
  } catch (error) {
    throw error
  }
}

export const updateProfile = async (firstName: string, lastName: string, userId: string) => {
  const updates = {
    id: userId,
    firstName,
    lastName
  }

  try {
    const { data, error } = await supabase.from('profiles').upsert(updates)
    if (error) {
      throw error
    }
  } catch (error) {
    throw error
  }
}
