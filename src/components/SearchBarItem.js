import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { PRIMARY_COLOR } from '../common/theme';

const SearchBarItem = ({ term, setTerm, onTermSubmit }) => {
  return (
    <View style={styles.background}>
      <Icon name="search" style={styles.iconSize} color={PRIMARY_COLOR} />
      <TextInput
        placeholder="Search"
        style={styles.inputStyle}
        value={term}
        onChangeText={setTerm}
        autoCapitalize="none"
        autoCorrect={false}
        onEndEditing={onTermSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
    height: 50,
    borderRadius: 5,
    marginVertical: 10,
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  inputStyle: {
    flex: 1,
    fontSize: 18,
  },
  iconSize: {
    fontSize: 35,
    alignSelf: 'center',
    marginHorizontal: 10,
  },
});

export default SearchBarItem;
