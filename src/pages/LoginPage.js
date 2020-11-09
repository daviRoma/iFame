import React from 'react';
import { View, StyleSheet } from 'react-native';
import AccessForm from '../components/AccessForm';
import * as Routes from '../routes';

export default function LoginPage() {
  return (
    <View style={{ flex: 1 }}>
      <AccessForm
        formTitle="iFame"
        buttonTitle="Login"
        navigationTitle="Create an Account"
        navigationRoute={Routes.SIGNIN}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
