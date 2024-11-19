import React from 'react'
import { StyleSheet, Image, View, Text, Pressable } from 'react-native'

import { getDateHours } from '@/common/date'
import { useRealtimeLastMessage } from '@/common/useRealtimeLastMessage'
import { useLastMessageByRoomId } from '@/services/messages/useLastMessageByRoomId'

type TextInputProps = {
  hasNewMessage?: boolean
  onPress: () => void
  title: string
  id: string
}

const ChatCard = ({ onPress, hasNewMessage, title, id }: TextInputProps) => {
  const { data, isFetched, isLoading } = useLastMessageByRoomId({
    roomId: id
  })

  const lastMessage = useRealtimeLastMessage(id)

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.contentContainer}>
        <View style={styles.top}>
          <View style={styles.playersPicturesContainer}>
            <View style={styles.profilePictureContainer}>
              <Image
                style={styles.profilePicture}
                source={require('@/assets/images/profile.png')}
              />
            </View>
            <View style={styles.profilePictureContainer}>
              <Image
                style={styles.profilePicture}
                source={require('@/assets/images/profile.png')}
              />
            </View>
            <View style={styles.profilePictureContainer}>
              <Image
                style={styles.profilePicture}
                source={require('@/assets/images/profile.png')}
              />
            </View>
          </View>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
        </View>
        <View style={styles.bottom}>
          {data ? (
            <>
              <Text style={styles.name}>{data.firstName}: </Text>
              <Text style={styles.lastMessage} numberOfLines={1} ellipsizeMode="tail">
                {lastMessage?.message}
              </Text>
              <Text style={styles.lastMessageHour}>
                {lastMessage?.created_at && getDateHours(lastMessage?.created_at.toString())}
              </Text>
            </>
          ) : (
            <Text>Envoyez le premier message</Text>
          )}
        </View>
      </View>
      <View style={[styles.noNotificationDot, hasNewMessage && styles.notificationDot]} />
    </Pressable>
  )
}

export default ChatCard

const styles = StyleSheet.create({
  container: {
    padding: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    marginBottom: 16
  },
  contentContainer: {
    flex: 1
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  bottom: {
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  name: {
    fontFamily: 'Satoshi-Regular',
    flexShrink: 0
  },
  lastMessage: {
    fontFamily: 'Satoshi-Regular',
    flex: 1,
    marginLeft: 4
  },
  lastMessageHour: {
    fontFamily: 'Satoshi-Regular',
    flexShrink: 0,
    marginLeft: 8
  },
  playersPicturesContainer: {
    flexShrink: 0,
    flexDirection: 'row',
    marginRight: 8
  },
  profilePictureContainer: {
    width: 24,
    height: 24,
    overflow: 'hidden',
    borderRadius: 100,
    position: 'relative',
    marginRight: -8
  },
  profilePicture: {
    width: '100%',
    height: '100%'
  },
  title: {
    fontFamily: 'Satoshi-Bold',
    fontSize: 16,
    flex: 1,
    marginHorizontal: 8
  },
  date: {
    fontFamily: 'Satoshi-Regular',
    flexShrink: 0
  },
  notificationDot: {
    height: 6,
    width: 6,
    borderRadius: 100,
    backgroundColor: '#FF7131'
  },
  noNotificationDot: {
    backgroundColor: '#FFF'
  }
})
