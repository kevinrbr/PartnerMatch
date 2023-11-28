import React from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../components/Button';
import GoogleSvg from './../assets/images/google.svg';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

const GoogleSignInBtn = () => {
  // Fonction pour gérer la connexion Google
  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const googleToken = userInfo.idToken;

      // Ici, vous pouvez utiliser le token Google comme bon vous semble
      console.log('Token Google:', googleToken);

    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Connexion annulée');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Connexion en cours');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Google Play Services non disponibles');
      } else {
        console.error('Erreur lors de la connexion Google:', error);
      }
    }
  };

  return (
    <View>
      <Button
        title="Se connecter avec Google"
        accessibilityLabel="Bouton pour se connecter avec Google"
        variant='transparentSecondary'
        onPress={handleGoogleSignIn} // Ajoutez cette ligne pour gérer l'événement onPress
      >
        <GoogleSvg />
      </Button>
    </View>
  );
};

export default GoogleSignInBtn;