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
              title: "Transaction",
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
          navigationOptions: {
              tabBarIcon: ({ tintColor }) => (
                  <Ionicons
                      name="md-pin"
                      size={30}
                      color="#E9446A"
                      style={{
                          shadowColor: "#E9446A",
                          shadowOffset: { width: 0, height: 10 },
                          shadowRadius: 10,
                          shadowOpacity: 0.3
                      }}
                  />
              )
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
          activeTintColor: "#161F3D",
          inactiveTintColor: "#B8BBC4",
          showLabel: false
      }
  }
);

export default AppTabNavigator;
