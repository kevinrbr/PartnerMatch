import { useMutation, useQueryClient } from '@tanstack/react-query'

import { supabaseAuth } from '@/services/constants'

type LoginInput = {
  email: string
  password: string
}

const signInWithEmail = async ({ email, password }: LoginInput) => {
  const { data: user, error } = await supabaseAuth.signInWithPassword({
    email,
    password
  })

  if (error) {
    if (error.message.includes('Invalid login credentials')) {
      throw new Error(
        'Identifiants invalides. Veuillez vérifier votre email et votre mot de passe.'
      )
    } else {
      throw new Error('Une erreur inconnue est survenue. Veuillez réessayer plus tard.')
    }
  }

  return user
}

export function useLogin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: signInWithEmail,
    onSuccess: user => {
      queryClient.setQueryData(['user'], user)
    }
  })
}
