import { Link } from 'expo-router'
import { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Image, Pressable } from 'react-native'
import { ArrowLeftStartOnRectangleIcon } from 'react-native-heroicons/outline'

import Button from '@/components/Button'
import Title from '@/components/Title'
import { getProfilesDetails, signOut } from '@/services/account'

const Account = () => {
  const [profileDetails, setProfileDetails] = useState(null)

  const editProfil = () => {
    // Logique pour l'édition du profil
  }

  const fetchProfileDetails = async () => {
    try {
      const details = await getProfilesDetails()
      setProfileDetails(details)
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
            <Text style={styles.email}>{profileDetails.email}</Text>
          </View>
        </View>
      ) : (
        <Text>Chargement des détails du profil...</Text>
      )}
      <Link href="/account/accountDetailList" asChild>
        <Button title="Editer mon profil" onPress={editProfil} />
      </Link>
      <Pressable style={styles.disconnectLinkContainer} onPress={signOut}>
        <ArrowLeftStartOnRectangleIcon color="#182A60" />
        <Text style={styles.disconnectLink}>Se deconnecter</Text>
      </Pressable>
    </View>
  )
}

export default Account

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 80
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
    fontSize: 14,
    color: '#4E5D6B'
  },
  disconnectLinkContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16
  },
  disconnectLink: {
    marginLeft: 8,
    color: '#4E5D6B',
    fontSize: 16,
    fontFamily: 'Satoshi-Regular'
  }
})
