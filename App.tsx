import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

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
              name="Home" 
              component={HomeScreen} 
              options={{ 
                headerShown: false, 
                contentStyle: {backgroundColor: '#fff'} 
              }} 
            />
          </Stack.Navigator>
      </NavigationContainer>
  );
}