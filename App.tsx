import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';

type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {

  const [fontsLoaded] = useFonts({
    'Satoshi-Regular': require('./assets/fonts/Satoshi-Regular.otf'),
    'Satoshi-Bold': require('./assets/fonts/Satoshi-Bold.otf'),
  });

if (!fontsLoaded) {
  return null;
}

  return (
      <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen 
              name="SignIn" 
              component={SignIn} 
              options={{ 
                headerShown: false, 
                contentStyle: {backgroundColor: '#fff'} 
              }} 
            />
            <Stack.Screen 
              name="SignUp" 
              component={SignUp} 
              options={{ 
                headerShown: false, 
                contentStyle: {backgroundColor: '#fff'} 
              }} 
            />
          </Stack.Navigator>
      </NavigationContainer>
  );
}