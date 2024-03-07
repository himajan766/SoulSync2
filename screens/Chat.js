import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const apiUrl = 'http://127.0.0.1:8000/soul_sync/ai_wingman_initiate_chat/';

    const initiateChat = async () => {
      try {
        // Make a POST request to initiate the chat
        const response = await axios.post(apiUrl, {
          from_id: 'user123',
          to_id: 'user000',
        });

        // Handle the response as needed
        console.log('Initiate Chat Response:', response.data);

        // Fetch messages after initiating the chat
        fetchMessages();
      } catch (error) {
        console.error('Error initiating chat:', error);
      }
    };

    const fetchMessages = async () => {
      try {
        // Make a GET request to fetch messages
        const messagesResponse = await axios.get(
          'http://127.0.0.1:8000/soul_sync/get_messages/?from_id=user123&to_id=user000&offset=0&limit=20'
        );

        // Extract relevant information from the backend response
        const backendMessages = messagesResponse.data.map(msg => ({
          _id: msg.message_id.toString(),
          text: msg.text_message,
          createdAt: new Date(msg.timestamp), // adjust according to your backend response
          user: {
            _id: msg.from_id.toString(),
            avatar: 'https://placeimg.com/140/140/any', // adjust as needed
          },
        }));

        // Update the state with the backend messages
        setMessages(backendMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    // Call the initiateChat function when the component mounts
    initiateChat();
  }, []);

  const onSend = useCallback((newMessages = []) => {
    // Update the state with the new messages
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages),
    );

    // Additional logic to send the new messages to the backend if needed
    // ...

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
    <GiftedChat
      messages={messages}
      onSend={newMessages => onSend(newMessages)}
      user={{
        _id: 'user123',
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
