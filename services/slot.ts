import { supabase } from '@/supabase'
import { ISlot } from '@/types/slot'

export const postSlot = async function (formData: ISlot) {
  const { data, error } = await supabase.from('slot').insert({
    user_id: (await supabase.auth.getUser()).data.user.id,
    city: formData.city,
    club: formData.club,
    nb_places: formData.nbPlaces,
    niveau: formData.level,
    match_date: formData.date
  })
}
