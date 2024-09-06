import { useLocalSearchParams } from 'expo-router'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { FlatList } from 'react-native'

import MessageCard from './MessageCard'

import { getUserId } from '@/services/account/useUser'
import { useMessagesByRoomId } from '@/services/messages/useMessagesByRoomId'
import InitMessage from '@/stores/initMessage'
import { useMessage } from '@/stores/messages'

const ChatMessages = () => {
  const { messages } = useMessage(state => state)
  const { roomId } = useLocalSearchParams()
  const flatListRef = useRef(null)
  const [userId, setUserId] = useState('')

  const roomIdAsString = Array.isArray(roomId) ? roomId[0] : roomId
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
    flatListRef.current?.scrollToEnd({ animated: false })
  }, [data])

  return (
    <Suspense fallback="loading..">
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={message => message.id.toString()}
        renderItem={({ item: message }) => (
          <MessageCard message={message} isOwnMessage={userId === message.sender_id} />
        )}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
      />
      <InitMessage messages={data?.reverse() || []} />
    </Suspense>
  )
}

export default ChatMessages
