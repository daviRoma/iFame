import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ErrorMessage from './ErrorMessage';

const DateTimeSelector = ({ value, mode, onChange, error }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Input
          value={`${value.getDate()}/${
            value.getMonth() + 1
          }/${value.getFullYear()}  ${value.getHours()}:${value.getMinutes()}`}
          disabled={true}
          label="Data"
        />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode={mode}
        date={value}
        onConfirm={(selectedValue) => {
          setShowDatePicker(false);
          onChange(selectedValue);
        }}
        onCancel={() => setShowDatePicker(false)}
        is24Hour={true}
        minimumDate={value}
      />
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
  },
});

export default DateTimeSelector;
