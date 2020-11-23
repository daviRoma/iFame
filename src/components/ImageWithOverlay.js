import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Image, Overlay } from 'react-native-elements';

const ImageWithOverlay = ({ image_url }) => {
  const [fullImageVisible, setFullImageVisible] = useState(false);
  const [imageWidth, setImageWidth] = useState('');
  const [imageHeigth, setImageHeight] = useState('');

  useEffect(() => {
    Image.getSize(image_url, (width, heigth) => {
      setImageWidth(width);
      setImageHeight(heigth);
    });
  }, [image_url]);

  return (
    <View>
      <Image
        style={styles.list}
        source={{ uri: image_url }}
        onPress={() => setFullImageVisible(true)}
      />
      <Overlay
        isVisible={fullImageVisible}
        onBackdropPress={() => setFullImageVisible(false)}
        animationType="slide">
        <Image
          source={{ uri: image_url }}
          style={{ width: imageWidth * 0.5, height: imageHeigth * 0.5 }}
        />
      </Overlay>
    </View>
  );
};

export default ImageWithOverlay;

const styles = StyleSheet.create({
  list: {
    height: 150,
    width: 250,
    margin: 10,
  },
});
