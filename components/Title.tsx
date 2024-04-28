import { Text, StyleSheet, TextProps } from 'react-native'

type TitleProps = TextProps & {
  variant?: 'mainTitle' | 'subTitle' | 'pageTitle'
}

const Title = ({ variant = 'mainTitle', ...props }: TitleProps) => {
  return (
    <Text {...props} style={styles[variant]}>
      {props.children}
    </Text>
  )
}

const styles = StyleSheet.create({
  mainTitle: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold'
  },
  pageTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#191822',
    marginBottom: 24
  },
  subTitle: {
    fontSize: 24,
    fontFamily: 'Satoshi-Bold'
  }
})

export default Title
