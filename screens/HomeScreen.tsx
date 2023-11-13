import { Text, SafeAreaView, View, StyleSheet } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import TestSvg from './../assets/images/monsvg.svg';
import { title1 } from './../common/styles';

const HomeScreen = () => {

  const navigation = useNavigation();

  useLayoutEffect(() => {

  }, [])

  return (
    <SafeAreaView>
      <TestSvg />
      <View>
        <Text style={title1}>Je me connecte</Text>
        <Text style={styles.text}>La recherche de partenaires de padel est désormais facile</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  text: {
    color: '#4E5D6B',
  },
});

export default HomeScreen