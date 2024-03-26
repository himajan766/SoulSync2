import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Chat from '../screens/Chat'; 
import Messages from '../screens/Messages';
import Profile from '../screens/Profile'; 
import LoginScreen from '../screens/LoginScreen';
import CreateUser from '../screens/CreateUser';
import CreateProfile from '../screens/CreateProfile'; // Import CreateProfile screen
import Home from '../screens/Home'
import SwipeScreen from '../screens/Suggestions';
import SettingsScreen from '../screens/Settings';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MessagesStack = () => {
  return (
    <Stack.Navigator initialRouteName="Messages" screenOptions={{ headerLeft: null, headerShown: false }}>
      <Stack.Screen
        name="Messages"
        component={Messages}
        options={{ headerShown: false }} // Show header for the first screen
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: true }} // Hide header for subsequent screens
      />
    </Stack.Navigator>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Messages"  component={MessagesStack} />
      <Tab.Screen name="Home"  component={Home} />
      <Tab.Screen name="Suggestions"  component={SwipeScreen} />
      <Tab.Screen name="Settings"  component={SettingsScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CreateUser" component={CreateUser} />
        <Stack.Screen name="CreateProfile" component={CreateProfile} />
        <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
