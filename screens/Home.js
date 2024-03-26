import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';

const Home = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
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
      <Avatar.Image
        source={require('../assets/EeveeTransparent.png')}
        style={styles.image}
        size={200}
        resizeMode="contain"
      />
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Summary of Today</Title>
          <Paragraph style={styles.sectionText}>Conversed with 5 other Pokemons today!</Paragraph>
          <Paragraph style={styles.sectionText}>Eevee picked up a treasure from Piedmont Park!</Paragraph>
          <Paragraph style={styles.sectionText}>Eevee brought a potential quest!</Paragraph>
        </Card.Content>
      </Card>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Quick Actions</Title>
          <View style={styles.quickActions}>
            <Paragraph style={styles.quickActionText}>Review profile suggestions from Eevee</Paragraph>
          </View>
          <View style={styles.quickActions}>
            <Paragraph style={styles.quickActionText}>Daily Quest: Converse with Eevee</Paragraph>
          </View>
          <View style={styles.quickActions}>
            <Paragraph style={styles.quickActionText}>Replied to Diana’s message</Paragraph>
          </View>
        </Card.Content>
      </Card>
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
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  info: {
    alignItems: 'center',
  },
  image: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  card: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: "#F65775", 
    fontFamily: 'Helvetica',
  },
  sectionText: {
    textAlign: 'left',
    fontFamily: 'Helvetica',
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
