import React from 'react';
import { View } from 'react-native';

const Circle = ({ color }) => {
  return (
    <View
      style={{
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: color,
        margin: 5,
      }}
    />
  );
};

export default Circle;
