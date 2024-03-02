import React, { useState, useRef,useEffect } from 'react';
import { View, Button } from 'react-native';
import {Picker} from '@react-native-picker/picker';
const SelectComponent = ({ onSelect }) => {
    const [selectedNumber, setSelectedNumber] = useState("0");
    const pickerRef = useRef();
  
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
        <Button title="Open Picker" onPress={openPicker} />
        <Picker
          ref={pickerRef}
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
        </Picker>
      </View>
    );
  };
  
export default SelectComponent;
//      <Button title="Close Picker" onPress={closePicker} />
