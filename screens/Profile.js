import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Profile = () => {
  const [instagramTracked, setInstagramTracked] = useState(false);
  const [facebookTracked, setFacebookTracked] = useState(false);
  const [spotifyTracked, setSpotifyTracked] = useState(false);

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

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/ProfilePhoto.png')}
        style={styles.profileImage}
      />
      <View style={styles.contentContainer}>
        <View style={styles.aboutContainer}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.infoBox}>
            <Text>Occupation:</Text>
            <Text style={styles.infoText}>Software Developer</Text>
          </View>
          <View style={styles.infoBox}>
            <Text>Interests:</Text>
            <Text style={styles.infoText}>Hiking, reading, painting</Text>
          </View>
          <View style={styles.infoBox}>
            <Text>Age:</Text>
            <Text style={styles.infoText}>25</Text>
          </View>
          <View style={styles.infoBox}>
            <Text>Location:</Text>
            <Text style={styles.infoText}>City, Country</Text>
          </View>
          <View style={styles.infoBox}>
            <Text>Bio:</Text>
            <Text style={styles.infoText}>Love being outdoors and meeting new people.</Text>
          </View>
        </View>
        <View style={styles.optionsContainer}>
          <Text style={styles.sectionTitle}>Options</Text>
          <TouchableOpacity
            style={styles.optionItem}
            onPress={() => handleToggleTracking('instagram')}
          >
            <Image
              source={require('../assets/instagram-icon.png')}
              style={styles.icon}
            />
            <Text style={instagramTracked ? styles.boldText : null}>
              Let app track Instagram
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionItem}
            onPress={() => handleToggleTracking('facebook')}
          >
            <Image
              source={require('../assets/facebook-icon.png')}
              style={styles.icon}
            />
            <Text style={facebookTracked ? styles.boldText : null}>
              Let app track Facebook
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionItem}
            onPress={() => handleToggleTracking('spotify')}
          >
            <Image
              source={require('../assets/spotify-icon.png')}
              style={styles.icon}
            />
            <Text style={spotifyTracked ? styles.boldText : null}>
              Let app track Spotify
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', // Align content at the top
    paddingTop: 70, // Add padding at the top
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  aboutContainer: {
    marginBottom: 20,
  },
  optionsContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 10,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default Profile;
