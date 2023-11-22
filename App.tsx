import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Home from './screens/Home'; // Importez votre composant de page d'accueil
import { Session } from '@supabase/supabase-js';
import { supabaseAuth } from './services/constants';

const Stack = createNativeStackNavigator();

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabaseAuth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabaseAuth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const [fontsLoaded] = useFonts({
    'Satoshi-Regular': require('./assets/fonts/Satoshi-Regular.otf'),
    'Satoshi-Bold': require('./assets/fonts/Satoshi-Bold.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  // Ajoutez la redirection conditionnelle ici
  if (session && session.user) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home} // Utilisez le composant de votre page d'accueil
            options={{
              headerShown: false,
              contentStyle: { backgroundColor: '#fff' },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{
              headerShown: false,
              contentStyle: { backgroundColor: '#fff' },
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{
              headerShown: false,
              contentStyle: { backgroundColor: '#fff' },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}