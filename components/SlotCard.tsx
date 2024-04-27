import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { ClockIcon } from 'react-native-heroicons/outline'

import { getDateHours } from '@/common/date'
import { ISlot } from '@/types/slot'

type SlotCardProps = {
  slot: ISlot
  onClick?: (slot: ISlot) => void
}

const SlotCard = ({ slot, onClick }: SlotCardProps) => {
  const numberOfPlacesLabel = slot => {
    return +slot.nbPlaces > 1
      ? +slot.nbPlaces + ' places disponibles'
      : +slot.nbPlaces + ' place disponible'
  }

  const handlePress = () => {
    if (onClick) {
      onClick(slot)
    }
  }

  return (
    <TouchableWithoutFeedback style={styles.cardContainer} onPress={handlePress}>
      <View style={styles.cardContent}>
        <View>
          <Text style={styles.club}>
            {slot.city} - {slot.club}
          </Text>
          <View style={styles.hourContainer}>
            <ClockIcon color="#FF7131" size={16} />
            <Text style={styles.hour}>{getDateHours(slot.date.toString())}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.dispo}>{numberOfPlacesLabel(slot)}</Text>
        </View>
      </View>
      <View style={styles.footerContent}>
        <View style={styles.profileInfoContainer}>
          <View style={styles.profilePictureContainer}>
            <Image style={styles.profilePicture} source={require('@/assets/images/profile.png')} />
          </View>
          <View>
            <Text style={styles.name}>{slot.name}</Text>
          </View>
        </View>
        <View style={styles.levelContainer}>
          <Text style={styles.level}>niv {slot.level}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default SlotCard

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 8,
    marginBottom: 32
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  club: {
    fontSize: 16,
    fontFamily: 'Satoshi-Bold'
  },
  hourContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    marginTop: 4
  },
  hour: {
    fontSize: 12,
    fontFamily: 'Satoshi-Regular'
  },
  dispo: {
    fontSize: 16,
    fontFamily: 'Satoshi-Regular'
  },
  footerContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  profileInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  profilePictureContainer: {
    width: 28,
    height: 28,
    overflow: 'hidden',
    borderRadius: 100,
    marginRight: 12
  },
  profilePicture: {
    width: '100%',
    height: '100%'
  },
  level: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    color: '#fff',
    fontSize: 12
  },
  levelContainer: {
    borderRadius: 4,
    backgroundColor: '#FF7131'
  },
  name: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 12
  },
  noteContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  note: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 12
  },
  noteIcon: {
    marginLeft: 2
  }
})
