import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowRightCircleIcon } from 'react-native-heroicons/outline'
import TextInput from '../input/TextInput'
import { v4 as uuidv4 } from 'uuid'
import { getUserId } from '@/services/account/useUser'
import { useLocalSearchParams } from 'expo-router'
import { useMessage } from '@/stores/messages'
import { useSendMessage } from '@/services/messages/useSendMessage'

const ChatInput = () => {
  const [message, setMessage] = useState('')
  const [userId, setUserId] = useState('')

  const { mutate: sendMessage } = useSendMessage()
  const { addMessage, optimisticsIds } = useMessage(state => state)
  const { roomId } = useLocalSearchParams()

  const roomIdAsString = Array.isArray(roomId) ? roomId[0] : roomId

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId()
      setUserId(id)
    }
    fetchUserId()
  }, [])

  const handleSendMessage = async () => {
    const id = uuidv4()
    if (message) {
      const newMessage = {
        id,
        sender_id: userId,
        message,
        room_id: roomIdAsString
      }
      addMessage(newMessage)
      await sendMessage({ id, roomId: roomIdAsString, senderId: userId, message })
      setMessage('')
    }
  }

  return (
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
  )
}

export default ChatInput

const styles = StyleSheet.create({
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
