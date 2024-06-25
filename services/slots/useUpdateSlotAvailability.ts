import { useMutation, useQueryClient } from '@tanstack/react-query'

import { supabase } from '@/supabase'

type UpdateSlotAvailabilityInput = {
  id: number
  slotAvailability: string
}

export function useUpdateSlotAvailability() {
  const queryClient = useQueryClient()

  const updateSlotAvailability = async ({ id, slotAvailability }: UpdateSlotAvailabilityInput) => {
    try {
      const { error } = await supabase
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

  return useMutation({
    mutationFn: updateSlotAvailability,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['slots'] })
      queryClient.invalidateQueries({ queryKey: ['bookingByUserId'] })
    }
  })
}
