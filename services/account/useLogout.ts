import { useMutation, useQueryClient } from '@tanstack/react-query'

import { supabaseAuth } from '@/services/constants'

export const logout = async () => {
  const { error } = await supabaseAuth.signOut()

  if (error) {
    console.error('Erreur lors de la déconnexion:', error.message)
  }
}

export function useLogout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logout,
    onSuccess: user => {
      queryClient.setQueryData(['user'], user)
    }
  })
}
