import React, { useEffect } from 'react';
import { Text, Button, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Routes from '../routes';
import { useDispatch, useSelector } from 'react-redux';

export default function HomePage({ navigation }) {
  const { loading, foodPref } = useSelector((state) => state.loggedUser);

  return (
    <>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <SafeAreaView>
          {foodPref.length === 0 ? <Text>No prefs</Text> : null}
          <Text>HomePage</Text>
          <Button
            title="Go to new event"
            onPress={() => {
              navigation.navigate(Routes.NEW_EVENT);
            }}
          />
          <Button
            title="Go to single event"
            onPress={() => {
              navigation.navigate(Routes.SINGLE_EVENT);
            }}
          />
          <Button
            title="Go to update event"
            onPress={() => {
              navigation.navigate(Routes.UPDATE_EVENT);
            }}
          />
        </SafeAreaView>
      )}
    </>
  );
}
