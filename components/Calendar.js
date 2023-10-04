import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

function CalendarComponent(props) {
  const { handleDayPress, markedDates, reminders } = props;

  // Function to parse and format dates
  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  };

  // Create a copy of the markedDates object
  const markedDatesCopy = { ...markedDates };

  // Iterate through reminders and mark the dates
  for (const date of Object.keys(reminders)) {
    markedDatesCopy[formatDate(date)] = {
      marked: true,
      dotColor: 'lightblue',
    };
  }

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={markedDatesCopy} // Use the modified markedDates object
        // Add other calendar props as needed
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

export default CalendarComponent;
