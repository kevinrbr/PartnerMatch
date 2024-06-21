import { useMutation, useQueryClient } from '@tanstack/react-query'

import { supabaseAuth } from '@/services/constants'

type RegisterInput = {
  email: string
  password: string
}

const signUpWithEmail = async ({ email, password }: RegisterInput) => {
  const { data, error } = await supabaseAuth.signUp({
    email,
    password
  })

  if (error) {
    throw new Error("Une erreur s'est produite lors de l'inscription. Réessayez plus tard.")
  }

  return data.user.id
}

export function useRegister() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: signUpWithEmail,
    onSuccess: user => {
      queryClient.setQueryData(['user'], user)
    }
  })
}
