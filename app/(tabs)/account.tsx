import { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

import Button from '@/components/Button'
import Title from '@/components/Title'
import { getProfilesDetails } from '@/services/account'

const Account = () => {
  const [profileDetails, setProfileDetails] = useState(null)

  const editProfil = () => {
    // Logique pour l'édition du profil
  }

  const fetchProfileDetails = async () => {
    try {
      const details = await getProfilesDetails()
      setProfileDetails(details[0])
    } catch (error) {
      console.error('Erreur lors de la récupération des détails du profil :', error.message)
    }
  }

  useEffect(() => {
    fetchProfileDetails()
  }, [])

  return (
    <View style={styles.container}>
      <Title variant="pageTitle">Profil</Title>
      {profileDetails ? (
        <View style={styles.header}>
          <View style={styles.profilePictureContainer}>
            <Image style={styles.profilePicture} source={require('@/assets/images/profile.png')} />
          </View>
          <View>
            {profileDetails && (
              <Text style={styles.name}>
                <Text style={styles.name}>
                  {profileDetails.lastName} {profileDetails.firstName}
                </Text>
              </Text>
            )}
            <Text style={styles.email}>kevinrbr16@gmail.com</Text>
          </View>
        </View>
      ) : (
        <Text>Chargement des détails du profil...</Text>
      )}
      <Button title="Editer mon profil" onPress={editProfil} />
    </View>
  )
}

export default Account

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24
  },
  profilePictureContainer: {
    width: 56,
    height: 56,
    overflow: 'hidden',
    borderRadius: 100,
    marginRight: 12
  },
  profilePicture: {
    width: '100%',
    height: '100%'
  },
  name: {
    fontFamily: 'Satoshi-Bold',
    fontSize: 16,
    color: '#000000'
  },
  email: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 12,
    color: '#4E5D6B'
  }
})
