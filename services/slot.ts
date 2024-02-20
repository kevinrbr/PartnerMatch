import { useMutation } from '@tanstack/react-query'

import { supabase } from '@/supabase'
import { ISlot } from '@/types/slot'

export const postSlot = async function (formData: ISlot) {
  try {
    const { data, error } = await supabase.from('slot').insert({
      user_id: (await supabase.auth.getUser()).data.user.id,
      city: formData.city,
      club: formData.club,
      nbPlaces: formData.nbPlaces,
      level: formData.level,
      date: formData.date
    })

    if (error) {
      throw error
    }

    return data // Retourner la nouvelle réservation créée
  } catch (error) {
    console.error('Erreur lors de la création du créneau:', error.message)
    throw error
  }
}

export const getSlots = async () => {
  try {
    const { data, error } = await supabase.from('slot').select('*')

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error.message)
    throw error
  }
}
