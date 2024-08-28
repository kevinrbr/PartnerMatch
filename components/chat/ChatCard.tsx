import { router } from 'expo-router'
import React from 'react'
import { StyleSheet, Image, View, Text, Pressable } from 'react-native'

type TextInputProps = {
  hasNewMessage?: boolean
  onPress: () => void
}

const ChatCard = ({ onPress, hasNewMessage }: TextInputProps) => {
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
            Nantes - Ucpa Sport Station
          </Text>
          <Text style={styles.date}>ven 12 juil.</Text>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.name}>Kévin: </Text>
          <Text style={styles.lastMessage} numberOfLines={1} ellipsizeMode="tail">
            Je suis disponible à partir de 18h, est-ce que ça vous interesse
          </Text>
          <Text style={styles.lastMessageHour}>10h21</Text>
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
