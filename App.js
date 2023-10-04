import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CalendarComponent from './components/Calendar';
import ReminderComponent from './components/Reminder';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [customMarkings, setCustomMarkings] = useState({});
  const [reminderText, setReminderText] = useState('');
  const [reminders, setReminders] = useState({});

  useEffect(() => {
    // Load reminders from AsyncStorage when the component mounts
    loadReminders();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDayPress = (day) => {
    const formattedDate = formatDate(day.dateString);
    setSelectedDate(formattedDate);

    // Create a custom marking for the selected date with a circular background
    // setCustomMarkings({
    //   ...customMarkings,
    //   [day.dateString]: {
    //     customStyles: {
    //       container: {
    //         backgroundColor: 'blue', // Background color for the circular highlight
    //         borderRadius: 50, // Make it circular by setting border radius
    //       },
    //       text: {
    //         color: 'white', // Text color for the day number
    //       },
    //     },
    //   },
    // });

    // Load reminders for the selected date from state
    const remindersForDate = formattedDate;
    setReminderText('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const addReminder = () => {
    if (selectedDate) {
      const formattedDate = selectedDate;
      const newReminder = { text: reminderText };
      const updatedReminders = { ...reminders };

      // Add the new reminder to the selected date
      if (updatedReminders[formattedDate]) {
        updatedReminders[formattedDate].push(newReminder);
      } else {
        updatedReminders[formattedDate] = [newReminder];
      }

      // Save the updated reminders to AsyncStorage and state
      saveReminders(updatedReminders);
      setReminders(updatedReminders);
      setReminderText('');
      setShowModal(false);
    }
  };

  const loadReminders = async () => {
    try {
      const storedReminders = await AsyncStorage.getItem('reminders');
      console.log(storedReminders);
      if (storedReminders) {
        setReminders(JSON.parse(storedReminders));
        
        // Highlight dates with gray background based on reminders
        const markedDates = {};
        // markedDates=storedReminders;
        for (const date of Object.keys(reminders)) {
          markedDates[date]={} ;
        }
        setCustomMarkings(markedDates);
      }
    } catch (error) {
      console.error('Error loading reminders: ', error);
    }
  };

  const saveReminders = async (remindersToSave) => {
    try {
      await AsyncStorage.setItem('reminders', JSON.stringify(remindersToSave));
    } catch (error) {
      console.error('Error saving reminders: ', error);
    }
  };
console.log(customMarkings);
  return (
    <View style={styles.container}>
      <CalendarComponent
        customMarkings={customMarkings}
        handleDayPress={handleDayPress}
        reminders={reminders}
      />
      <Text>{reminderText}</Text>
      <ReminderComponent
        selectedDate={selectedDate}
        showModal={showModal}
        closeModal={closeModal}
        reminderText={reminderText}
        setReminderText={setReminderText}
        addReminder={addReminder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
