import { useQuery } from '@tanstack/react-query'

import { supabase } from '@/supabase'

export function useBooksByUserId() {
  const getBookingByUserId = async () => {
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

  return useQuery({
    queryKey: ['bookingByUserId'],
    queryFn: getBookingByUserId
  })
}
