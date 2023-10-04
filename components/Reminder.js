import React, { useState, useEffect } from 'react';
import {
  StatusBar,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import NotificationButton from './NotificationButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ReminderComponent(props) {
  const {
    selectedDate,
    showModal,
    closeModal,
    reminderText,
    setReminderText,
    addReminder,
  } = props;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>{selectedDate}</Text>
          <TextInput
            placeholder="Add a reminder..."
            value={reminderText}
            onChangeText={(text) => setReminderText(text)}
          />
          <Button title="Add Reminder" onPress={addReminder} />
          <NotificationButton />
          <TouchableOpacity onPress={closeModal}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    height: 500,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default ReminderComponent;
