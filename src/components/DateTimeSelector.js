import React, { useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DateTimeSelector = ({ buttonTitle, value, mode, onChange }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <View>
      <Button
        type="clear"
        title={buttonTitle}
        onPress={() => setShowDatePicker(true)}
      />
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode={mode}
        date={value}
        onConfirm={(selectedValue) => {
          onChange(selectedValue);
          setShowDatePicker(false);
        }}
        onCancel={() => setShowDatePicker(false)}
      />
    </View>
  );
};

export default DateTimeSelector;
