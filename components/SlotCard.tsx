import { format, parseISO } from 'date-fns'
import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

import { ISlot } from '@/types/slot'

type SlotCardProps = {
  slot: ISlot
}

const SlotCard = ({ slot }: SlotCardProps) => {
  console.log(slot.date)
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardContent}>
        <View>
          <Text style={styles.club}>
            {slot.city} - {slot.club}
          </Text>
          <Text style={styles.hour}>10h - 11h30</Text>
        </View>
        <View>
          <Text style={styles.dispo}>
            {+slot.nbPlaces > 1
              ? +slot.nbPlaces + ' places disponibles'
              : +slot.nbPlaces + ' place disponible'}
          </Text>
        </View>
      </View>
      <View style={styles.footerContent}>
        <View style={styles.profileInfoContainer}>
          <View style={styles.profilePictureContainer}>
            <Image style={styles.profilePicture} source={require('@/assets/images/profile.png')} />
          </View>
          <View>
            <Text style={styles.name}>Antoine</Text>
          </View>
        </View>
        <View style={styles.levelContainer}>
          <Text style={styles.level}>niv {slot.level}</Text>
        </View>
      </View>
    </View>
  )
}

export default SlotCard

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    shadowColor: 'rgba(189, 189, 189, 0.24)',
    shadowOffset: { width: -1, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 8,
    backgroundColor: '#fff'
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  club: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Satoshi-Bold'
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
