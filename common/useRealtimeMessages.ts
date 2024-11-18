import { useEffect } from 'react'

import { useMessage } from '@/stores/messages' // Le store où les messages seront stockés
import { supabase } from '@/supabase' // Assurez-vous que supabase est bien configuré
import { IMessage } from '@/types/message'

export const useRealtimeMessages = (roomId: string) => {
  const { optimisticsIds, addMessage } = useMessage(state => state)

  useEffect(() => {
    // Créer un canal pour écouter les changements dans la table "messages" pour une salle spécifique
    const channel = supabase.channel(`room-id-${roomId}`).on(
      'postgres_changes',
      {
        event: 'INSERT', // Quand un message est ajouté
        schema: 'public',
        table: 'messages',
        filter: `room_id=eq.${roomId}` // Filtrer les messages uniquement pour cette salle
      },
      payload => {
        const newMessage = payload.new as IMessage

        // Si le message n'a pas déjà été ajouté (pour éviter les mises à jour optimistes)
        if (!optimisticsIds.includes(newMessage.id)) {
          addMessage(newMessage) // Ajouter le message au store
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
