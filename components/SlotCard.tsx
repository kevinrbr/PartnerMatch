import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

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
            <Text style={styles.note}>5</Text>
          </View>
        </View>
        <View style={styles.level}>
          <Text>niv 2/3</Text>
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
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Satoshi-Bold'
  },
  hour: {
    fontSize: 14,
    fontStyle: 'italic',
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
    borderRadius: 100
  },
  profilePicture: {
    width: '100%',
    height: '100%',
    fontFamily: 'Satoshi-Regular'
  },
  profilContent: {},
  level: {},
  name: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14
  },
  note: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 14
  }
})
