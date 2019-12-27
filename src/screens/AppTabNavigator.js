import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-ionicons';
import MessageScreen from './MessageScreen';
import HomeScreen from './HomeScreen';
import MapsScreen from './MapsScreen';
import ProfileScreen from './ProfileScreen';

const AppTabNavigator = createBottomTabNavigator(
  {
      Home: {
          screen: HomeScreen,
          navigationOptions: {
              title: "Home",
              tabBarIcon: ({ tintColor }) => <Ionicons name="md-home" size={24} color={tintColor} />
          }
      },
      Message: {
          screen: MessageScreen,
          navigationOptions: {
              tabBarIcon: ({ tintColor }) => <Ionicons name="md-chatboxes" size={24} color={tintColor} />
          }
      },
      Maps: {
          screen:MapsScreen,
          navigationOptions: {tabBarIcon: ({ tintColor }) => <Ionicons name="md-pin" size={24} color={tintColor}/>
          }
      },
      Profile: {
          screen: ProfileScreen,
          navigationOptions: {
              tabBarIcon: ({ tintColor }) => <Ionicons name="md-person" size={24} color={tintColor} />
          }
      }
  },
  {
      tabBarOptions: {
          activeTintColor: "#1A5276",
          inactiveTintColor: "#7FB3D5",
          showLabel: true
      }
  }
);

export default AppTabNavigator;
