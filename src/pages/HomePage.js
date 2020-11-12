import React, { useEffect } from 'react';
import { Text, Button, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Routes from '../routes';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserInfo } from '../features/userSlice';

export default function HomePage({ navigation }) {
  const dispatch = useDispatch();
  const { id, loading, foodPref } = useSelector((state) => state.loggedUser);

  useEffect(() => {
    if (!id) {
      dispatch(loadUserInfo());
    }
  }, []);

  return (
    <>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <SafeAreaView>
          {!id ? <Text>Nope</Text> : null}
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
