import React from 'react';
import { ActivityIndicator, Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import FoodPrefsModal from '../features/foodCategories/FoodPrefsModal';
import * as Routes from '../routes';

export default function HomePage({ navigation }) {
  const { loading, user } = useSelector((state) => state.loggedUser);

  return (
    <>
      {loading ? (
        <ActivityIndicator size={30} />
      ) : (
        <SafeAreaView>
          {user && !user.preferencies ? (
            <FoodPrefsModal visible={true} />
          ) : null}
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
