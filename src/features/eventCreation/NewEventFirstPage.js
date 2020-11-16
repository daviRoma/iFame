import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Input, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { CustomActivityIndicator, DateTimeSelector } from '../../components';
import { useFoodCategories } from '../../hooks/useFoodCategories';
import { selectState } from './eventCreationSlice';
import { Picker } from '@react-native-picker/picker';

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
  const dispatch = useDispatch();

  const [title, setTitle] = useState(titleState);
  const [date, setDate] = useState(dateState);
  const [location, setLocation] = useState(locationState);
  const [category, setCategory] = useState(categoryState);
  const [numPart, setNumPart] = useState(numPartState);
  const [description, setDescription] = useState(descriptionState);

  return (
    <>
      {loading || !foodCategories ? (
        <CustomActivityIndicator />
      ) : (
        <ScrollView>
          <View>
            <Text h2>Crea un nuovo evento</Text>
            <Input
              label="Titolo"
              placeholder="Nuovo evento"
              value={title}
              onChangeText={setTitle}
            />
            <Input
              label="Descrizione"
              placeholder="Descrizione nuovo evento"
              multiline={true}
              numberOfLines={2}
              value={description}
              onChangeText={setDescription}
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
            {date && (
              <Text>
                {date.toDateString()} {date.toLocaleTimeString()}
              </Text>
            )}
          </View>
          <View>
            <Input
              label="Inserisci il numero di partecipanti"
              keyboardType="numeric"
              value={numPart}
              onChangeText={setNumPart}
            />
          </View>
          <View>
            <Text>Seleziona cosa mangerete:</Text>
            <Picker
              selectedValue={category}
              onValueChange={(value) => {
                setCategory(value);
              }}>
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
          <View>
            <Text>Seleziona una città:</Text>
          </View>
        </ScrollView>
      )}
    </>
  );
}
