import Database, { FirebaseDatabaseTypes } from '@react-native-firebase/database';
import { currentUser } from './Auth';

export type ToDoSingle = {
  title: string,
  description: string,
  isCompleted: boolean,
  isPublished: boolean,
  createdAt: FirebaseDatabaseTypes.ServerValue,
  updatedAt: FirebaseDatabaseTypes.ServerValue,
};

export type ToDoSingleWithID = ToDoSingle & { id: string };

export enum FilterToDos {
  NotCompleted,
  NoFilter,
  Completed
}

export const nextFilter = (filter: FilterToDos): FilterToDos => {
  switch (filter) {
    case FilterToDos.NotCompleted:
      return FilterToDos.NoFilter;
    case FilterToDos.NoFilter:
      return FilterToDos.Completed;
    case FilterToDos.Completed:
      return FilterToDos.NotCompleted;
    default:
      return FilterToDos.NotCompleted;
  }
};

export const filterToString = (filter: FilterToDos) => {
  switch (filter) {
    case FilterToDos.NotCompleted:
      return 'Not Completed';
    case FilterToDos.NoFilter:
      return 'No Filter';
    case FilterToDos.Completed:
      return 'Completed';
    default:
      return '';
  }
};

// Get a reference to current user ToDos
export const userToDos = (filterBy: FilterToDos = FilterToDos.NoFilter) => {
  const ref = Database()
    .ref(`users/${currentUser()?.uid}/todos`);
  if (filterBy !== FilterToDos.NoFilter) {
    return ref
      .orderByChild('isCompleted')
      .equalTo(filterBy === FilterToDos.Completed);
  }
  return ref;
};

// Filter should be done by the backend, but Firebase does not support such features
export const searchToDoResult = (
  toDos: Array<ToDoSingleWithID>,
  keyword?: string,
) => {
  if (keyword === undefined) {
    return toDos;
  }
  const keywordLowercased = keyword.toLowerCase();

  return toDos
    .filter((toDo) => toDo.description.toLowerCase()
      .search(keywordLowercased) !== -1
        || toDo.title.toLowerCase()
          .search(keywordLowercased) !== -1);
};

export const addToDo = (title: string, description: string) => Database()
  .ref(`users/${currentUser()?.uid}/todos`)
  .push(<ToDoSingle>{
    title,
    description,
    isCompleted: false,
    isPublished: false,
    createdAt: Database.ServerValue.TIMESTAMP,
    updatedAt: Database.ServerValue.TIMESTAMP,
  });

export const toDoRef = (id: string) => Database()
  .ref(`users/${currentUser()?.uid}/todos/${id}`);

export const markToDoAsCompleted = (isCompleted: boolean, id: string) => Database()
  .ref(`users/${currentUser()?.uid}/todos/${id}`)
  .update(<ToDoSingle>{
    isCompleted,
    updatedAt: Database.ServerValue.TIMESTAMP,
  });

export const publishToDo = (isPublished: boolean, id: string) => Database()
  .ref(`users/${currentUser()?.uid}/todos/${id}`)
  .update(<ToDoSingle>{
    isPublished,
  });

export const deleteToDo = (id: string) => Database()
  .ref(`users/${currentUser()?.uid}/todos/${id}`)
  .set(null);

export const editToDo = (id: string, title: string, description: string) => Database()
  .ref(`users/${currentUser()?.uid}/todos/${id}`)
  .update(<ToDoSingle>{
    title,
    description,
    updatedAt: Database.ServerValue.TIMESTAMP,
  });
