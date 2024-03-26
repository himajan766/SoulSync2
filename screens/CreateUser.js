import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TextInput as PaperTextInput, Button as PaperButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const CreateUser = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleCreateProfile = async () => {
    if (!username || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      // Make a POST request to create user
      const response = await axios.post('https://soulsync-v1.onrender.com/users', {
        username: username,
        email: email,
        password: password,
      });

      // Check if user creation was successful
      if (response.status === 200) {
        // Navigate to the CreateProfile screen
        navigation.navigate('CreateProfile', { username, password });
      } else {
        // Handle error if user creation fails
        console.error('Error creating user:', response.data);
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create User Account</Text>
      <PaperTextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <PaperTextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
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
        <PaperButton mode="outlined" onPress={handleBack} style={styles.button}>
          Back
        </PaperButton>
        <PaperButton mode="contained" onPress={handleCreateProfile} style={styles.button}>
          Create Account
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
    marginTop: 20,
  },
  button: {
    width: '45%',
  },
});

export default CreateUser;