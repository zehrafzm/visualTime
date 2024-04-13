import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, useWindowDimensions,Image,SafeAreaView, FlatList,Pressable, StyleSheet, ScrollView, Dimensions,scrollViewRef  } from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute,useNavigation   } from '@react-navigation/native';
import SelectComponent from "./assets/NumberPicker";
import MinutesPicker from "./assets/MinutesPicker";
import HoursPicker from "./assets/HoursPicker";

export default function CreateTimer ({navigation}){
    const[hours,setHours]=useState("0");
    const[minutes,setMinutes]=useState("0");
    const[timeName,setTimeName]=useState("");
    const [descrip, setDescrip] = useState("");

    const route = useRoute();
    const { width: windowWidth, height: windowHeight } = useWindowDimensions();
    const [data, setData] = useState(null);
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
     
    
     
    const setTimeObject= (hours,minutes,timeName,descrip,navigation)=>{
        const totalMinutes= parseInt(hours)*60 + parseInt(minutes);
        const myKey = intoKey(timeName);
        storeData(myKey, totalMinutes,"MIN",descrip);
        navigation.navigate("Visual", { paramName: intoKey(timeName) })
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

      const handleSelectH = (value) => {
        setHours(value);
      };
      const handleSelectM = (value) => {
        setMinutes(value);
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
        <View style={{backgroundColor:"#181b52",height:windowHeight, alignItems: "center"}}>
            <View style={{backgroundColor:"#8dc8f2",marginTop:windowHeight*0.2, alignItems: "center",borderRadius:50
            }} >
            <TextInput 
                placeholder="name of the time visualization"
                value={timeName}
                onChangeText={(text)=>setTimeName(text)}
                style={[styles.input,{fontSize:windowWidth*0.04,width:windowWidth*0.7,height:windowHeight*0.1,
               }]}
            />
             <TextInput 
                placeholder="description, motivation words etc."
                value={descrip}
                onChangeText={(text)=>setDescrip(text)}
                style={[styles.input,{fontSize:windowWidth*0.04,width:windowWidth*0.7,height:windowHeight*0.1,
             }]}
            />
            <HoursPicker   onSelect={handleSelectH} />
            
            <MinutesPicker onSelect={handleSelectM} />


            <Pressable onPress={()=>setTimeObject(hours,minutes,timeName,descrip,navigation)}  >
                <Text style={{fontSize:windowHeight*0.05}} > Create </Text>
            </Pressable>
            </View>
           
            
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
      backgroundColor: '#bd8700',
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