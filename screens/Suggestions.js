import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TouchableHighlight } from 'react-native';

const profiles = [
  {
    id: 1,
    name: 'Shreya',
    age: 25,
    location: 'San Francisco, CA',
    summary: 'Shreya seems to be a good match for you because she shares similar interests in technology and outdoor activities.',
    image: require('../assets/Profile1.png'),
  },
  {
    id: 2,
    name: 'Ava',
    age: 22,
    location: 'New York, NY',
    summary: 'Ava could be a great match for you due to her creative nature and shared interests in artistic pursuits.',
    image: require('../assets/Profile2.png'),
  },
  {
    id: 3,
    name: 'Jenna',
    age: 24,
    location: 'Los Angeles, CA',
    summary: 'Jenna values mindfulness and positivity, making her a potential match for those who prioritize personal growth and well-being.',
    image: require('../assets/Profile3.png'),
  },

  {
    id: 4,
    name: 'Luna',
    age: 23,
    location: 'Chicago, IL',
    summary: 'Luna enjoys staying active and exploring new cuisines, making her a suitable match for those who share her adventurous spirit.',
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
            <View style={styles.imageContainer}>
              <Image source={profiles[currentIndex].image} style={styles.image} />
            </View>
            <Text style={styles.name}>{profiles[currentIndex].name}, {profiles[currentIndex].age}</Text>
            <Text style={styles.location}>{profiles[currentIndex].location}</Text>
            <Text style={styles.moreText}>Click to view more</Text>
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
            <Text style={styles.modalText}>Match Summary</Text>
            {selectedProfile && (
              <View>
                <Text style={styles.summaryText}>{selectedProfile.summary}</Text>
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
    backgroundColor: '#f0f0f0',
  },
  profileCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 20,
    width: 300,
    alignItems: 'center',
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: '#333',
  },
  location: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: '#666',
  },
  moreText: {
    fontSize: 14,
    color: '#2E86C1',
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
    textAlign: "center",
    fontWeight: 'bold',
    fontSize: 20,
  },
  summaryText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
});

export default SwipeScreen;
