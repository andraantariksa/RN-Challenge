import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { MainStackParamList } from '../types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

export default function NotFoundScreen({
  navigation,
}: StackScreenProps<MainStackParamList, 'NotFoundScreen'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'This screen doesn\'t exist.'}</Text>
      <TouchableOpacity
        onPress={() => navigation.replace('BottomTabNavigator')}
        style={styles.link}
      >
        <Text style={styles.linkText}>Go to home screen!</Text>
      </TouchableOpacity>
    </View>
  );
}
