import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, ToastAndroid, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';

const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dotAnimation] = useState({
    firstDot: new Animated.Value(0),
    secondDot: new Animated.Value(0),
    thirdDot: new Animated.Value(0),
  });

  useEffect(() => {

    
    if (loading) {
      Animated.loop(
        Animated.sequence([
          Animated.stagger(300, [
            Animated.timing(dotAnimation.firstDot, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(dotAnimation.secondDot, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(dotAnimation.thirdDot, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
          ]),
          Animated.stagger(300, [
            Animated.timing(dotAnimation.firstDot, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(dotAnimation.secondDot, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(dotAnimation.thirdDot, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start();
    }
  }, [loading]);

  const login = async () => {
    setLoading(true);
    if (!email.trim() || !password.trim()) {
      ToastAndroid.show('Enter all the fields', ToastAndroid.SHORT);
    setLoading(false);

    }else{
    try {
      const token = 'fake-token'; // Replace with actual token retrieval logic
      const lastActivity = Date.now();
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('lastActivity', lastActivity.toString());

      setTimeout(() => {
        setLoading(false);
        navigation.navigate('HomeScreen');
      ToastAndroid.show('Sign In successfull', ToastAndroid.SHORT);

      }, 2000); // Simulates a delay of 2 seconds
    } catch (error) {
      setLoading(false);
      // Handle error here
      console.error(error);
    }
  }
  };

  const dotStyle = (dot) => ({
    opacity: dotAnimation[dot].interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  });

  return (
    <ImageBackground source={{ uri: 'https://img.freepik.com/premium-photo/energy-flow-background-generative-ai_379823-9005.jpg' }} 
   
    imageStyle={{opacity:0.7,}} 
      style={styles.container}
    >
      <Animatable.View
        animation="fadeInUp"
        duration={1000}
        style={styles.inner}
      >
        <Text style={styles.header}>Login</Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#000"
          style={styles.textInput}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#000"
          secureTextEntry
          style={styles.textInput}
          value={password}
          onChangeText={setPassword}
        />
        {loading ? (
          <View style={styles.loaderContainer}>
            <Animated.View style={[styles.dot, dotStyle('firstDot')]} />
            <Animated.View style={[styles.dot, dotStyle('secondDot')]} />
            <Animated.View style={[styles.dot, dotStyle('thirdDot')]} />
          </View>
        ) : (
          <TouchableOpacity style={styles.button} onPress={login}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        )}
      </Animatable.View>
      </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"black"
  },
  inner: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color:"gray"
  },
  textInput: {
    height: 40,
    borderColor: '#ddd',
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#000',
  },
  button: {
    backgroundColor: '#3b5998',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center"
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000',
    marginHorizontal: 5,
  },
});

export default LoginScreen;
