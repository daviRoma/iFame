import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { withNavigation } from '@react-navigation/compat';
import { cleanErrors } from './authSlice';
import { emailValidator } from '../../utils';
import ErrorMessage from '../../components/ErrorMessage';

const AccessForm = ({
  email,
  setEmail,
  password,
  setPassword,
  formTitle,
  buttonTitle,
  callback,
  navigationTitle,
  navigationRoute,
  navigation,
}) => {
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { error, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    let valid = true;
    if (email === '') {
      setEmailError('This field is required');
      valid = false;
    }
    if (password === '') {
      setPasswordError('This field is required');
      valid = false;
    }
    if (emailError === '' && passwordError === '' && valid) {
      console.log(passwordError);
      callback();
    }
  };

  useEffect(() => {
    if (error !== null) {
      dispatch(cleanErrors());
    }
  }, []);

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
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) =>
            emailValidator(text, email, setEmail, setEmailError)
          }
          errorMessage={emailError}
        />
        <Input
          placeholder="Password"
          secureTextEntry={true}
          leftIcon={<MaterialIcons name="lock" size={20} />}
          value={password}
          autoCapitalize="none"
          autoCorrect={false}
          errorMessage={passwordError}
          onChangeText={(text) => {
            setPasswordError('');
            if (text.length < 6) {
              setPasswordError('Password must be of at least 6 chars');
            } else {
              setPasswordError('');
            }
            setPassword(text);
          }}
        />
        <Button title={buttonTitle} onPress={handleSubmit} loading={loading} />
      </View>
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
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
