import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, useWindowDimensions,Image,SafeAreaView, FlatList,Pressable, StyleSheet, ScrollView, Dimensions,TouchableOpacity  } from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute,useNavigation   } from '@react-navigation/native';
import Circle from "./assets/Circle";
import empty from "./assets/empty.png";
import done from "./assets/done.png";

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
  
          setTotalDays(1+Math.floor(timeDifference / (1000 * 60 * 60 * 24)));
  
          const currentDate = new Date().getTime();
          const timeDifferenceDays =1+ Math.floor((endDate - currentDate) / (1000 * 60 * 60 * 24));
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
        image: index < totalDays - remainingDays ? done : empty,      }));
     
 

    
    return(
        <View style={{backgroundColor:"#181b52",height:windowHeight, alignItems: "center"}}>
        <Pressable style={styles.button }  onPress={()=>deleteData(paramName,navigation)}><Text style={styles.buttonText } >delete </Text></Pressable>
           {data ? (
                <View>
                    <Text style={[styles.Textt,{fontWeight:"bold",fontSize:38,textAlign:"center",
                    margin:10, borderRadius:25                 
                    }]}>{data.paramName}</Text>
                    
                    <Text style={{backgroundColor:"#fffceb",fontStyle:"italic",fontSize:25,textAlign:"center"}} > {data.value.descrip}</Text>

                    <Text style={styles.Textt} >start date: 
                    {new Date(data.value.date).getDate()}-{new Date(data.value.date).getMonth() + 1}-
                    {new Date(data.value.date).getFullYear()}
                  </Text>
                  <Text style={styles.Textt} >end date: 
                  {new Date(data.value.value).getDate()}-{new Date(data.value.value).getMonth() + 1}-
                  {new Date(data.value.value).getFullYear()}
                </Text>
                    
                    <Text style={styles.Textt} >total : {totalDays} days | remaining : {remainingDays} days</Text>
                    <Text style={styles.Textt} ></Text>

                </View>
            ) : (
                <Text>No data found for key: {paramName}</Text>
            )}

              <Text style={[styles.Textt,{margin:5,fontSize:20}]} >columns: </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}   >
              <Pressable style={[styles.button,{margin:25,width:90,height:70,justifyContent:"center"}] }  onPress={()=>setNumColumns(5)} ><Text  style={styles.buttonText } >5</Text></Pressable>
              <Pressable style={[styles.button,{margin:25,width:90,height:70,justifyContent:"center"}] }  onPress={()=>setNumColumns(7)} ><Text  style={styles.buttonText } >7</Text></Pressable>
              <Pressable style={[styles.button,{margin:25,width:90,height:70,justifyContent:"center"}] }  onPress={()=>setNumColumns(10)} ><Text  style={styles.buttonText } >10</Text></Pressable>
              </View>
             
              <FlatList
                    key={numColumns}
                    data={circleData}
                    numColumns={numColumns}
                    renderItem={({ item }) => (
                        <Image
                            source={item.image}
                            style={{
                                width: (windowWidth * 0.6) / numColumns,
                                height: (windowWidth * 0.6) / numColumns,
                                margin:(windowWidth * 0.6) / numColumns*0.2
                            }}
                        />
                    )}
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
      backgroundColor: '#181b52',
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
      backgroundColor: '#7e8fbd',
      padding: 5,
      borderRadius: 5,
      width:500,
      borderBlockColor:"#aabbe6",
      borderWidth:10
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    Textt: {
      color: 'white',
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