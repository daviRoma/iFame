import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AccessForm from '../components/AccessForm';
import { useDispatch, useSelector } from 'react-redux';
import * as Routes from '../routes';
import { loginUser } from '../features/authSlice';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { isRegistered } = useSelector((state) => state.auth);
  return (
    <View style={{ flex: 1 }}>
      {isRegistered ? <Text>Registration Success!</Text> : null}
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
