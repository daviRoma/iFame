import React, { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomActivityIndicator,
  DateTimeSelector,
  ErrorMessage,
  Spacer,
} from '../../components';
import { useFoodCategories, useCities } from '../../hooks';
import { addInformations, selectState } from './eventCreationSlice';
import { Picker } from '@react-native-picker/picker';
import * as Routes from '../../routes';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NewEventFirstPage({ navigation }) {
  const {
    titleState,
    dateState,
    locationState,
    categoryState,
    numPartState,
    descriptionState,
  } = useSelector(selectState);
  const { loading, foodCategories } = useFoodCategories();
  const { cities, citiesLoading } = useCities();
  const dispatch = useDispatch();

  const [title, setTitle] = useState(titleState);
  const [date, setDate] = useState(dateState);
  const [location, setLocation] = useState(locationState);
  const [category, setCategory] = useState(categoryState);
  const [numPart, setNumPart] = useState(numPartState);
  const [description, setDescription] = useState(descriptionState);

  // const [titleError, setTitleError] = useState('');
  // const [numError, setNumError] = useState('');
  // const [dataError, setDataError] = useState('');
  // const [categoryError, setCategoryError] = useState('');
  // const [locationError, setLocationError] = useState('');

  const onSubmit = () => {
    dispatch(
      addInformations({
        title,
        date: date.toLocaleString(),
        location,
        category,
        numPart,
        description,
      }),
    );
    navigation.navigate(Routes.NEW_EVENT_SECOND);
  };

  return (
    <>
      {loading || !foodCategories || !cities || citiesLoading ? (
        <CustomActivityIndicator />
      ) : (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={styles.inputSection}>
              <Input
                label="Titolo"
                placeholder="Nuovo evento"
                value={title}
                onChangeText={setTitle}
              />
              <Input
                label="Descrizione (opzionale)"
                multiline={true}
                numberOfLines={2}
                value={description}
                onChangeText={setDescription}
              />
              <Input
                label="Numero di partecipanti"
                keyboardType="numeric"
                value={numPart}
                onChangeText={setNumPart}
                containerStyle={styles.inputNumber}
              />
            </View>
            <View>
              <DateTimeSelector
                buttonTitle="Seleziona una data"
                mode="datetime"
                onChange={(selectedDate) => {
                  const currentDate = selectedDate || date;
                  setDate(currentDate);
                }}
                value={date || new Date()}
              />
            </View>
            <View style={styles.select}>
              <Text>Seleziona cosa mangerete:</Text>
              <Picker
                selectedValue={category}
                onValueChange={(value) => {
                  setCategory(value);
                }}>
                <Picker.Item label="Categoria" value="" key="" color="grey" />
                {foodCategories.map((value) => {
                  return (
                    <Picker.Item
                      label={value.title}
                      value={value.title}
                      key={value.title}
                    />
                  );
                })}
              </Picker>
            </View>
            <View style={styles.select}>
              <Text>Seleziona una città:</Text>
              <Picker
                selectedValue={location}
                onValueChange={(value) => {
                  setLocation(value);
                }}>
                <Picker.Item label="Città" value="" key="" color="grey" />
                {cities.map((value) => {
                  return (
                    <Picker.Item
                      label={value.name_it}
                      value={value.name}
                      key={value.name}
                    />
                  );
                })}
              </Picker>
            </View>
            <Spacer />
            <View>
              <Button
                title="Vai avanti"
                onPress={onSubmit}
                disabled={!(title && location && date && numPart && category)}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    alignContent: 'center',
    justifyContent: 'center',
  },
  inputSection: {
    paddingTop: 20,
    alignItems: 'flex-start',
  },
  inputNumber: {
    width: 200,
  },
  select: {
    width: 200,
  },
});
