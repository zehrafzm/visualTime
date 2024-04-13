import React from 'react';
import { NavigationContainer  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CreateTimer from '../screens/CreateTimer';
import StartEnd from '../screens/StartEnd';
import Visual from '../screens/Visual';
import VisualSE from '../screens/VisualSE';
import OneTime from '../screens/OneTime';
import VisualOne from '../screens/VisualOne';


function Navigation() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer >
 <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: 'white',
            height:80 // Set the background color of the header
          },
          headerTintColor: 'black', // Set the text color of the header
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize:10
          },
        }}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="CreateTimer" component={CreateTimer} />
        <Stack.Screen name="StartEnd" component={StartEnd} />
        <Stack.Screen name="Visual" component={Visual} />
        <Stack.Screen name="VisualSE" component={VisualSE} />
        <Stack.Screen name="OneTime" component={OneTime} />
        <Stack.Screen name="VisualOne" component={VisualOne} />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

export default Navigation;
