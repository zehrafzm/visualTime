import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, useWindowDimensions,Image,SafeAreaView, FlatList,Pressable, StyleSheet, ScrollView, Dimensions,scrollViewRef  } from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute,useNavigation   } from '@react-navigation/native';
import SelectComponent from "./assets/NumberPicker";
import MonthPicker from "./assets/MonthPicker";
import DayPicker from "./assets/DayPicker";
import YearPicker from "./assets/YearPicker";


export default function StartEnd (){
    const[day,setDay]=useState("1");
    const[month,setMonth]=useState("1");
    const[year,setYear]=useState("2024");
    const[timeName,setTimeName]=useState("");
    const [descrip, setDescrip] = useState("");

    const { width: windowWidth, height: windowHeight } = useWindowDimensions();
    const [data, setData] = useState(null);
    const navigation = useNavigation();
    const [scrollPositionY, setScrollPositionY] = useState(0);
    const handleScrollY = (event) => {
      setScrollPositionY(event.nativeEvent.contentOffset.y);
    };

    const storeData = async (myKey,value,type,descrip) => {
        try {
            const currentDate = new Date();
            const data = { date: currentDate, value: value,type:type, descrip:descrip };  
            const jsonValue = JSON.stringify(data);
            await AsyncStorage.setItem(myKey, jsonValue);
        } catch (e) {
          // saving error
        }
      };
     
    
     
    const setTimeObject= (day,month,year,timeName,descrip,navigation)=>{
        const storedDate = new Date(year, month - 1, day);
        const myKey = intoKey(timeName);
        storeData(myKey, storedDate,"SE",descrip);
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

      const handleSelectD = (value) => {
        setDay(value);
      };
      const handleSelectM = (value) => {
        setMonth(value);
      };
      const handleSelectY = (value) => {
        setYear(value);
      };

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
            <View style={{backgroundColor:"white",marginTop:windowHeight*0.23, alignItems: "center",borderRadius:50
            }} >
            <TextInput 
                placeholder="name of the time visualization"
                value={timeName}
                onChangeText={(text)=>setTimeName(text)}
                style={[styles.input,{fontSize:windowWidth*0.03,width:windowWidth*0.7,height:windowHeight*0.1,
                fontSize:windowHeight*0.02}]}
            />
            <TextInput 
                placeholder="description, motivation words etc."
                value={descrip}
                onChangeText={(text)=>setDescrip(text)}
                style={[styles.input,{fontSize:windowWidth*0.03,width:windowWidth*0.7,height:windowHeight*0.1,
                fontSize:windowHeight*0.02}]}
            />
            
            <DayPicker onSelect={handleSelectD} />

            <MonthPicker   onSelect={handleSelectM} />
            
            <YearPicker onSelect={handleSelectY} />


            <Pressable onPress={()=>setTimeObject(day,month,year,timeName,descrip,navigation)}  >
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
      //borderWidth: 1,
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
  

  /*

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

  */