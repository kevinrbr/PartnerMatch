import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { StarIcon } from 'react-native-heroicons/outline'

const SlotCard = () => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardContent}>
        <View>
          <Text style={styles.club}>UCPA Nantes</Text>
          <Text style={styles.hour}>10h - 11h30</Text>
        </View>
        <View>
          <Text style={styles.dispo}>1 place disponible</Text>
        </View>
      </View>
      <View style={styles.footerContent}>
        <View style={styles.profileInfoContainer}>
          <View style={styles.profilePictureContainer}>
            <Image style={styles.profilePicture} source={require('@/assets/images/profile.png')} />
          </View>
          <View style={styles.profilContent}>
            <Text style={styles.name}>Antoine</Text>
            <View style={styles.noteContainer}>
              <Text style={styles.note}>5</Text>
              <StarIcon size={12} color="#000" style={styles.noteIcon} />
            </View>
          </View>
        </View>
        <View style={styles.levelContainer}>
          <Text style={styles.level}>niv 2/3</Text>
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
    flexDirection: 'row'
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
