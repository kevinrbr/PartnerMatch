import { useQuery } from '@tanstack/react-query'

import { supabase } from '@/supabase'

export function useSlotsByUserId() {
  const getSlotsByUserId = async () => {
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
  return useQuery({
    queryKey: ['slotsByUserId'],
    queryFn: getSlotsByUserId
  })
}
