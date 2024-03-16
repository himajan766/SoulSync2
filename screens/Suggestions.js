import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TouchableHighlight } from 'react-native';

const profiles = [
  {
    id: 1,
    name: 'Shreya',
    age: 25,
    occupation: 'Software Engineer',
    interests: 'Hiking, Photography, Reading',
    location: 'San Francisco, CA',
    bio: 'I\'m a tech enthusiast who loves exploring nature and capturing moments through photography.',
    hobbies: 'Coding, hiking, photography, reading, traveling',
    preferences: 'Looking for someone who shares similar interests and values.',
    image: require('../assets/Profile1.png'),
  },
  {
    id: 2,
    name: 'Ava',
    age: 22,
    occupation: 'Graphic Designer',
    interests: 'Painting, Traveling, Cooking',
    location: 'New York, NY',
    bio: 'Passionate about art and design. Always seeking inspiration from my surroundings.',
    hobbies: 'Painting, traveling, cooking, watching movies',
    preferences: 'Seeking a creative soul with a zest for life.',
    image: require('../assets/Profile2.png'),
  },
  {
    id: 3,
    name: 'Jenna',
    age: 24,
    occupation: 'Teacher',
    interests: 'Yoga, Music, Writing',
    location: 'Los Angeles, CA',
    bio: 'Educator by profession, yogi by passion. Love spreading positivity and mindfulness.',
    hobbies: 'Yoga, music, writing, meditation, cooking',
    preferences: 'Looking for someone who values health, mindfulness, and personal growth.',
    image: require('../assets/Profile3.png'),
  },
  {
    id: 4,
    name: 'Luna',
    age: 23,
    occupation: 'Marketing Specialist',
    interests: 'Dancing, Fitness, Movies',
    location: 'Chicago, IL',
    bio: 'Marketing professional with a love for dance and fitness. Enjoy movie nights and trying out new cuisines.',
    hobbies: 'Dancing, fitness, watching movies, trying new foods',
    preferences: 'Seeking someone who enjoys staying active, exploring new places, and good food.',
    image: require('../assets/Profile4.png'),
  },
];

const SwipeScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleSwipeLeft = () => {
    setCurrentIndex(currentIndex === profiles.length - 1 ? 0 : currentIndex + 1);
  };

  const handleSwipeRight = () => {
    setCurrentIndex(currentIndex === profiles.length - 1 ? 0 : currentIndex + 1);
  };

  const handleProfileClick = (index) => {
    setSelectedProfile(profiles[index]);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {currentIndex < profiles.length && (
        <TouchableOpacity onPress={() => handleProfileClick(currentIndex)}>
          <View style={styles.profileCard}>
            <Image source={profiles[currentIndex].image} style={styles.image} />
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{profiles[currentIndex].name}, {profiles[currentIndex].age}</Text>
              <Text style={styles.details}>{profiles[currentIndex].occupation}</Text>
              <Text style={styles.details}>{profiles[currentIndex].interests}</Text>
              <Text style={styles.details}>Location: {profiles[currentIndex].location}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, styles.leftButton]} onPress={handleSwipeLeft}>
          <Text style={styles.buttonText}>X</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.rightButton]} onPress={handleSwipeRight}>
          <Text style={styles.buttonText}>✓</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>AI Wingman Matchmaking Analysis</Text>
            {selectedProfile && (
              <View>
                <Text>{selectedProfile.name} seems to be a good match for you because:</Text>
                <Text>Bio: {selectedProfile.bio}</Text>
                <Text>Hobbies: {selectedProfile.hobbies}</Text>
                <Text>Preferences: {selectedProfile.preferences}</Text>
              </View>
            )}
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 20,
    width: 300,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  infoContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  details: {
    fontSize: 16,
    marginBottom: 3,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: { 
    width: 100,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  leftButton: {
    backgroundColor: '#FF6347', // Red color for X button
  },
  rightButton: {
    backgroundColor: '#32CD32', // Green color for Check button
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default SwipeScreen;




