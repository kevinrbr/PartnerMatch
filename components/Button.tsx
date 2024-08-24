import { ReactNode } from 'react'
import { Pressable, StyleSheet, ButtonProps as NativeButtonProps } from 'react-native'
import { Text } from 'react-native-elements'

type ButtonProps = NativeButtonProps & {
  variant?: 'primary' | 'secondary' | 'transparent' | 'transparentSecondary'
  title: string
  children?: ReactNode
  onPress: () => void
}

const getButtonColor = (
  variant: 'primary' | 'secondary' | 'transparent' | 'transparentSecondary'
): string => {
  switch (variant) {
    case 'secondary':
      return '#fff'
    case 'transparent':
      return '#FF7131'
    case 'transparentSecondary':
      return '#182A60'
    default:
      return '#fff'
  }
}

const Button = ({ onPress, title, variant = 'primary', ...props }: ButtonProps) => {
  return (
    <Pressable
      style={[styles[variant], styles.button, props.disabled && styles.disabledBtn]}
      onPress={onPress}
    >
      <Text style={styles.btnText}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 44,
    borderRadius: 100,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    fontFamily: 'Satoshi-Bold',
    fontSize: 16,
    color: '#fff'
  },
  primary: {
    backgroundColor: '#FF7131'
  },
  secondary: {
    backgroundColor: '#182A60'
  },
  transparent: {
    backgroundColor: 'none',
    borderWidth: 1,
    borderColor: '#FF7131',
    borderStyle: 'solid'
  },
  transparentSecondary: {
    backgroundColor: 'none',
    borderWidth: 1,
    borderColor: '#182A60',
    borderStyle: 'solid'
  },
  disabledBtn: {
    opacity: 0.3
  }
})

export default Button
