import { Link } from 'expo-router'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { accountStore } from '@/stores/account.store'

const AccountDetailList = () => {
  const { user } = accountStore()
  return (
    <View style={styles.container}>
      {user ? (
        <View>
          <Link href="/account/firstName" style={styles.infoContainer} asChild>
            <Pressable>
              <Text style={styles.label}>Prénom</Text>
              <Text style={styles.detail}>{user.firstName}</Text>
            </Pressable>
          </Link>
          <Pressable style={styles.infoContainer}>
            <Text style={styles.label}>Nom</Text>
            <Text style={styles.detail}>{user.lastName}</Text>
          </Pressable>
          <Pressable style={styles.infoContainer}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.detail}>{user.email}</Text>
          </Pressable>
        </View>
      ) : (
        <Text>Récupération des informations...</Text>
      )}
    </View>
  )
}

export default AccountDetailList

const styles = StyleSheet.create({
  container: {
    flex: 1
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
