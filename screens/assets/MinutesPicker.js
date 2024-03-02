import React, { useState, useRef,useEffect } from 'react';
import { View, Text, TextInput, useWindowDimensions,Image,SafeAreaView, FlatList,Pressable, StyleSheet, ScrollView, Dimensions,scrollViewRef  } from "react-native";
import {Picker} from '@react-native-picker/picker';


const MinutesPicker = ({ onSelect }) => {
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
        <Pressable style={{backgroundColor:"#b8e3ff",width:windowWidth*.8}}  onPress={openPicker} >
        <Text  style={{color:"black",fontSize:windowWidth*0.07,fontWeight: 'bold',}} > Select Minutes</Text></Pressable>
        <Picker
          ref={pickerRef}
          style={{backgroundColor:"#b8e3ff"}}
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
        <Picker.Item label="25" value="25" />
        <Picker.Item label="26" value="26" />
        <Picker.Item label="27" value="27" />
        <Picker.Item label="28" value="28" />
        <Picker.Item label="29" value="29" />
        <Picker.Item label="30" value="30" />
        <Picker.Item label="31" value="31" />
        <Picker.Item label="32" value="32" />
        <Picker.Item label="33" value="33" />
        <Picker.Item label="34" value="34" />
        <Picker.Item label="35" value="35" />
        <Picker.Item label="36" value="36" />
        <Picker.Item label="37" value="37" />
        <Picker.Item label="38" value="38" />
        <Picker.Item label="39" value="39" />
        <Picker.Item label="40" value="40" />
        <Picker.Item label="41" value="41" />
        <Picker.Item label="42" value="42" />
        <Picker.Item label="43" value="43" />
        <Picker.Item label="44" value="44" />
        <Picker.Item label="45" value="45" />
        <Picker.Item label="46" value="46" />
        <Picker.Item label="47" value="47" />
        <Picker.Item label="48" value="48" />
        <Picker.Item label="49" value="49" />
        <Picker.Item label="50" value="50" />
        <Picker.Item label="51" value="51" />
        <Picker.Item label="52" value="52" />
        <Picker.Item label="53" value="53" />
        <Picker.Item label="54" value="54" />
        <Picker.Item label="55" value="55" />
        <Picker.Item label="56" value="56" />
        <Picker.Item label="57" value="57" />
        <Picker.Item label="58" value="58" />
        <Picker.Item label="59" value="59" />
        <Picker.Item label="60" value="60" />

        </Picker>
      </View>
    );
  };
  
export default MinutesPicker;
//      <Button title="Close Picker" onPress={closePicker} />
