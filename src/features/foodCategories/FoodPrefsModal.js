import React, { useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { useSelector } from 'react-redux';
import CustomActivityIndicator from '../../components/CustomActivityIndicator';
import FoodCategoriesList from '../../components/FoodCategoriesList';
import { useFoodCategories } from '../../hooks/useFoodCategories';

export default function FoodPrefsModal({ visible, onClose }) {
  const [isVisible, setIsVisible] = useState(visible);
  const { loadingUpdate, user } = useSelector((state) => state.loggedUser);
  const [foodPref, setFoodPref] = useState(user.preferencies);
  const { foodCategories, loading } = useFoodCategories();
  const onCloseFunction = () => {
    if (onClose) {
      onClose(foodPref);
    }
    setIsVisible(!isVisible);
  };
  return (
    <Modal
      animationType="slide"
      visible={isVisible}
      onRequestClose={() => {
        onCloseFunction();
      }}>
      {loading ? (
        <CustomActivityIndicator />
      ) : (
        <View style={styles.modalStyle}>
          <Text h3>Cosa ti piace mangiare?</Text>
          <FoodCategoriesList
            foodCategories={foodCategories}
            foodPref={foodPref}
            setFoodPref={setFoodPref}
          />
          <Button
            title="Invia"
            loading={loadingUpdate}
            onPress={() => {
              onCloseFunction();
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
});
