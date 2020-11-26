import React from 'react';
import { View, Text } from 'react-native';

export default function Spacer({ children, margin }) {
  return <View style={{ margin: margin || 15 }}>{children}</View>;
}
