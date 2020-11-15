import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function FloatingButton({ clickHandler }) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={clickHandler}
      style={styles.touchableOpacityStyle}>
      <Image
        source={require('../assets/bitmap.png')}
        style={styles.floatingButtonStyle}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    //backgroundColor:'black'
  },
});
