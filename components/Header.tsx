import { useNavigation } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'

import Title from '@/components/Title'

type HeaderProps = {
  title: string
}
const Header = ({ title }: HeaderProps) => {
  const navigation = useNavigation()
  return (
    <Pressable onPress={() => navigation.goBack()} style={styles.headerContainer}>
      <ChevronLeftIcon color="#000" size={24} />
      <Title variant="pageTitle">{title}</Title>
    </Pressable>
  )
}

export default Header

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    paddingTop: 80,
    marginLeft: -6,
    backgroundColor: 'white'
  }
})
