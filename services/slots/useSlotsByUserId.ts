import { useQuery } from '@tanstack/react-query'

import { addNamesToSlots } from '@/common/addNameToSlot'
import { supabase } from '@/supabase'

export function useSlotsByUserId() {
  const getSlotsByUserId = async () => {
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser()
      if (userError) {
        throw userError
      }

      const userId = userData.user.id
      const currentDate = new Date().toISOString()

      const { data: slotsData, error: slotsError } = await supabase
        .from('slot')
        .select('*')
        .eq('user_id', userId)
        .gte('date', currentDate)
        .order('date', { ascending: true })

      if (slotsError) {
        throw slotsError
      }

      const slotsWithNames = addNamesToSlots(slotsData)

      return slotsWithNames
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error.message)
      throw error
    }
  }

  return useQuery({
    queryKey: ['slotsByUserId'],
    queryFn: getSlotsByUserId
  })
}
