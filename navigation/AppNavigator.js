// AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Chat from '../screens/Chat'; 
import Messages from '../screens/Messages';
import { Profiler } from 'react';
import Profile from '../screens/Profile'; 

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const MessagesStack = () => {
    return (
      <Stack.Navigator initialRouteName="Messages">
        <Stack.Screen name="Messages" component={Messages} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    );
  };
const AppNavigator = () => {
  return (
    <NavigationContainer>
      
      <Tab.Navigator initialRouteName="Profile" screenOptions={{
        headerShown:false
      }}>
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Messages"  component={MessagesStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

AppNavigator.js





