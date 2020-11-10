import React from 'react';
import { View, StyleSheet } from 'react-native';
import AccessForm from '../components/AccessForm';
import { useDispatch } from 'react-redux';
import * as Routes from '../routes';
import { loginUser } from '../features/authSlice';

export default function LoginPage() {
  const dispatch = useDispatch();
  return (
    <View style={{ flex: 1 }}>
      <AccessForm
        formTitle="iFame"
        buttonTitle="Login"
        navigationTitle="Create an Account"
        navigationRoute={Routes.SIGNIN}
        callback={(email, password) => {
          dispatch(loginUser({ email, password }));
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
