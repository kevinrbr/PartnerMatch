import React, { useEffect, useRef, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

import MessageCard from './MessageCard'

import { useRealtimeMessages } from '@/common/useRealtimeMessages'
import { getUserId } from '@/services/account/useUser'
import { useMessage } from '@/stores/messages'
import { supabase } from '@/supabase'
import { IMessage } from '@/types/message'

type ListMessageProps = {
  roomId: string
}

const ListMessages = ({ roomId }: ListMessageProps) => {
  const [userId, setUserId] = useState('')
  const flatListRef = useRef(null)
  const { messages, setMessages } = useMessage(state => state) // Déstructure aussi `setMessages`

  // Abonnement aux messages en temps réel
  useRealtimeMessages(roomId)

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId()
      setUserId(id)
    }
    fetchUserId()
  }, [])

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('room_id', roomId)
        .order('created_at', { ascending: true })

      if (error) {
        console.error(error)
      } else {
        // Mettre à jour les messages dans le store
        setMessages(data)
      }
    }

    // Charger les messages quand le composant est monté
    fetchMessages()
  }, [roomId, setMessages]) // Effecte déclenché par `roomId` pour charger les messages à chaque changement de salle

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: false })
  }, [messages])

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={message => message.id.toString()}
        renderItem={({ item: message }) => (
          <MessageCard message={message} isOwnMessage={userId === message.sender_id} />
        )}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
      />
    </View>
  )
}

export default ListMessages

const styles = StyleSheet.create({})
