import React from 'react';
import { ActivityIndicator, Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import FoodPrefsModal from '../features/foodCategories/FoodPrefsModal';
import * as Routes from '../routes';
import { loadFoodPref } from '../features/user/userSlice';

export default function HomePage({ navigation }) {
  const { loading, user } = useSelector((state) => state.loggedUser);
  const dispatch = useDispatch();
  return (
    <>
      {loading ? (
        <ActivityIndicator size={30} />
      ) : (
        <SafeAreaView>
          {user && user.preferencies.length === 0 ? (
            <FoodPrefsModal
              visible={true}
              onClose={(foodPref) => {
                dispatch(loadFoodPref(foodPref));
              }}
            />
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
