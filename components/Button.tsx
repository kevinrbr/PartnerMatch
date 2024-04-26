import { ReactNode } from 'react'
import { Pressable } from 'react-native'
import {
  StyleSheet,
  Button as NativeButton,
  ButtonProps as NativeButtonProps,
  TouchableWithoutFeedback
} from 'react-native'
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
    height: 48,
    borderRadius: 24,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16
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
