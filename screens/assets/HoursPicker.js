import React, { useState, useRef,useEffect } from 'react';
import { View, Text, TextInput, useWindowDimensions,Image,SafeAreaView, FlatList,Pressable, StyleSheet, ScrollView, Dimensions,scrollViewRef  } from "react-native";
import {Picker} from '@react-native-picker/picker';


const HoursPicker = ({ onSelect }) => {
    const [selectedNumber, setSelectedNumber] = useState("0");
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
        <Pressable style={{backgroundColor:"#cffcef",width:windowWidth*.8}}  onPress={openPicker} >
        <Text  style={{color:"black",fontSize:windowWidth*0.07,fontWeight: 'bold',}} > Select Hours</Text></Pressable>
        <Picker
          ref={pickerRef}
          style={{backgroundColor:"#cffcef"}}
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
        <Picker.Item label="13" value="13" />
        <Picker.Item label="14" value="14" />
        <Picker.Item label="15" value="15" />
        <Picker.Item label="16" value="16" />
        <Picker.Item label="17" value="17" />
        <Picker.Item label="18" value="18" />
        <Picker.Item label="19" value="19" />
        <Picker.Item label="20" value="20" />
        <Picker.Item label="21" value="21" />
        <Picker.Item label="22" value="22" />
        <Picker.Item label="23" value="23" />
        <Picker.Item label="24" value="24" />
        

        </Picker>
      </View>
    );
  };
  
export default HoursPicker;
//      <Button title="Close Picker" onPress={closePicker} />
