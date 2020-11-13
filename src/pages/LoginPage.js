import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import AccessForm from '../features/auth/AccessForm';
import { loginUser } from '../features/auth/authSlice';
import * as Routes from '../routes';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

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
