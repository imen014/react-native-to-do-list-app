import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { db } from '../firebaseConfig'; // Assurez-vous que le chemin est correct
import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore';

const ToDoList = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null); // Ajoutez un état pour la tâche en cours de modification

  useEffect(() => {
    // Écoute en temps réel des tâches dans Firestore
    const unsubscribe = onSnapshot(collection(db, 'tasks'), (querySnapshot) => {
      const tasksList = [];
      querySnapshot.forEach((doc) => {
        tasksList.push({ id: doc.id, ...doc.data() });
      });
      setTasks(tasksList);
    });

    // Nettoyage de l'abonnement lorsque le composant est démonté
    return () => unsubscribe();
  }, []);

  const addTask = async () => {
    if (task) {
      try {
        await addDoc(collection(db, 'tasks'), { text: task });
        setTask(''); // Réinitialiser le champ de saisie
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, 'tasks', taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const updateTask = async () => {
    if (editingTask && task) {
      try {
        const taskRef = doc(db, 'tasks', editingTask.id);
        await updateDoc(taskRef, { text: task }); // Mise à jour de la tâche
        setTask(''); // Réinitialiser le champ de saisie
        setEditingTask(null); // Réinitialiser l'état d'édition
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  };

  const startEditing = (taskToEdit) => {
    setEditingTask(taskToEdit); // Définir la tâche à éditer
    setTask(taskToEdit.text); // Remplir le champ de saisie avec le texte de la tâche
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add or edit a task"
        value={task}
        onChangeText={setTask}
      />
      {editingTask ? (
        <Button title="Update Task" onPress={updateTask} />
      ) : (
        <Button title="Add Task" onPress={addTask} />
      )}

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text>{item.text}</Text>
            <Button title="Edit" onPress={() => startEditing(item)} />
            <Button title="Delete" onPress={() => deleteTask(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default ToDoList;
