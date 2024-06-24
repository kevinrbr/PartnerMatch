import { useMutation, useQueryClient } from '@tanstack/react-query'

import { slotsQueryKey } from '@/services/slots/slots-query-key'
import { supabase } from '@/supabase'

type EditProfileInput = {
  firstName: string
  lastName: string
  userId: string
}

export function useEditProfile() {
  const queryClient = useQueryClient()

  const editProfile = async ({ firstName, lastName, userId }: EditProfileInput) => {
    const updates = {
      id: userId,
      firstName,
      lastName
    }

    try {
      const { error } = await supabase.from('profiles').upsert(updates)

      if (error) {
        throw error
      }
    } catch (error) {
      throw error
    }
  }

  return useMutation({
    mutationFn: editProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: slotsQueryKey.all })
      queryClient.invalidateQueries({ queryKey: ['user'] })
    }
  })
}
