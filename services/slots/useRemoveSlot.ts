import { useMutation, useQueryClient } from '@tanstack/react-query'

import { slotsQueryKey } from '@/services/slots/slots-query-key'
import { supabase } from '@/supabase'

export function useRemoveSlot() {
  const queryClient = useQueryClient()

  const removeSlot = async (id: number) => {
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

  return useMutation({
    mutationFn: removeSlot,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: slotsQueryKey.all })
    }
  })
}
