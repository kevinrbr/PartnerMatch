import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

type MessageProps = {
  message: any
  isOwnMessage?: boolean
}

const MessageCard = ({ message, isOwnMessage }: MessageProps) => {
  return (
    <View style={[styles.container, isOwnMessage && styles.rightContainer]}>
      {!isOwnMessage && (
        <View style={styles.profilePictureContainer}>
          <Image style={styles.profilePicture} source={require('@/assets/images/profile.png')} />
        </View>
      )}
      <View style={[styles.content]}>
        <View style={styles.infoContainer}>
          {!isOwnMessage && <Text style={styles.name}>Antoine Pascaud</Text>}
          <Text style={[styles.date, isOwnMessage && styles.rightDate]}>Mer 3, 17h30</Text>
        </View>
        <Text style={[styles.message, isOwnMessage && styles.messageRight]}>{message.message}</Text>
      </View>
    </View>
  )
}

export default MessageCard

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 24,
    gap: 12,
    justifyContent: 'flex-start'
  },
  rightContainer: {
    justifyContent: 'flex-end'
  },
  profilePictureContainer: {
    height: 48,
    width: 48,
    overflow: 'hidden',
    borderRadius: 100
  },
  profilePicture: {
    width: '100%',
    height: '100%'
  },
  content: {},
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8
  },
  name: {
    fontFamily: 'Satoshi-Bold'
  },
  date: {
    fontSize: 12,
    marginBottom: 1,
    width: '100%'
  },
  rightDate: {
    textAlign: 'right'
  },
  message: {
    flexShrink: 1,
    fontFamily: 'Satoshi-Regular',
    marginTop: 4,
    textAlign: 'left'
  },
  messageRight: {
    textAlign: 'right'
  }
})
