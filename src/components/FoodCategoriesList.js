import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';

export default function FoodCategoriesList({
  foodCategories,
  foodPref,
  setFoodPref,
}) {
  return (
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
  );
}

const styles = StyleSheet.create({
  checkListStyle: {
    marginVertical: 50,
  },
});
