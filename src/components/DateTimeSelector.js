import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { SECONDARY_COLOR } from '../common/theme';
import { dateFormat, timeFormat } from '../utils';
import ErrorMessage from './ErrorMessage';

const DateTimeSelector = ({ value, mode, onChange, error }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Input
          value={dateFormat(value) + ' ' + timeFormat(value)}
          disabled={true}
          label="Data"
          labelStyle={{ color: SECONDARY_COLOR }}
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
