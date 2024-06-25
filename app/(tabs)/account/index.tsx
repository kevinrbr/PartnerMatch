import { router } from 'expo-router'
import { StyleSheet, View, Text, Image, Pressable } from 'react-native'
import { ArrowLeftStartOnRectangleIcon } from 'react-native-heroicons/outline'

import Button from '@/components/Button'
import Title from '@/components/Title'
import { useLogout } from '@/services/account/useLogout'
import { useUser } from '@/services/account/useUser'

const Account = () => {
  const { mutate: logout } = useLogout()
  const { data: user, isLoading, isError } = useUser()
  const editProfil = () => {
    router.push({ pathname: '/account/accountDetailList/' })
  }

  const handleLogout = async () => {
    await logout()
  }

  return (
    <View style={styles.container}>
      <Title variant="pageTitle">Profil</Title>
      {user ? (
        <View>
          <View style={styles.header}>
            <View style={styles.profilePictureContainer}>
              <Image
                style={styles.profilePicture}
                source={require('@/assets/images/profile.png')}
              />
            </View>
            <View>
              <Text style={styles.name}>
                {user.lastName} {user.firstName}
              </Text>
              <Text style={styles.email}>{user.email}</Text>
            </View>
          </View>
          <Button title="Editer mon profil" onPress={editProfil} />
        </View>
      ) : (
        <Text>Chargement des détails du profil...</Text>
      )}
      <Pressable style={styles.disconnectLinkContainer} onPress={handleLogout}>
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
    paddingTop: 80,
    paddingHorizontal: 16
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
