import { useLocalSearchParams } from 'expo-router'
import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import 'react-native-get-random-values'

import EmptyContent from '@/components/EmptyContent'
import { useMessagesByRoomId } from '@/services/messages/useMessagesByRoomId'
import ChatMessages from '@/components/chat/ChatMessages'
import ChatInput from '@/components/chat/ChatInput'

const Room = () => {
  const { roomId } = useLocalSearchParams()
  const roomIdAsString = Array.isArray(roomId) ? roomId[0] : roomId
  const { data, isFetched, isLoading } = useMessagesByRoomId({
    roomId: roomIdAsString
  })

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
      <ChatInput />
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
