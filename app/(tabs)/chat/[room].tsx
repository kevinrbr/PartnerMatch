import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { ArrowRightCircleIcon } from 'react-native-heroicons/outline'

import MessageCard from '@/components/chat/MessageCard'
import TextInput from '@/components/input/TextInput'
import { getUserId } from '@/services/account/useUser'
import { useMessagesByRoomId } from '@/services/messages/useMessagesByRoomId'
import { useSendMessage } from '@/services/messages/useSendMessage'

const Room = () => {
  const flatListRef = useRef(null)
  const [message, setMessage] = useState('')
  const [userId, setUserId] = useState('')
  const { roomId } = useLocalSearchParams()
  const { mutate: sendMessage } = useSendMessage()
  const roomIdAsString = Array.isArray(roomId) ? roomId[0] : roomId
  const { data: messages, isLoading: isLoadingMessages } = useMessagesByRoomId({
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
    flatListRef.current?.scrollToEnd({ animated: false })
  }, [messages])

  const handleSendMessage = async () => {
    if (message) {
      await sendMessage({ roomId: roomIdAsString, senderId: await getUserId(), message })
      setMessage('')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.messagesContainer}>
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
