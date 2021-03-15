import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainerRef } from '@react-navigation/native';
import React from 'react';
import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import CreateTODOModal from '../screens/CreateToDoModal';
import EditToDoModal from '../screens/EditToDoModal';
import TodaysImageModal from '../screens/TodaysImageModal';

export const rootNavContainerRef = React.createRef<NavigationContainerRef>();

const MainStack = createStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}/>
      <MainStack.Screen
        name="CreateToDoModal"
        component={CreateTODOModal}
        options={{
          headerShown: false,
          cardStyle: { backgroundColor: 'transparent' },
          cardOverlayEnabled: true,
          cardStyleInterpolator: ({ current: { progress } }) => ({
            cardStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 0.5, 0.9, 1],
                outputRange: [0, 0.25, 0.7, 1],
              }),
            },
            overlayStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
                extrapolate: 'clamp',
              }),
            },
          }),
        }}
      />
      <MainStack.Screen
        name="EditToDoScreen"
        component={EditToDoModal}
      />
      <MainStack.Screen
        name="TodaysImageModal"
        component={TodaysImageModal}
      />
      <MainStack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }}/>
    </MainStack.Navigator>
  );
};
