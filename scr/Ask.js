import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable';

const Ask = ({navigation}) => {
    return (
        <ImageBackground 
          source={{ uri: 'https://wallpaperaccess.com/full/1129217.jpg' }} 
          style={styles.background}
          imageStyle={{opacity:0.6}}
        >
          <View style={styles.container}>
            <Animatable.View animation="slideInDown" duration={1500}>
              <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("LoginScreen")}>
                <Text style={styles.buttonText}>Go To Task 1</Text>
              </TouchableOpacity>
            </Animatable.View>
            <Animatable.View animation="slideInUp" duration={1500}>
              <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("Dynamic")}>
                <Text style={styles.buttonText}>Go To Task 2</Text>
              </TouchableOpacity>
            </Animatable.View>
          </View>
        </ImageBackground>
      );
    };
    
    const styles = StyleSheet.create({
      background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"black"
      },
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      button: {
        backgroundColor: '#6200EE',
        padding: 30,
        margin: 10,
        borderRadius: 5,
        width:Dimensions.get("window").width*0.6,
        alignItems:"center"
      },
      buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight:"700"
      },
    });

export default Ask
