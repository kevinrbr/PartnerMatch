import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type EmptyContentProps = {
  title: string
  content: string
}

const EmptyContent = ({ title, content }: EmptyContentProps) => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{title}</Text>
      <Text style={styles.emptyDescription}>{content}</Text>
    </View>
  )
}

export default EmptyContent

const styles = StyleSheet.create({
  emptyContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginVertical: 48
  },
  emptyText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24
  },
  emptyDescription: {
    marginTop: 12,
    fontSize: 14,
    fontFamily: 'Satoshi-Regular',
    color: '#4E5D6B'
  }
})
