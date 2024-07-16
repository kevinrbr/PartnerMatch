import { useMutation, useQueryClient } from '@tanstack/react-query'

import { slotsQueryKey } from '@/services/slots/slots-query-key'
import { supabase } from '@/supabase'

export function useCancelBooking() {
  const queryClient = useQueryClient()

  const cancelBooking = async (id: number) => {
    try {
      const { data, error } = await supabase
        .from('booking')
        .delete()
        .eq('slot_id', id)
        .eq('user_id', (await supabase.auth.getUser()).data.user.id)

      if (error) {
        throw error
      }

      return data
    } catch (error) {
      console.error('Erreur lors de la suppression de la partie', error.message)
      throw error
    }
  }

  return useMutation({
    mutationFn: cancelBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: slotsQueryKey.all })
      queryClient.invalidateQueries({ queryKey: ['slotsByUserId'] })
      queryClient.invalidateQueries({ queryKey: ['bookingByUserId'] })
    }
  })
}
