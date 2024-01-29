import { ReactNode } from 'react'
import {
  StyleSheet,
  Button as NativeButton,
  ButtonProps as NativeButtonProps,
  View
} from 'react-native'

type ButtonProps = NativeButtonProps & {
  variant?: 'primary' | 'secondary' | 'transparent' | 'transparentSecondary'
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

const Button = ({ variant = 'primary', ...props }: ButtonProps) => {
  const buttonColor = getButtonColor(variant)
  console.log(props.disabled)
  return (
    <View style={[styles[variant], styles.button, props.disabled && styles.disabledBtn]}>
      <NativeButton {...props} color={buttonColor} />
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 12,
    fontFamily: 'Satoshi-Regular',
    height: 48,
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20
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
