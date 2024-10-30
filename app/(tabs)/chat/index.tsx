import { useFocusEffect, useRouter } from 'expo-router'
import { useCallback } from 'react'
import { StyleSheet, View, FlatList, Text } from 'react-native'

import EmptyContent from '@/components/EmptyContent'
import Title from '@/components/Title'
import ChatCard from '@/components/chat/ChatCard'
import { useRoomBySlotId } from '@/services/messages/useRoomBySlotId'
import { useBooksByUserId } from '@/services/slots/useBooksByUserId'
import { useSlotsByUserId } from '@/services/slots/useSlotsByUserId'

const Messaging = () => {
  const { data: slotsByUserId, isLoading: isLoadingSlots } = useSlotsByUserId()
  const { data: booksByUserId, isLoading: isLoadingBooks } = useBooksByUserId()
  const combinedSlots = [...(slotsByUserId || []), ...(booksByUserId || [])]
  const slotIds = combinedSlots?.map(slot => slot.id) || []

  const { data: rooms, isLoading: isLoadingRooms, refetch } = useRoomBySlotId(slotIds)
  useFocusEffect(
    useCallback(() => {
      refetch()
    }, [])
  )

  const router = useRouter()

  const handleCardPress = roomId => {
    router.push({ pathname: '/chat/[room]', params: { roomId } })
  }

  if (isLoadingSlots || isLoadingRooms) {
    return (
      <View style={styles.container}>
        <Title variant="pageTitle">Chargement...</Title>
      </View>
    )
  }

  if (!rooms.length) {
    return (
      <View style={styles.container}>
        <EmptyContent
          title="Vos discussions apparaîtront ici"
          content="Rejoignez une partie pour échanger avec vos futurs partenaires"
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={rooms}
        keyExtractor={room => room.id.toString()}
        renderItem={({ item: room }) => (
          <ChatCard
            hasNewMessage={room.hasNewMessage}
            onPress={() => handleCardPress(room.id)}
            title={room.title}
            id={room.id}
          />
        )}
      />
    </View>
  )
}

export default Messaging

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16
  }
})
