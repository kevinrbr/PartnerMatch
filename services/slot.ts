import { supabase } from '@/supabase'
import { ISlot } from '@/types/slot'

export const postSlot = async function (formData: ISlot) {
  const {
    data: { firstName },
    error
  } = await supabase
    .from('profiles')
    .select('firstName')
    .eq('id', (await supabase.auth.getUser()).data.user.id)
    .single()

  try {
    const { data, error } = await supabase.from('slot').insert({
      user_id: (await supabase.auth.getUser()).data.user.id,
      city: formData.city,
      club: formData.club,
      nbPlaces: formData.nbPlaces,
      level: formData.level,
      date: formData.date,
      name: firstName
    })

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error('Erreur lors de la création du créneau:', error.message)
    throw error
  }
}

export const updateSlotAvailability = async ({
  id,
  slotAvailability
}: {
  id: number
  slotAvailability: string
}) => {
  try {
    const { data, error } = await supabase
      .from('slot')
      .update({ nbPlaces: +slotAvailability - 1 })
      .eq('id', id)

    if (error) {
      throw error
    }
  } catch (error) {
    console.error('Error updating slot availability:', error.message)
  }
}

export const getSlotsByUserId = async () => {
  try {
    const { data, error } = await supabase
      .from('slot')
      .select()
      .eq('user_id', (await supabase.auth.getUser()).data.user.id)

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error.message)
    throw error
  }
}

export const getBookingByUserId = async () => {
  const { data: slotIdArray, error } = await supabase
    .from('booking')
    .select('slot_id')
    .eq('user_id', (await supabase.auth.getUser()).data.user.id)

  const slotId = slotIdArray.map(item => item.slot_id)
  try {
    const { data, error } = await supabase.from('slot').select().in('id', slotId)

    if (error) {
      throw error
    }
    return data
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error.message)
    throw error
  }
}

export const bookASlot = async (id: number) => {
  try {
    const { data, error } = await supabase.from('booking').insert({
      user_id: (await supabase.auth.getUser()).data.user.id,
      slot_id: id
    })

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error('Erreur lors de la création du créneau:', error.message)
    throw error
  }
}

export const removeSlot = async (id: number) => {
  try {
    const { data, error } = await supabase.from('slot').delete().eq('id', id)

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error('Erreur lors de la suppression de la partie', error.message)
    throw error
  }
}
