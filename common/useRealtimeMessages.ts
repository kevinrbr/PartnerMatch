import { useEffect } from 'react'

import { useMessage } from '@/stores/messages' // Le store où les messages seront stockés
import { supabase } from '@/supabase' // Assurez-vous que supabase est bien configuré
import { IMessage } from '@/types/message'

export const useRealtimeMessages = (roomId: string) => {
  const { optimisticsIds, addMessage } = useMessage(state => state)

  useEffect(() => {
    const channel = supabase.channel(`room-id-${roomId}`).on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `room_id=eq.${roomId}`
      },
      payload => {
        const newMessage = payload.new as IMessage

        if (!optimisticsIds.includes(newMessage.id)) {
          addMessage(newMessage)
        }
      }
    )

    // S'abonner au canal
    const subscription = channel.subscribe()

    // Nettoyage de l'abonnement lorsque le composant se démonte
    return () => {
      subscription.unsubscribe()
    }
  }, [optimisticsIds, addMessage, roomId]) // Dépendances mises à jour : ajout de roomId
}
