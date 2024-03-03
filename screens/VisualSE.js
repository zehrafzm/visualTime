import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, useWindowDimensions,Image,SafeAreaView, FlatList,Pressable, StyleSheet, ScrollView, Dimensions,TouchableOpacity  } from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute,useNavigation   } from '@react-navigation/native';
import Circle from "./assets/Circle";

export default function VisualSE (){
    const { width: windowWidth, height: windowHeight } = useWindowDimensions();
    const [data, setData] = useState(null);
    const route = useRoute();
    const { paramName } = route.params;
    const [remainingDays, setRemainingDays] = useState(0);
    const navigation = useNavigation();
    const [totalDays, setTotalDays]= useState(0);
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
  
          const startDate = new Date(storedValue.date).getTime();
          const endDate = new Date(storedValue.value).getTime();
          const timeDifference = endDate - startDate;
  
          setTotalDays(Math.floor(timeDifference / (1000 * 60 * 60 * 24)));
  
          const currentDate = new Date().getTime();
          const timeDifferenceDays = Math.floor((endDate - currentDate) / (1000 * 60 * 60 * 24));
          setRemainingDays(timeDifferenceDays > 0 ? timeDifferenceDays : 0);
  
        } catch (e) {
          console.error(e);
        }
      };
  
      const intervalId = setInterval(() => {
        fetchData();
      }, 24 * 60 * 60000); // Update every day
  
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

    const circleData = Array.from({ length: totalDays }).map((_, index) => ({
        key: String(index),
        color: index < totalDays-remainingDays ? '#1386cf' : 'black',
      }));
      

    
    return(
        <View style={{backgroundColor:"white",height:windowHeight, alignItems: "center"}}>
        <Pressable style={styles.button }  onPress={()=>deleteData(paramName,navigation)}><Text style={styles.buttonText } >delete </Text></Pressable>
           {data ? (
                <View>
                    <Text style={[styles.Textt,{backgroundColor:"#fff9eb",fontWeight:"bold",fontSize:38,textAlign:"center",
                    margin:15, borderRadius:25 , fontFamily:"Courier New"                 
                    }]}>{data.paramName}</Text>
                    
                    <Text style={{backgroundColor:"#fffceb",fontStyle:"italic",fontSize:25,textAlign:"center"}} > {data.value.descrip}</Text>

                    <Text style={styles.Textt} >start date: 
                    {new Date(data.value.date).getDay()}-{new Date(data.value.date).getMonth()}-
                    {new Date(data.value.date).getFullYear()}</Text>
                    <Text style={styles.Textt} >end date: 
                    {new Date(data.value.value).getDay()}-{new Date(data.value.value).getMonth()}-
                    {new Date(data.value.value).getFullYear()}</Text>
                    
                    <Text style={styles.Textt} >total days: {totalDays}</Text>
                    <Text style={styles.Textt} >remaining time: {remainingDays} days</Text>

                </View>
            ) : (
                <Text>No data found for key: {paramName}</Text>
            )}

              <Text style={[styles.Textt,{margin:5,fontSize:20}]} >columns: </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}   >
              <Pressable style={[styles.button,{margin:25,width:50,height:50,justifyContent:"center"}] }  onPress={()=>setNumColumns(5)} ><Text  style={styles.buttonText } >5</Text></Pressable>
              <Pressable style={[styles.button,{margin:25,width:50,height:50,justifyContent:"center"}] }  onPress={()=>setNumColumns(7)} ><Text  style={styles.buttonText } >7</Text></Pressable>
              <Pressable style={[styles.button,{margin:25,width:50,height:50,justifyContent:"center"}] }  onPress={()=>setNumColumns(10)} ><Text  style={styles.buttonText } >10</Text></Pressable>
              
              </View>
             
            <FlatList
            key={numColumns} 
            data={circleData}
            numColumns={numColumns} 
            renderItem={({ item }) => <Circle color={item.color} size={(windowWidth*0.6)/numColumns} />}
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
      fontSize: 20  ,
      fontStyle: "italic",
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