import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FirebaseDatabaseTypes } from '@react-native-firebase/database';
import FloatingActionButton from '../components/FloatingActionButton';
import { View } from '../components/Themed';
import ToDoList from '../components/ToDoList';
import { MainStackParamList, ToDosParamList } from '../types';
import { FilterToDos, searchToDoResult, ToDoSingleWithID, userToDos, } from '../action/ToDos';
import FloatingActionButtonGroup from '../components/FloatingActionButtonGroup';
import FloatingFilterButton from '../components/FloatingFilterButton';
import SearchTextInput from '../components/SearchTextInput';

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  // Workaround for the buttons below?
  toDoListContentContainerStyle: {
    paddingBottom: 50,
  },
});

export default ({ navigation }: {
  navigation: StackNavigationProp<ToDosParamList & MainStackParamList, 'ToDosScreen'>
}) => {
  const [toDos, setToDos] = useState<Array<ToDoSingleWithID>>([]);
  const [filterBy, setFilterBy] = useState(FilterToDos.NotCompleted);
  const [searchText, setSearchText] = useState('');

  const onToDosChange = (todosSnapshot: FirebaseDatabaseTypes.DataSnapshot) => {
    const toDosTemp: typeof toDos = [];
    todosSnapshot.forEach((toDoSnapshot) => {
      toDosTemp.push({
        id: toDoSnapshot.key,
        ...toDoSnapshot.val(),
      });
      return undefined;
    });
    setToDos(toDosTemp);
  };

  useEffect(() => {
    const userToDosRef = userToDos(filterBy);
    const onToDosChangeListener = userToDosRef
      .on('value', onToDosChange);

    return () => {
      userToDosRef.off('value', onToDosChangeListener);
    };
  }, [filterBy]);

  return (
    <View style={styles.containerStyle}>
      <SearchTextInput onChangeText={setSearchText}/>
      <ToDoList
        data={searchToDoResult(toDos, searchText === '' ? undefined : searchText)}
        contentContainerStyle={styles.toDoListContentContainerStyle}
      />
      <FloatingFilterButton
        filterBy={filterBy}
        setFilterBy={setFilterBy}
      />
      <FloatingActionButtonGroup>
        <FloatingActionButton
          onPress={() => navigation.navigate('TodaysImageScreen')}
          iconName="image"
        />
        <FloatingActionButton
          onPress={() => navigation.navigate('CreateToDoModal')}
          iconName="add"
        />
      </FloatingActionButtonGroup>
    </View>
  );
};
