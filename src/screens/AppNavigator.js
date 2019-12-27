import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import ChatScreen from './chats/ChatScreen';

const AppNavigator = createStackNavigator({
    Chat : ChatScreen,
  })

  export default AppNavigator;
