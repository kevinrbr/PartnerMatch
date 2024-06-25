import { useQuery } from '@tanstack/react-query'

import { addNamesToSlots } from '@/common/addNameToSlot'
import { supabase } from '@/supabase'

export function useBooksByUserId() {
  const getBookingByUserId = async () => {
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser()
      if (userError) {
        throw userError
      }

      const userId = userData.user.id

      const { data: slotIdArray, error: slotIdError } = await supabase
        .from('booking')
        .select('slot_id')
        .eq('user_id', userId)

      if (slotIdError) {
        throw slotIdError
      }

      const slotIds = slotIdArray.map(item => item.slot_id)

      const { data: slots, error: slotsError } = await supabase
        .from('slot')
        .select('*')
        .in('id', slotIds)

      if (slotsError) {
        throw slotsError
      }

      const slotsWithNames = addNamesToSlots(slots)

      return slotsWithNames
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
