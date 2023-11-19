import { Text, StyleSheet, TextProps } from 'react-native'
import React from 'react'

type TitleProps = TextProps & {
    variant: 'mainTitle' | 'subTitle';
};

const Title = ({ variant, ...props }: TitleProps) => {
  return (
      <Text {...props} style={styles[variant]}> { props.children }</Text>
  )
}

const styles = StyleSheet.create({
    mainTitle: {
        fontSize: 32,
        fontFamily: 'Satoshi-Bold',
        fontStyle: 'italic',
    },
    subTitle: {
        fontSize: 24,
        fontFamily: 'Satoshi-Bold',
    },
});

export default Title