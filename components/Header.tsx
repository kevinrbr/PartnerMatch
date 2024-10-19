import { useNavigation } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'

import Title from '@/components/Title'

type HeaderProps = {
  title: string
  onBackPress?: () => void
  layoutHeader?: boolean
  style?: ViewStyle
}

const Header = ({ title, onBackPress, layoutHeader, style }: HeaderProps) => {
  const navigation = useNavigation()

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress()
    } else {
      navigation.goBack()
    }
  }

  return (
    <Pressable
      onPress={handleBackPress}
      style={[styles.headerContainer, layoutHeader && styles.layoutHeader, style]}
    >
      <ChevronLeftIcon color="#000" size={24} />
      <Title variant="headerTitle">{title}</Title>
    </Pressable>
  )
}

export default Header

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginLeft: -6,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    marginBottom: 32
  },
  layoutHeader: {
    paddingTop: 80
  }
})
