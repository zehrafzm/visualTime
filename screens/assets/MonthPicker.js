import React, { useState, useRef,useEffect } from 'react';
import { View, Text, TextInput, useWindowDimensions,Image,SafeAreaView, FlatList,Pressable, StyleSheet, ScrollView, Dimensions,scrollViewRef  } from "react-native";
import {Picker} from '@react-native-picker/picker';


const MonthPicker = ({ onSelect }) => {
    const [selectedNumber, setSelectedNumber] = useState("1");
    const pickerRef = useRef();
    const { width: windowWidth, height: windowHeight } = useWindowDimensions();


    const openPicker = () => {
      pickerRef.current.focus();
    };
  
    const closePicker = () => {
      pickerRef.current.blur();
    };
  
    useEffect(() => {
      onSelect(selectedNumber);
    });
  
    return (
      <View>
        <Pressable style={{backgroundColor:"#8dc8f2",width:windowWidth*.8}}  onPress={openPicker} >
        <Text  style={{color:"black",fontSize:windowWidth*0.07,fontWeight: 'bold',}} > Select Month</Text></Pressable>
        <Picker
          ref={pickerRef}
          style={{backgroundColor:"#8dc8f2"}}
          selectedValue={selectedNumber}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedNumber(itemValue)
          }>
          <Picker.Item label="0" value="0" />
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
          <Picker.Item label="6" value="6" />
          <Picker.Item label="7" value="7" />
          <Picker.Item label="8" value="8" />
          <Picker.Item label="9" value="9" />
          <Picker.Item label="10" value="10" />
        <Picker.Item label="11" value="11" />
        <Picker.Item label="12" value="12" />
   

        </Picker>
      </View>
    );
  };
  
export default MonthPicker;
//      <Button title="Close Picker" onPress={closePicker} />
