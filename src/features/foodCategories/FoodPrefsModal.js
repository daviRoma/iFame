import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Modal, FlatList } from 'react-native';
import { Button, CheckBox, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { loadFoodPref } from '../user/userSlice';
import { loadCategories } from './foodCategoriesSlice';
import CustomActivityIndicator from '../../components/CustomActivityIndicator';

export default function FoodPrefsModal({ visible }) {
  const [isVisible, setIsVisible] = useState(visible);
  const { foodCategories, loading } = useSelector((state) => state.foodCat);
  const { loadingUpdate } = useSelector((state) => state.loggedUser);
  const [foodPref, setFoodPref] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!foodCategories) {
      dispatch(loadCategories());
    }
  }, []);

  return (
    <Modal
      animationType="slide"
      visible={isVisible}
      onRequestClose={() => {
        dispatch(loadFoodPref(foodPref));
        setIsVisible(!isVisible);
      }}>
      {loading ? (
        <CustomActivityIndicator />
      ) : (
        <View style={styles.modalStyle}>
          <Text h3>Cosa ti piace mangiare?</Text>
          <FlatList
            data={foodCategories}
            keyExtractor={(item) => item.title}
            style={styles.checkListStyle}
            renderItem={({ item }) => {
              return (
                <CheckBox
                  title={item.title}
                  checked={foodPref.includes(item)}
                  onPress={() => {
                    foodPref.includes(item)
                      ? setFoodPref(foodPref.filter((value) => value !== item))
                      : setFoodPref(foodPref.concat(item));
                  }}
                />
              );
            }}
          />
          <Button
            title="Confirm"
            loading={loadingUpdate}
            onPress={() => {
              dispatch(loadFoodPref(foodPref));
              setIsVisible(!visible);
            }}
          />
        </View>
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalStyle: {
    margin: 30,
    alignContent: 'center',
  },
  checkListStyle: {
    marginVertical: 50,
  },
});
