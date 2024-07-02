import { Link } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { ChevronRightIcon } from 'react-native-heroicons/outline'

type RedirectLinkProps = {
  text: string
  link: string
}

const RedirectLink = ({ text, link }: RedirectLinkProps) => {
  return (
    <Link href={link} asChild>
      <Pressable style={styles.container}>
        <Text style={styles.text}>{text}</Text>
        <ChevronRightIcon color="#000" size={24} />
      </Pressable>
    </Link>
  )
}

export default RedirectLink

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 24
  },
  text: {
    fontSize: 16,
    fontFamily: 'Satoshi-Regular',
    color: '#4E5D6B'
  }
})
