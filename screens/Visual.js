import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, useWindowDimensions,Image,SafeAreaView, FlatList,Pressable, StyleSheet, ScrollView, Dimensions,TouchableOpacity  } from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute,useNavigation   } from '@react-navigation/native';
import Circle from "./assets/Circle";

export default function Visual (){
    const { width: windowWidth, height: windowHeight } = useWindowDimensions();
    const [data, setData] = useState(null);
    const route = useRoute();
    const { paramName } = route.params;
    const [remainingMinutes, setRemainingMinutes] = useState(0);
    const navigation = useNavigation();
    const [totalMinutes,setTotalMinutes]=useState(0)
    const [numColumns, setNumColumns] = useState(5); // Initial number of columns


    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem(paramName);
            return value ? { paramName, value: JSON.parse(value) } : null;
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
      
    useEffect(() => {
        const fetchData = async () => {
          try {
            const jsonValue = await AsyncStorage.getItem(paramName);
            const storedValue = JSON.parse(jsonValue);
            setTotalMinutes(storedValue.value);
            const storedHours = new Date(storedValue.date).getHours();
            const storedMinutes = new Date(storedValue.date).getMinutes();
            const currentTime = new Date();
            const currentHours = currentTime.getHours();
            const currentMinutes = currentTime.getMinutes();
            const storedTotalMinutes = storedHours * 60 + storedMinutes;
            const currentTotalMinutes = currentHours * 60 + currentMinutes;
            const timeDifference = -storedTotalMinutes + currentTotalMinutes;
            const remainingTime = storedValue.value - timeDifference;
            setRemainingMinutes(remainingTime>0 ? remainingTime : 0);
          } catch (e) {
            console.error(e);
          }
        };
        const intervalId = setInterval(() => {
            fetchData();
          }, 60000); // Update every 60 seconds
      
        fetchData();
        return () => {
            clearInterval(intervalId); 
          };
      }, [paramName]);

    const deleteData = async (myKey,navigation) => {
        try {
            await AsyncStorage.removeItem(myKey);
            // Item removed successfully
        } catch (e) {
            console.error(e);
            // Error removing item
        };
        navigation.navigate("HomeScreen")
    };

    const circleData = Array.from({ length: totalMinutes }).map((_, index) => ({
        key: String(index),
        color: index < totalMinutes-remainingMinutes ? '#1386cf' : 'white',
      }));

    
    return(
        <View style={{backgroundColor:"#f2e7c9",height:windowHeight, alignItems: "center"}}>
        <Pressable style={styles.button }  onPress={()=>deleteData(paramName,navigation)}><Text style={styles.buttonText } >delete </Text></Pressable>
           {data ? (
                <View>
                    <Text style={styles.Textt}>{data.paramName}</Text>
                    <Text style={styles.Textt} >total minutes: {JSON.stringify(data.value.value)}</Text>
                    <Text style={styles.Textt} >remaining time: {remainingMinutes} minutes</Text>

                </View>
            ) : (
                <Text>No data found for key: {paramName}</Text>
            )}
            <FlatList
            key={numColumns} 
            data={circleData}
            numColumns={numColumns} 
            renderItem={({ item }) => <Circle color={item.color} />}
            keyExtractor={(item) => item.key}
            contentContainerStyle={{ alignItems: 'center' }} 
        />
        </View>
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
      backgroundColor: '#95bf97',
      padding: 5,
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    Textt: {
      color: 'black',
      fontSize: 28,
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
                    <Text style={styles.Textt} >created at: {JSON.stringify(Date(data.value.date))}</Text>

  */