import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TextInput as PaperTextInput, Button as PaperButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Validate email and password fields
    if (!username || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      // Make a POST request to get the token
      const response = await axios.post(
        'https://soulsync-v1.onrender.com/token',
        `grant_type=&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&client_id=&client_secret=`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'accept': 'application/json',
          },
        }
      );

      // Check if the request was successful
      if (response.status === 200) {
        // Store the access token in AsyncStorage
        await AsyncStorage.setItem('accessToken', response.data.access_token);
        console.log('Token:', response.data.access_token);

        // Navigate to the main screen
        navigation.navigate('BottomTabNavigator');
      } else {
        // Handle unexpected response status codes
        console.error('Unexpected status code:', response.status);
        Alert.alert('Error', 'Failed to authenticate. Unexpected response from server.');
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error during login:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
      Alert.alert('Error', 'An error occurred while trying to log in. Please try again later.');
    }
  };

  const handleSignUp = () => {
    // Navigate to the user profile page for sign up
    navigation.navigate('CreateUser');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <PaperTextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <PaperTextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <PaperButton mode="contained" onPress={handleLogin} style={styles.button}>
          Login
        </PaperButton>
        <PaperButton mode="outlined" onPress={handleSignUp} style={styles.button}>
          Sign Up
        </PaperButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    width: '45%',
  },
});

export default LoginScreen;
