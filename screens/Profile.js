import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Card, Title, Paragraph, Switch } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ route }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [instagramTracked, setInstagramTracked] = useState(false);
  const [facebookTracked, setFacebookTracked] = useState(false);
  const [spotifyTracked, setSpotifyTracked] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (token !== null) {
          setToken(token);
          fetchUserProfile(token);
        }
      } catch (error) {
        console.error('Error retrieving token:', error);
      }
    };

    getToken();
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get('https://soulsync-v1.onrender.com/user_profiles', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });
      setUserProfile(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    if (userProfile) {
      setInstagramTracked(userProfile.instagramTracked);
      setFacebookTracked(userProfile.facebookTracked);
      setSpotifyTracked(userProfile.spotifyTracked);
    }
  }, [userProfile]);

  const handleToggleTracking = (platform) => {
    switch (platform) {
      case 'instagram':
        setInstagramTracked(!instagramTracked);
        break;
      case 'facebook':
        setFacebookTracked(!facebookTracked);
        break;
      case 'spotify':
        setSpotifyTracked(!spotifyTracked);
        break;
      default:
        break;
    }
  };

  if (!userProfile) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Avatar.Image
        size={150}
        source={require('../assets/ProfilePhoto.png')}
        style={styles.profileImage}
      />
      <Card style={styles.card}>
        <Card.Content>
          <Title>About</Title>
          <Paragraph>Occupation: {userProfile.occupation}</Paragraph>
          <Paragraph>Interests: {userProfile.interests}</Paragraph>
          <Paragraph>Age: {userProfile.age}</Paragraph>
          <Paragraph>Location: {userProfile.location}</Paragraph>
          <Paragraph>Bio: {userProfile.bio}</Paragraph>
        </Card.Content>
      </Card>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Options</Title>
          <View style={styles.optionItem}>
            <Image
              source={require('../assets/instagram-icon.png')}
              style={styles.icon}
            />
            <Paragraph>Let app track Instagram</Paragraph>
            <Switch
              value={instagramTracked}
              onValueChange={() => handleToggleTracking('instagram')}
            />
          </View>
          <View style={styles.optionItem}>
            <Image
              source={require('../assets/facebook-icon.png')}
              style={styles.icon}
            />
            <Paragraph>Let app track Facebook</Paragraph>
            <Switch
              value={facebookTracked}
              onValueChange={() => handleToggleTracking('facebook')}
            />
          </View>
          <View style={styles.optionItem}>
            <Image
              source={require('../assets/spotify-icon.png')}
              style={styles.icon}
            />
            <Paragraph>Let app track Spotify</Paragraph>
            <Switch
              value={spotifyTracked}
              onValueChange={() => handleToggleTracking('spotify')}
            />
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  profileImage: {
    marginBottom: 20,
  },
  card: {
    marginBottom: 20,
    width: '100%',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
});

export default Profile;
