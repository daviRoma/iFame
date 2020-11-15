import React, { useState } from 'react';
import { ActivityIndicator, Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import FoodPrefsModal from '../features/foodCategories/FoodPrefsModal';
import * as Routes from '../routes';
import { loadFoodPref } from '../features/user/userSlice';
import FloatingButton from '../components/FloatingButton';

export default function HomePage({ navigation }) {
  const { loading, user } = useSelector((state) => state.loggedUser);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(true);
  const [preferencies, setPreferencies] = useState([]);
  return (
    <>
      {loading ? (
        <ActivityIndicator size={30} />
      ) : (
        <SafeAreaView style={{ flex: 1 }}>
          {user && user.preferencies.length === 0 ? (
            <FoodPrefsModal
              visible={visible}
              onClose={() => {
                dispatch(loadFoodPref(preferencies));
              }}
              setVisible={setVisible}
              foodPref={preferencies}
              setFoodPref={setPreferencies}
            />
          ) : null}
          <Text>HomePage</Text>
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
          <FloatingButton
            clickHandler={() => {
              navigation.navigate(Routes.NEW_EVENT);
            }}
          />
        </SafeAreaView>
      )}
    </>
  );
}
