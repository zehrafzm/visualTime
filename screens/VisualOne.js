import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, useWindowDimensions,Image,SafeAreaView, FlatList,Pressable, StyleSheet, ScrollView, Dimensions,TouchableOpacity  } from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute,useNavigation   } from '@react-navigation/native';
import Circle from "./assets/Circle";
import empty from "./assets/empty.png";
import done from "./assets/done.png";

export default function VisualOne (){
    const { width: windowWidth, height: windowHeight } = useWindowDimensions();
    const [data, setData] = useState(null);
    const route = useRoute();
    const { paramName } = route.params;
    const [remainingMinutes, setRemainingMinutes] = useState(0);
    const navigation = useNavigation();
    const [totalMinutes,setTotalMinutes]=useState(0)
    const [numColumns, setNumColumns] = useState(5); // Initial number of columns
    const [scrollPositionY, setScrollPositionY] = useState(0);
    const handleScrollY = (event) => {
      setScrollPositionY(event.nativeEvent.contentOffset.y);
    };

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
        //color: index < totalMinutes-remainingMinutes ? '#1386cf' : 'white',
        image: index < totalMinutes - remainingMinutes ? done : empty,
      }));

    
    return(
      
      <View style={{backgroundColor:"#181b52",height:windowHeight, alignItems: "center"}}>
            <Pressable style={[styles.button,{margin:20}] }   onPress={()=>navigation.navigate("HomeScreen")}><Text style={styles.buttonText } >HomeScreen </Text></Pressable>
            <Pressable style={[styles.button,{margin:20}] }  onPress={()=> navigation.navigate("OneTime")}  >                            
                                <Text style={styles.buttonText} >set timer</Text>
                </Pressable>    
           {data ? (
            
                <View>
                     <Text style={styles.Textt} >total minutes: {JSON.stringify(data.value.value)}</Text>
                    <Text style={styles.Textt} >remaining time: {remainingMinutes} minutes</Text>

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
        {/**
           <FlatList
            key={numColumns} 
            data={circleData}
            numColumns={numColumns} 
            renderItem={({ item }) => <Circle color={item.color} size={(windowWidth*0.6)/numColumns} />}
            keyExtractor={(item) => item.key}
            contentContainerStyle={{ alignItems: 'center' }} 
        />
         */}
        <Text style={{opacity:0}}>ssssssssssssssssssss</Text>
        <Text style={{opacity:0}}>ssssssssssssssssssss</Text>
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
      margin:10
    },
    Textt: {
      color: 'white',
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