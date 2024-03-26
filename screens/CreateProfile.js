import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TextInput as PaperTextInput, Button as PaperButton } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateProfile = ({ route }) => {
  const { username, password } = route.params;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [occupation, setOccupation] = useState('');
  const [interests, setInterests] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');

  const handleCreateProfile = async () => {
    if (!firstName || !lastName || !occupation || !interests || !age || !location || !bio) {
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

        // Store the access token in AsyncStorage
      const accessToken = response.data.access_token
      await AsyncStorage.setItem('accessToken', response.data.access_token);
      console.log('Token:', response.data.access_token);

      // Make a POST request to create user profile with the access token in the header
      const profileResponse = await axios.post('https://soulsync-v1.onrender.com/user_profiles', {
        first_name: firstName,
        last_name: lastName,
        occupation: occupation,
        interests: interests,
        age: parseInt(age),
        location: location,
        bio: bio,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          accept: 'application/json',
          'Content-Type': 'application/json',
        }
      });

      if (profileResponse.status === 200) {
        // Handle success
        console.log('User profile created successfully:', profileResponse.data);
        navigation.navigate('BottomTabNavigator');
      } else {
        // Handle error if user profile creation fails
        console.error('Error creating user profile:', profileResponse.data);
        Alert.alert('Error', 'Failed to create user profile.');
      }
    } catch (error) {
      console.error('Error creating user profile:', error);
      Alert.alert('Error', 'An error occurred while trying to create user profile.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create User Profile</Text>
      <PaperTextInput
        label="First Name"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
      />
      <PaperTextInput
        label="Last Name"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />
      <PaperTextInput
        label="Occupation"
        value={occupation}
        onChangeText={setOccupation}
        style={styles.input}
      />
      <PaperTextInput
        label="Interests"
        value={interests}
        onChangeText={setInterests}
        style={styles.input}
      />
      <PaperTextInput
        label="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={styles.input}
      />
      <PaperTextInput
        label="Location"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
      />
      <PaperTextInput
        label="Bio"
        value={bio}
        onChangeText={setBio}
        style={styles.input}
      />
      <PaperButton mode="contained" onPress={handleCreateProfile}>
        Create Profile
      </PaperButton>
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
});

export default CreateProfile;
