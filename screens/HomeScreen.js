import { View, Text, Pressable, StyleSheet } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useWindowDimensions,ScrollView, scrollViewRef } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute  } from '@react-navigation/native';


const HomeScreen = ({ navigation }) => {
  const [toggleE,setToggleE]=useState(false)
  const [toggleA,setToggleA]=useState(false)
  const route = useRoute();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [scrollPositionY, setScrollPositionY] = useState(0);
  const handleScrollY = (event) => {
    setScrollPositionY(event.nativeEvent.contentOffset.y);
  };
  const [data, setData] = useState(null);

  const getData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);
      return items.reduce((acc, [key, value]) => {
        const parsedValue = JSON.parse(value);
        if (parsedValue !== null) {
          acc.push({ key, value: parsedValue });
        }
        return acc;
      }, []);
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
  }, []); // Run only once when the component mounts

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result);
    };

    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation]); // Run every time the navigation focus changes

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
  return (
    <ScrollView
      ref={scrollViewRef}
      vertical = {true}
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
      scrollEventThrottle={20}
      onScroll={handleScrollY}
    >
    <View style={[styles.container,{minHeight:windowHeight}]}>

    <Pressable
        style={!toggleE ?styles.button :  [styles.button,{backgroundColor:"#95bf97"}]}
        onPress={() =>setToggleE(!toggleE) }
      >
      <Text style={styles.buttonText}>Existing Visualizations</Text>
      {toggleE&&(
        <View>
        {data ? (
    <View>
      {data.map(item => (
        item.value.type === "SE" ? (
          <View key={item.key}>
            <Pressable style={styles.button} onPress={() => navigation.navigate("VisualSE", { paramName: item.key })}>
            
              <Text style={styles.buttonText}>{item.key}</Text>
              <Text style={styles.buttonText}>{item.value.type}</Text>

            </Pressable>
          </View>
        ) : item.value.type === "MIN" ? (
          <View key={item.key}>
            <Pressable style={styles.button} onPress={() => navigation.navigate("Visual", { paramName: item.key })}>
              <Text style={styles.buttonText}>{item.key}</Text>
              <Text style={styles.buttonText}>{item.value.type}</Text>
            </Pressable>
          </View>
        ) : null
      ))}
  </View>
) : (
  <Text>No data found</Text>
)}

        </View>
      )}
      </Pressable>      
    <Pressable
        style={!toggleA ?styles.button :  [styles.button,{backgroundColor:"#95bf97"}]}
        onPress={() =>setToggleA(!toggleA) }
      >
      <Text style={styles.buttonText}>Create Timer</Text>
      {toggleA&&(
        <View>
        {data ? (
                <View>
                    
                        <Pressable style={styles.button }  onPress={()=> navigation.navigate("CreateTimer")}  >                            
                                <Text style={styles.buttonText} > hours & minutes</Text>
                        </Pressable>
                        <Pressable style={styles.button }  onPress={()=> navigation.navigate("StartEnd")}  >                            
                                <Text style={styles.buttonText} > start & end date</Text>
                        </Pressable>
                    
                    
                </View>
                ) : (
                <Text>No data found</Text>
                )}
        </View>
      )}
      </Pressable>      
        
      
      
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"white"
  },
  button: {
    marginTop: 15,
    backgroundColor: '#f9e6ff',
    padding: 25,
    borderRadius:75,
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});


export default HomeScreen;

