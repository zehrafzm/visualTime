import React, { useState, useRef,useEffect } from 'react';
import { View, Text, TextInput, useWindowDimensions,Image,SafeAreaView, FlatList,Pressable, StyleSheet, ScrollView, Dimensions,scrollViewRef  } from "react-native";
import {Picker} from '@react-native-picker/picker';


const YearPicker = ({ onSelect }) => {
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
        <Text  style={{color:"black",fontSize:windowWidth*0.07,fontWeight: 'bold',}} > Select Year</Text></Pressable>
        <Picker
          ref={pickerRef}
          style={{backgroundColor:"#b8e3ff"}}
          selectedValue={selectedNumber}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedNumber(itemValue)
          }>
           <Picker.Item label="2024" value="2024" />
  <Picker.Item label="2025" value="2025" />
  <Picker.Item label="2026" value="2026" />
  <Picker.Item label="2027" value="2027" />
  <Picker.Item label="2028" value="2028" />
  <Picker.Item label="2029" value="2029" />
  <Picker.Item label="2030" value="2030" />
  <Picker.Item label="2031" value="2031" />
  <Picker.Item label="2032" value="2032" />
  <Picker.Item label="2033" value="2033" />
  <Picker.Item label="2034" value="2034" />
  <Picker.Item label="2035" value="2035" />
  <Picker.Item label="2036" value="2036" />
  <Picker.Item label="2037" value="2037" />
  <Picker.Item label="2038" value="2038" />
  <Picker.Item label="2039" value="2039" />
  <Picker.Item label="2040" value="2040" />
  <Picker.Item label="2041" value="2041" />
  <Picker.Item label="2042" value="2042" />
  <Picker.Item label="2043" value="2043" />
  <Picker.Item label="2044" value="2044" />
  <Picker.Item label="2045" value="2045" />
  <Picker.Item label="2046" value="2046" />
  <Picker.Item label="2047" value="2047" />
  <Picker.Item label="2048" value="2048" />
  <Picker.Item label="2049" value="2049" />
  <Picker.Item label="2050" value="2050" />

        </Picker>
      </View>
    );
  };
  
export default YearPicker;
//      <Button title="Close Picker" onPress={closePicker} />
