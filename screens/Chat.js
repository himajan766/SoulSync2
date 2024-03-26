import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [token, setToken] = useState('');
  const [conversationId, setConversationId] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const userToken = await AsyncStorage.getItem('accessToken');
        if (userToken) {
          setToken(userToken);
          initiateChat(userToken);
          initiateConversation(userToken);
        }
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          setUserId(storedUserId);
        }
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };

    loadData();
  }, []);

  const initiateConversation = async (userToken) => {
    try {
      const response = await axios.post(
        'https://soulsync-v1.onrender.com/conversations',
        {},
        {
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'accept': 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
  
      const conversationId = response.data.id;
      setConversationId(conversationId);
      console.log('Conversation ID:', conversationId);
    } catch (error) {
      console.error('Error initiating conversation:', error);
      Alert.alert('Error', 'Failed to initiate conversation');
    }
  };
  
  const initiateChat = async (userToken) => {
    try {
      const response = await axios.get(
        'https://soulsync-v1.onrender.com/soul_sync/ai_wingman_initiate_conversation',
        {
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'accept': 'application/json',
          },
        }
      );

      console.log('Initiate Chat Response:', response.data);

      const aiInitialMessage = {
        _id: response.data.message_id,
        text: response.data.text_message,
        createdAt: new Date(response.data.time),
        user: {
          _id: response.data.sender_id,
          avatar: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
        },
      };

      setMessages([aiInitialMessage]);
    } catch (error) {
      console.error('Error initiating chat:', error);
      Alert.alert('Error', 'Failed to initiate chat');
    }
  };

  const onSend = useCallback(async (newMessages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));

    try {
      await axios.post(
        `https://soulsync-v1.onrender.com/conversations/${conversationId}/messages`,
        {
          content: newMessages[0].text,
          conversation_id: conversationId,
          sender_id: userId,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'accept': 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      const aiResponse = await axios.post(
        'https://soulsync-v1.onrender.com/soul_sync/ai_wingman_conversation',
        {
          conversation_id: conversationId,
          content: newMessages[0].text,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'accept': 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      const aiMessage = {
        _id: aiResponse.data.message_id,
        text: aiResponse.data.text_message,
        createdAt: new Date(aiResponse.data.time),
        user: {
          _id: aiResponse.data.from_id,
          avatar: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
        },
      };

      setMessages(previousMessages => GiftedChat.append(previousMessages, [aiMessage]));
    } catch (error) {
      console.error('Error sending message to backend:', error);
      Alert.alert('Error', 'Failed to send message to backend');
    }
  }, [conversationId, token, userId]);

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
        user={{ _id: userId }}
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
