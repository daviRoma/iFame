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
            title={item.title_it}
            checked={
              foodPref.filter((el) => el.title === item.title).length > 0
            }
            onPress={() => {
              foodPref.filter((el) => el.title === item.title).length > 0
                ? setFoodPref(
                    foodPref.filter((value) => value.title !== item.title),
                  )
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
