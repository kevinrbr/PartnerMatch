import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ArrowRightCircleIcon } from 'react-native-heroicons/outline'
import { v4 as uuidv4 } from 'uuid'

import EmptyContent from '@/components/EmptyContent'
import ChatMessages from '@/components/chat/ChatMessages'
import TextInput from '@/components/input/TextInput'
import { getUserId } from '@/services/account/useUser'
import { useMessagesByRoomId } from '@/services/messages/useMessagesByRoomId'
import { useSendMessage } from '@/services/messages/useSendMessage'
import { useMessage } from '@/stores/messages'
import { supabase } from '@/supabase'
import 'react-native-get-random-values'
import { IMessage } from '@/types/message'

const Room = () => {
  const [message, setMessage] = useState('')
  const [userId, setUserId] = useState('')
  const { roomId } = useLocalSearchParams()
  const { mutate: sendMessage } = useSendMessage()
  const roomIdAsString = Array.isArray(roomId) ? roomId[0] : roomId
  const { addMessage, optimisticsIds, messages } = useMessage(state => state)
  const { data, isFetched, isLoading } = useMessagesByRoomId({
    roomId: roomIdAsString
  })

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId()
      setUserId(id)
    }
    fetchUserId()
  }, [])

  useEffect(() => {
    console.log('useEffect')
    const channel = supabase.channel(`room-id-${roomIdAsString}`).on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `room_id=eq.${roomIdAsString}`
      },
      async payload => {
        console.log({ payload })
        console.log({ optimisticsIds })
        if (!optimisticsIds.includes(payload.new.id)) {
          await addMessage(payload.new as IMessage)
        }
      }
    )

    const subscription = channel.subscribe(status => {
      // if (status === 'SUBSCRIBED') {
      //   console.log('Successfully subscribed to room:', roomIdAsString)
      // } else if (status === 'TIMED_OUT') {
      //   console.error('Subscription timed out for room:', roomIdAsString)
      // } else if (status === 'CHANNEL_ERROR') {
      //   console.error('Channel error for room:', roomIdAsString)
      // }
    })

    // Nettoyage : désabonnement lors du démontage du composant
    return () => {
      subscription.unsubscribe()
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (message) {
      const newMessage = {
        id: uuidv4(),
        sender_id: userId,
        message,
        room_id: roomIdAsString
      }
      addMessage(newMessage)
      console.log('2, handleMsg', optimisticsIds)
      await sendMessage({ roomId: roomIdAsString, senderId: userId, message })
      setMessage('')
    }
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.messagesContainer}>
          <EmptyContent
            title="Chargement des messages..."
            content="Veuillez patienter pendant que les messages se chargent."
          />
        </View>
      ) : data.length === 0 ? (
        <View style={styles.messagesContainer}>
          <EmptyContent
            title="Pas de message"
            content="Envoyez un message pour commencer la discussion"
          />
        </View>
      ) : (
        <View style={styles.messagesContainer}>
          <ChatMessages />
        </View>
      )}
      <View style={styles.inputMessageContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Envoyer un message"
            onInputChange={value => {
              setMessage(value)
            }}
            autoCapitalize="none"
            value={message}
          />
        </View>
        {message && (
          <ArrowRightCircleIcon color="#182A60" strokeWidth="1" onPress={handleSendMessage} />
        )}
      </View>
    </View>
  )
}

export default Room

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16
  },
  messagesContainer: {
    flex: 1
  },
  inputContainer: {
    flex: 1
  },
  inputMessageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    marginTop: 12
  }
})
