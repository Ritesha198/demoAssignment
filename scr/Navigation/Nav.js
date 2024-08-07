import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../Task1/LoginScreen';
import HomeScreen from '../Task1/HomeScreen';
import Ask from '../Ask';
import Dynamic from '../Task2/Dynamic';

const Stack = createNativeStackNavigator();

const Nav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Ask">
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Ask" component={Ask} options={{headerShown: false}}/>
        <Stack.Screen name="Dynamic" component={Dynamic} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Nav;
