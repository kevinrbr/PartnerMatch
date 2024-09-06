import { useLocalSearchParams } from 'expo-router'
import React, { Suspense } from 'react'

import ListMessages from './ListMessages'

import { useMessagesByRoomId } from '@/services/messages/useMessagesByRoomId'
import InitMessage from '@/stores/initMessage'

const ChatMessages = () => {
  const { roomId } = useLocalSearchParams()

  const roomIdAsString = Array.isArray(roomId) ? roomId[0] : roomId
  const { data, isFetched, isLoading } = useMessagesByRoomId({
    roomId: roomIdAsString
  })

  return (
    <Suspense fallback="loading..">
      <ListMessages roomId={roomIdAsString} />
      <InitMessage messages={data} />
    </Suspense>
  )
}

export default ChatMessages
