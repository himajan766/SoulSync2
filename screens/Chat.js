import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER = 'user117';
const AI = 'user000';

const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    const getToken = async () => {
      try {
        const userToken = await AsyncStorage.getItem('accessToken');
        console.log("Chat");
        console.log(userToken);
        
        if (userToken !== null) {
          setToken(userToken);
          initiateChat(userToken);
        }
      } catch (error) {
        console.error('Error retrieving token:', error);
      }
    };

    getToken();
  }, []);

  const initiateChat = async (userToken) => {
    try {
      const response = await axios.get(
        'https://soulsync-v1.onrender.com/soul_sync/ai_wingman_initiate_conversation',
        {
          headers: {
            'Authorization': `bearer ${userToken}`,
            'accept': 'application/json',
          },
        }
      );

      // Handle the initiation response
      console.log('Initiate Chat Response:', response.data);

      // Display the AI's initial message
      const aiInitialMessage = {
        _id: response.data.message_id,
        text: response.data.text_message,
        createdAt: new Date(response.data.time),
        user: {
          _id: response.data.from_id,
          avatar: 'https://placeimg.com/140/140/any',
        },
      };

      setMessages([aiInitialMessage]);
    } catch (error) {
      console.error('Error initiating chat:', error);
      Alert.alert('Error', 'Failed to initiate chat');
    }
  };

  const onSend = useCallback(async (newMessages = []) => {
    // Update the state with the new message
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    // Your send message logic here
  }, []);

  const renderSend = props => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{ marginBottom: 5, marginRight: 5 }}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
          left: {
            backgroundColor: '#e0e0e0',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <GiftedChat
        messages={messages}
        onSend={newMessages => onSend(newMessages)}
        user={{ _id: USER }}
        renderBubble={renderBubble}
        alwaysShowSend
        renderSend={renderSend}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
      />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
});
