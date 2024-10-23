import { useNavigation } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Title from '@/components/Title'

type HeaderProps = {
  title: string
  onBackPress?: () => void
  backRoute?: boolean
  subTitle?: string
  noHorizontalMargin?: boolean
}

const Header = ({
  title,
  onBackPress,
  backRoute = false,
  subTitle,
  noHorizontalMargin
}: HeaderProps) => {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress()
    } else {
      navigation.goBack()
    }
  }

  if (backRoute) {
    return (
      <Pressable
        onPress={handleBackPress}
        style={[
          styles.headerBackRouteContainer,
          { paddingTop: insets.top },
          noHorizontalMargin && styles.noHorizontaleMargin
        ]}
      >
        <ChevronLeftIcon color="#000" size={24} />
        <Title variant="headerTitle">{title}</Title>
      </Pressable>
    )
  }

  return (
    <View
      style={[
        styles.headerContainer,
        { paddingTop: insets.top },
        noHorizontalMargin && styles.noHorizontaleMargin
      ]}
    >
      <Title variant="headerTitle">{title}</Title>
      {subTitle && <Text style={[styles.subTitle]}>{subTitle}</Text>}
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  headerBackRouteContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginLeft: -6,
    paddingHorizontal: 16,
    marginBottom: 32,
    marginTop: 32
  },
  headerContainer: {
    paddingHorizontal: 16,
    marginBottom: 32,
    marginTop: 32
  },
  subTitle: {
    fontSize: 16,
    fontFamily: 'Satoshi-Regular',
    color: '#4E5D6B',
    marginBottom: 16
  },
  noHorizontaleMargin: {
    paddingHorizontal: 0
  }
})
