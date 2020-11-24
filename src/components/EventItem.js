import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { CONTRAST_COLOR, PRIMARY_COLOR } from '../common/theme';
import { useFoodCategories } from '../hooks/useFoodCategories';

export default function ({ item, onPress }) {
  const { foodCategories, loading } = useFoodCategories();
  const [category, setCategory] = useState('');
  useEffect(() => {
    if (foodCategories) {
      setCategory(foodCategories.find((val) => val.key === item.category));
    }
  }, [foodCategories, item]);
  return (
    <ListItem key={item.title} bottomDivider onPress={onPress}>
      {item.type === 'breakfast' ? (
        <Icon name="coffee" type="font-awesome" color={CONTRAST_COLOR} />
      ) : (
        <Icon name="cutlery" type="font-awesome" color={CONTRAST_COLOR} />
      )}

      <ListItem.Content>
        <ListItem.Title h4>{item.title}</ListItem.Title>
        <ListItem.Subtitle style={styles.subtitle}>
          {category.title_it}
        </ListItem.Subtitle>
        <ListItem.Subtitle
          style={
            styles.subtitle
          }>{`${item.location.name_it}, ${item.day} at ${item.hour}`}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 16,
    color: PRIMARY_COLOR,
  },
});
