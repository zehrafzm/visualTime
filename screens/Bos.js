import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, useWindowDimensions,Image,SafeAreaView, FlatList,Pressable, StyleSheet, ScrollView, Dimensions,scrollViewRef  } from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute,useNavigation   } from '@react-navigation/native';
import SelectComponent from "./assets/NumberPicker";


export default function CreateTimer (){
    const[hours,setHours]=useState("");
    const[minutes,setMinutes]=useState("");
    const[timeName,setTimeName]=useState("");
    const { width: windowWidth, height: windowHeight } = useWindowDimensions();
    const [data, setData] = useState(null);
    const navigation = useNavigation();
    const [scrollPositionY, setScrollPositionY] = useState(0);
    const handleScrollY = (event) => {
      setScrollPositionY(event.nativeEvent.contentOffset.y);
    };

    const storeData = async (myKey,value) => {
        try {
            const currentDate = new Date();
            const data = { date: currentDate, value: value };  
          const jsonValue = JSON.stringify(data);
          await AsyncStorage.setItem(myKey, jsonValue);
        } catch (e) {
          // saving error
        }
      };
     
    
     
    const setTimeObject= (hours,minutes,timeName,navigation)=>{
        const totalMinutes= parseInt(hours)*60 + parseInt(minutes);
        const myKey = intoKey(timeName);
        storeData(myKey, totalMinutes);
        navigation.navigate("HomeScreen")
    } 
    
    
    const intoKey = (name) => {
        let result = [];
        for (let i = 0; i < name.length; i++) {
            const char = name[i];
            if (char === "ı") {
                result.push("i");
            } else if (char === " ") {
                result.push("");
            } else if (char === "ö") {
                result.push("o");
            } else if (char === "ğ") {
                result.push("g");
            } else if (char === "ü") {
                result.push("u");
            } else if (char === "ç") {
                result.push("c");
            } else if (char === "ş") {
                result.push("s");
            } else {
                result.push(char);
            }
        }
        return result.join("").toUpperCase();
    }
    
 

    const getData = async () => {
        try {
          const keys = await AsyncStorage.getAllKeys();
          const items = await AsyncStorage.multiGet(keys);
          return items.map(([key, value]) => ({ key, value: JSON.parse(value) }));
        } catch (e) {
          console.error(e);
          return null;
        }
      };  
      
      useEffect(() => {
        const fetchData = async () => {
          const result = await getData();
          setData(result);
        };
      
        fetchData();
      }, []);

    return(
        <ScrollView
      ref={scrollViewRef}
      vertical = {true}
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
      scrollEventThrottle={20}
      onScroll={handleScrollY}
    >
        <View style={{backgroundColor:"#f2e7c9",height:windowHeight, alignItems: "center"}}>
            <View style={{backgroundColor:"white",marginTop:windowHeight*0.3, alignItems: "center",borderRadius:50
            }} >
            <TextInput 
                placeholder="name of the time visualization"
                value={timeName}
                onChangeText={(text)=>setTimeName(text)}
                style={[styles.input,{fontSize:windowWidth*0.03,width:windowWidth*0.7,height:windowHeight*0.1,
                fontSize:windowHeight*0.05}]}
            />
            <TextInput 
                placeholder="# of hours"
                value={hours}
                onChangeText={(text)=>setHours(text)}
                style={[styles.input,{fontSize:windowWidth*0.05,width:windowWidth*0.35,height:windowHeight*0.1}]}
            /> 
            <TextInput 
                placeholder="# of hours"
                value={hours}
                onChangeText={(text)=>setHours(text)}
                style={[styles.input,{fontSize:windowWidth*0.05,width:windowWidth*0.35,height:windowHeight*0.1}]}
            /> 
            <Text style={{fontSize:windowWidth*0.05}}  >hours</Text>

            <TextInput 
                placeholder="# of minutes"
                value={minutes}
                onChangeText={(text)=>setMinutes(text)}
                style={[styles.input,{fontSize:windowWidth*0.03,width:windowWidth*0.7,height:windowHeight*0.1,
                fontSize:windowHeight*0.05}]}
            />
            <SelectComponent onSelect={(value)=> setHours(value)} />
            <SelectComponent onSelect={(value)=> setMinutes(value)} />

            <Pressable onPress={()=>setTimeObject(hours,minutes,timeName,navigation)}  >
                <Text style={{fontSize:windowHeight*0.05}} > Create </Text>
            </Pressable>
            </View>
            {data ? (
                <View>
                    {data.map(item => (
                    <View key={item.key}>
                        <Text>{item.key}</Text>
                        <Text>{JSON.stringify(item.value)}</Text>
                        <Text>{JSON.stringify(item.date)}</Text>
                    </View>
                    ))}
                </View>
                ) : (
                <Text>No data found</Text>
                )}
            
        </View>
    </ScrollView>

    )
}


const styles = StyleSheet.create({
      inputContainer: {
      width: "fitContent",
      height:"fitContent",
      //position: 'absolute',
      backgroundColor: 'whitesmoke',
      zIndex: 1, 
    },
    input: {
      width: "100%",
      height: 10,
      backgroundColor:"white",
      //borderColor: "gray",
      borderWidth: 1,
      marginBottom: 5,
      paddingHorizontal: 5,
      paddingVertical:15
    },
    button: {
      marginTop: 5,
      backgroundColor: 'green',
      padding: 5,
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontSize: 8,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    scrollView: {
      flex: 1,
    },
    scrollViewContent: {
      flexGrow: 1,
    },
  });
  

  