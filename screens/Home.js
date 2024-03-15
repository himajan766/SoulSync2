import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const Home = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Home</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <Text>Eeevee</Text>
          <Text>97%</Text>
        </View>
        <View style={styles.info}>
          <Text>Level 7</Text>
          <Text>INFJ</Text>
        </View>
      </View>
      <Image
        source={require('../assets/EeveeTransparent.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.sectionContainer}>
        <View style={styles.box}>
          <Text style={styles.sectionTitle}>Summary of Today</Text>
          <View style={styles.bulletContainer}>
            <Text style={styles.bullet}>1.</Text>
            <Text style={styles.sectionText}>Conversed with 5 other Pokemons today!</Text>
          </View>
          <View style={styles.bulletContainer}>
            <Text style={styles.bullet}>2.</Text>
            <Text style={styles.sectionText}>Eevee picked up a treasure from Piedmont Park!</Text>
          </View>
          <View style={styles.bulletContainer}>
            <Text style={styles.bullet}>3.</Text>
            <Text style={styles.sectionText}>Eevee brought a potential quest!</Text>
          </View>
          {/* Add more bullet points as needed */}
        </View>
      </View>
      <View style={styles.sectionContainer}>
        <View style={styles.box}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <Text style={styles.quickActionText}>Review profile suggestions from Eevee</Text>
          </View>
          <View style={styles.quickActions}>
            <Text style={styles.quickActionText}>Daily Quest: Converse with Eevee</Text>
          </View>
          <View style={styles.quickActions}>
            <Text style={styles.quickActionText}>Replied to Diana’s message</Text>
          </View>
          {/* Add more quick actions as needed */}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 10,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#F65775",
    fontFamily: 'Helvetica',

  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  info: {
    alignItems: 'center',
  },
  image: {
    width: 200, // Adjust width as needed
    height: 200, // Adjust height as needed
    alignSelf: 'center', // Center the image horizontally
    marginBottom: 20,
  },
  sectionContainer: {
    marginBottom: 20,
    alignItems: 'center', // Center the content horizontally
  },
box: {
    borderRadius: 10, // Rounded corners
    padding: 10,
    width: '100%',
    shadowColor: '#000', // Shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Elevation for Android shadow
    backgroundColor: '#f0f0f0', // Light gray background color
    marginBottom: 20,
    borderColor: 'transparent', // Clear border color
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center', // Center the text horizontally
    color: "#F65775", 
    fontFamily: 'Helvetica',
  },
  sectionText: {
    textAlign: 'left', // Align the text to the left
    fontFamily: 'Helvetica',
  },
  bulletContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bullet: {
    marginRight: 5,
  },
  quickActions: {
    backgroundColor: '#8AC1F5',
    borderRadius: 20,
    padding: 10,
    marginBottom: 5,
  },
  quickActionText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default Home;


