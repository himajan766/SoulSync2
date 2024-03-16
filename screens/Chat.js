// import React, { useState, useEffect, useCallback } from 'react';
// import { View, StyleSheet } from 'react-native';
// import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import axios from 'axios';

// const USER = 'user113';
// const AI = 'user000';

// const ChatScreen = () => {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     const initiateChat = async () => {
//       try {
//         // Make a POST request to initiate the chat
//         const initiateResponse = await axios.post(
//           'http://127.0.0.1:8000/soul_sync/ai_wingman_initiate_chat/',
//           {
//             from_id: USER,
//             to_id: AI,
//           }
//         );

//         // Handle the initiation response as needed
//         console.log('Initiate Chat Response:', initiateResponse.data);

//         // Display the AI's initial message
//         const aiInitialMessage = {
//           _id: initiateResponse.data.message_id,
//           text: initiateResponse.data.text_message,
//           createdAt: new Date(initiateResponse.data.time),
//           user: {
//             _id: initiateResponse.data.from_id,
//             avatar: 'https://placeimg.com/140/140/any',
//           },
//         };

//         setMessages([aiInitialMessage]);
//       } catch (error) {
//         console.error('Error initiating chat:', error);
//       }
//     };

//     initiateChat();
//   }, []);

//   const onSend = useCallback(async (newMessages = []) => {
//     // Display the user's sent message
//     const sentMessage = {
//       _id: newMessages[0]._id,
//       text: newMessages[0].text,
//       createdAt: new Date(),
//       user: {
//         _id: USER,
//         avatar: 'https://placeimg.com/140/140/any',
//       },
//     };

//     setMessages(previousMessages =>
//       GiftedChat.append(previousMessages, [sentMessage])
//     );

//     try {
//       // Make a backend call to get AI reply
//       const aiReplyResponse = await axios.post(
//         'http://127.0.0.1:8000/soul_sync/ai_wingman_chat/',
//         {
//           text_message: newMessages[0].text,
//           from_id: AI,
//           to_id: USER,
//         }
//       );

//       // Display AI's reply
//       const aiReply = {
//         _id: aiReplyResponse.data.message_id,
//         text: aiReplyResponse.data.text_message,
//         createdAt: new Date(aiReplyResponse.data.time),
//         user: {
//           _id: aiReplyResponse.data.from_id,
//           avatar: 'https://placeimg.com/140/140/any',
//         },
//       };

//       setMessages(previousMessages =>
//         GiftedChat.append(previousMessages, [aiReply])
//       );
//     } catch (error) {
//       console.error('Error getting AI reply:', error);
//     }
//   }, []);

//   const renderSend = props => {
//     return (
//       <Send {...props}>
//         <View>
//           <MaterialCommunityIcons
//             name="send-circle"
//             style={{ marginBottom: 5, marginRight: 5 }}
//             size={32}
//             color="#2e64e5"
//           />
//         </View>
//       </Send>
//     );
//   };

//   const renderBubble = props => {
//     return (
//       <Bubble
//         {...props}
//         wrapperStyle={{
//           right: {
//             backgroundColor: '#2e64e5',
//           },
//           left: {
//             backgroundColor: '#e0e0e0', // Color for AI's reply
//           },
//         }}
//         textStyle={{
//           right: {
//             color: '#fff',
//           },
//         }}
//       />
//     );
//   };

//   const scrollToBottomComponent = () => {
//     return <FontAwesome name="angle-double-down" size={22} color="#333" />;
//   };

//   return (
//     <GiftedChat
//       messages={messages}
//       onSend={newMessages => onSend(newMessages)}
//       user={{
//         _id: USER,
//       }}
//       renderBubble={renderBubble}
//       alwaysShowSend
//       renderSend={renderSend}
//       scrollToBottom
//       scrollToBottomComponent={scrollToBottomComponent}
//     />
//   );
// };

// export default ChatScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const USER = 'user113';
const AI = 'user000';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const initiateChat = async () => {
      try {
        // Make a POST request to initiate the chat
        const initiateResponse = await axios.post(
          'https://soulsync-v1.onrender.com/soul_sync/ai_wingman_initiate_conversation/',
          {
            from_id: USER,
            to_id: AI,
          }
        );

        // Handle the initiation response as needed
        console.log('Initiate Chat Response:', initiateResponse.data);

        // Display the AI's initial message
        const aiInitialMessage = {
          _id: initiateResponse.data.message_id,
          text: initiateResponse.data.text_message,
          createdAt: new Date(initiateResponse.data.time),
          user: {
            _id: initiateResponse.data.from_id,
            avatar: 'https://placeimg.com/140/140/any',
          },
        };

        setMessages([aiInitialMessage]);
      } catch (error) {
        console.error('Error initiating chat:', error);
      }
    };

    initiateChat();
  }, []);

  const onSend = useCallback(async (newMessages = []) => {
    // Display the user's sent message
    const sentMessage = {
      _id: newMessages[0]._id,
      text: newMessages[0].text,
      createdAt: new Date(),
      user: {
        _id: USER,
        avatar: 'https://placeimg.com/140/140/any',
      },
    };

    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, [sentMessage])
    );

    try {
      // Make a backend call to get AI reply
      const aiReplyResponse = await axios.post(
        'https://soulsync-v1.onrender.com/soul_sync/ai_wingman_conversation/',
        {
          text_message: newMessages[0].text,
          from_id: AI,
          to_id: USER,
        }
      );

      // Display AI's reply
      const aiReply = {
        _id: aiReplyResponse.data.message_id,
        text: aiReplyResponse.data.text_message,
        createdAt: new Date(aiReplyResponse.data.time),
        user: {
          _id: aiReplyResponse.data.from_id,
          avatar: 'https://placeimg.com/140/140/any',
        },
      };

      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, [aiReply])
      );
    } catch (error) {
      console.error('Error getting AI reply:', error);
    }
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
            backgroundColor: '#e0e0e0', // Color for AI's reply
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
        _id: USER,
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

