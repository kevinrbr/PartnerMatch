import { Text, StyleSheet, TextProps } from 'react-native'

type TitleProps = TextProps & {
  variant?: 'mainTitle' | 'subTitle' | 'pageTitle' | 'headerTitle'
  hasSubtitle?: boolean
}

const Title = ({ variant = 'mainTitle', hasSubtitle = false, ...props }: TitleProps) => {
  return (
    <Text {...props} style={[styles[variant], hasSubtitle && styles.hasSubtitle]}>
      {props.children}
    </Text>
  )
}

const styles = StyleSheet.create({
  mainTitle: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold'
  },
  hasSubtitle: {
    marginBottom: 2
  },
  pageTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#191822',
    marginBottom: 32
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    color: '#191822',
    marginBottom: 0
  },
  subTitle: {
    fontSize: 16,
    fontFamily: 'Satoshi-Regular',
    color: '#4E5D6B',
    marginBottom: 16
  }
})

export default Title
