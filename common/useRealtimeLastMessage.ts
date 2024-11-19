import { useEffect, useState } from 'react'

import { supabase } from '@/supabase' // Assurez-vous que supabase est bien configuré
import { IMessage } from '@/types/message'

export const useRealtimeLastMessage = (roomId: string) => {
  const [lastMessage, setLastMessage] = useState<IMessage | null>(null)

  useEffect(() => {
    // Récupérer le dernier message d'une salle
    const fetchLastMessage = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('room_id', roomId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (error) {
        console.error('Erreur lors de la récupération du dernier message:', error)
        return
      }

      setLastMessage(data)
    }

    fetchLastMessage()

    // S'abonner aux nouvelles insertions de messages
    const channel = supabase.channel(`room-id-${roomId}`).on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `room_id=eq.${roomId}`
      },
      payload => {
        setLastMessage(payload.new as IMessage)
      }
    )

    const subscription = channel.subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [roomId])

  return lastMessage
}
