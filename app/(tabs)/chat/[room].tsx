import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { ArrowRightCircleIcon } from 'react-native-heroicons/outline'
import { v4 as uuidv4 } from 'uuid'

import EmptyContent from '@/components/EmptyContent'
import MessageCard from '@/components/chat/MessageCard'
import TextInput from '@/components/input/TextInput'
import { getUserId } from '@/services/account/useUser'
import { useMessagesByRoomId } from '@/services/messages/useMessagesByRoomId'
import { useSendMessage } from '@/services/messages/useSendMessage'
import InitMessage from '@/stores/initMessage'
import { useMessage } from '@/stores/messages'
import { supabase } from '@/supabase'
import 'react-native-get-random-values'

const Room = () => {
  const flatListRef = useRef(null)
  const [message, setMessage] = useState('')
  const [userId, setUserId] = useState('')
  const { roomId } = useLocalSearchParams()
  const { mutate: sendMessage } = useSendMessage()
  const roomIdAsString = Array.isArray(roomId) ? roomId[0] : roomId

  const {
    data: messages,
    isFetched,
    isLoading
  } = useMessagesByRoomId({
    roomId: roomIdAsString
  })
  console.log('message', messages)

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

  const addMessage = useMessage(state => state.addMessage)

  const handleSendMessage = async () => {
    if (message) {
      const newMessage = {
        id: uuidv4(),
        sender_id: userId,
        message,
        room_id: roomIdAsString
      }
      addMessage(newMessage)
      await sendMessage({ roomId: roomIdAsString, senderId: userId, message })
      setMessage('')
    }
  }

  const test = useMessage(state => state.messages)
  console.log({ test })

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.messagesContainer}>
          <EmptyContent
            title="Chargement des messages..."
            content="Veuillez patienter pendant que les messages se chargent."
          />
        </View>
      ) : messages.length === 0 ? (
        <View style={styles.messagesContainer}>
          <EmptyContent
            title="Pas de message"
            content="Envoyez un message pour commencer la discussion"
          />
        </View>
      ) : (
        <View style={styles.messagesContainer}>
          <FlatList
            ref={flatListRef}
            data={test}
            keyExtractor={message => message.id.toString()}
            renderItem={({ item: message }) => (
              <MessageCard message={message} isOwnMessage={userId === message.sender_id} />
            )}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
          />
          {isFetched && <InitMessage messages={messages} />}
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
