import React from 'react';
import { SafeAreaView } from 'react-native';
import ToDoList from './src/ToDoList';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ToDoList />
    </SafeAreaView>
  );
}
