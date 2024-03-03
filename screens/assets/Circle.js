import React from 'react';
import { View } from 'react-native';

const Circle = ({ color,size }) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: 25,
        backgroundColor: color,
        //margin: 5,
        marginRight:5,
        marginLeft:5,
        marginBottom:28
      }}
    />
  );
};

export default Circle;
