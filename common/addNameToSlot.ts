import { supabase } from '@/supabase'

export async function addNamesToSlots(slots) {
  return Promise.all(
    slots.map(async slot => {
      const { data: nameData, error: nameError } = await supabase
        .from('profiles')
        .select('firstName')
        .eq('id', slot.user_id)
        .single()

      if (nameError) {
        throw nameError
      }

      if (!nameData) {
        throw new Error("Nom d'utilisateur non trouvé pour le slot avec ID " + slot.id)
      }

      return {
        ...slot,
        name: nameData.firstName
      }
    })
  )
}
