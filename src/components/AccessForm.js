import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { withNavigation } from '@react-navigation/compat';

const AccessForm = ({
  formTitle,
  buttonTitle,
  callback,
  navigationTitle,
  navigationRoute,
  navigation,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <Text h1 style={styles.title}>
        {formTitle}
      </Text>
      <View style={styles.formContainer}>
        <Input
          placeholder="Email"
          leftIcon={<MaterialIcons name="alternate-email" size={20} />}
          value={email}
          onChangeText={setEmail}
        />
        <Input
          placeholder="Password"
          secureTextEntry={true}
          leftIcon={<MaterialIcons name="lock" size={20} />}
          value={password}
          onChangeText={setPassword}
        />
        <Button title={buttonTitle} onPress={() => callback()} />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate(navigationRoute)}>
        <Text>{navigationTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    margin: 15,
    width: 300,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default withNavigation(AccessForm);
