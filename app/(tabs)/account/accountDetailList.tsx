import { useState, useEffect } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { getProfilesDetails } from '@/services/account'

const AccountDetailList = () => {
  const [details, setDetails] = useState(null)

  useEffect(() => {
    async function fetchProfileDetails() {
      try {
        const details = await getProfilesDetails()
        setDetails(details)
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du profil:', error)
      }
    }

    fetchProfileDetails()
  }, [])

  return (
    <View style={styles.container}>
      {details && (
        <View>
          <Pressable style={styles.infoContainer}>
            <Text style={styles.label}>Prénom</Text>
            <Text style={styles.detail}>{details.firstName}</Text>
          </Pressable>
          <Pressable style={styles.infoContainer}>
            <Text style={styles.label}>Nom</Text>
            <Text style={styles.detail}>{details.lastName}</Text>
          </Pressable>
          <Pressable style={styles.infoContainer}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.detail}>{details.email}</Text>
          </Pressable>
        </View>
      )}
    </View>
  )
}

export default AccountDetailList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  infoContainer: {
    marginTop: 24
  },
  label: {
    fontFamily: 'Satoshi-Regular'
  },
  detail: {
    fontFamily: 'Satoshi-Bold',
    color: '#FF7131'
  }
})
