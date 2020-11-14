import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AccessForm from '../features/auth/AccessForm';
import {
  loginUser,
  clearRegistrationMessage,
} from '../features/auth/authSlice';
import * as Routes from '../routes';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  // const { isRegistered } = useSelector((state) => state.auth);

  // if (isRegistered) {
  //   Alert.alert('Registration Success', 'You have correctly been registered', [
  //     {
  //       text: 'Ok',
  //       onPress: () => {
  //         dispatch(clearRegistrationMessage());
  //       },
  //       style: 'cancel',
  //     },
  //   ]);
  // }

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
