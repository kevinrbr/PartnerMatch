import React, { useEffect, useRef, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

import MessageCard from './MessageCard'

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
  const { messages, optimisticsIds, addMessage } = useMessage(state => state)

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId()
      setUserId(id)
    }
    fetchUserId()
  }, [])

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: false })
  }, [messages])

  useEffect(() => {
    const channel = supabase.channel(`room-id-${roomId}`).on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `room_id=eq.${roomId}`
      },
      async payload => {
        if (!optimisticsIds.includes(payload.new.id)) {
          await addMessage(payload.new as IMessage)
        }
      }
    )

    const subscription = channel.subscribe()

    return () => {
      subscription.unsubscribe()
    }
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