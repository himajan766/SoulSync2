import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Messages = [
  {
    id: '1',
    userName: 'Pikachu (AI)',
    messageTime: '4 mins ago',
    messageText: 'That sounds great!',
    userAvatar: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
  },
  {
    id: '2',
    userName: 'Selina Paul',
    messageTime: '2 hours ago',
    messageText:
      'I am looking forward to that :)',
    userAvatar: 'https://placekitten.com/40/40',
  },
  {
    id: '3',
    userName: 'Kristy William',
    messageTime: '1 hours ago',
    messageText:
      'I know right!!! We should totally go next time.',
    userAvatar: 'https://placekitten.com/40/40',
  }
];

const MessagesScreen = ({navigation }) => {
    const renderChatItem = ({ item }) => (
      <TouchableOpacity onPress={() => navigation.navigate('Chat', { userName: item.userName })}>
        <View style={styles.chatItem}>
          <Image source={{ uri: item.userAvatar }} style={styles.userAvatar} />
          <View style={styles.messageContent}>
            <Text style={styles.userName}>{item.userName}</Text>
            <Text style={styles.messageTime}>{item.messageTime}</Text>
            <Text style={styles.messageText}>{item.messageText}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  
    return (
      <View style={styles.container}>
        <FlatList
          data={Messages}
          keyExtractor={item => item.id}
          renderItem={renderChatItem}
        />


      </View>
    );
  };
  
  export default MessagesScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    chatItem: {
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      padding: 10,
    },
    userAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
    },
    userName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    messageTime: {
      color: '#888',
    },
    messageText: {
      marginTop: 5,
    },
  });