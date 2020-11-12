import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import AccessForm from '../features/auth/AccessForm';
import { useDispatch, useSelector } from 'react-redux';
import * as Routes from '../routes';
import {
  loginUser,
  clearRegistrationMessage,
} from '../features/auth/authSlice';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isRegistered } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (isRegistered) {
    Alert.alert('Registration Success', 'You have correctly been registered', [
      {
        text: 'Ok',
        onPress: () => {
          dispatch(clearRegistrationMessage());
        },
        style: 'cancel',
      },
    ]);
  }

  return (
    <View style={{ flex: 1 }}>
      <AccessForm
        formTitle="iFame"
        buttonTitle="Login"
        navigationTitle="Create an Account"
        navigationRoute={Routes.SIGNIN}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        callback={() => {
          dispatch(loginUser(email, password));
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
