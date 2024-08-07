import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, AppState, StyleSheet, ImageBackground, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = ({ navigation }) => {
  const [remainingTime, setRemainingTime] = useState(30 * 60 * 1000);
  const [timerActive, setTimerActive] = useState(true);

  const updateActivity = async () => {
    const currentTime = Date.now();
    await AsyncStorage.setItem('lastActivity', currentTime.toString());
    if (timerActive) {
      const newRemainingTime = 30 * 60 * 1000 - (currentTime - parseInt(await AsyncStorage.getItem('lastActivity'), 10));
      setRemainingTime(newRemainingTime);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      const token = await AsyncStorage.getItem('token');
      const lastActivity = await AsyncStorage.getItem('lastActivity');
      const currentTime = Date.now();

      if (!token || !lastActivity || (currentTime - parseInt(lastActivity, 10) > 30 * 60 * 1000)) {
        navigation.navigate('LoginScreen');
      } else {
        const newRemainingTime = 30 * 60 * 1000 - (currentTime - parseInt(lastActivity, 10));
        if (newRemainingTime > 0) {
          setRemainingTime(newRemainingTime);
        } else {
          navigation.navigate('LoginScreen');
          ToastAndroid.show('Session has expired', ToastAndroid.SHORT);

        }
      }
    };

    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'active') {
        checkSession();
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    const intervalId = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1000) {
          clearInterval(intervalId);
          navigation.navigate('LoginScreen');
          return 0;
        }
        return prevTime - 1000;
      });
    }, 1000); // Update every second

    // Initial session check
    checkSession();

    // Clean up on unmount
    return () => {
      clearInterval(intervalId);
      subscription.remove();
    };
  }, [navigation, timerActive]);

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <ImageBackground source={{ uri: 'https://static.vecteezy.com/system/resources/previews/023/631/620/large_2x/hourglass-with-sand-on-dark-background-time-concept-3d-rendering-ai-generative-image-free-photo.jpg' }}
      style={styles.background}
      imageStyle={{ opacity: 0.6, }}
      onTouchStart={updateActivity}>
      <View style={styles.container}>
        <Text style={styles.title}>Home Screen</Text>
        <Icon name="clock-o" size={50} color="#fff" />
        <Text style={styles.timer}>Session expires in: {formatTime(remainingTime)}</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={async () => {
          await AsyncStorage.removeItem('token');
          navigation.navigate('LoginScreen');
        }}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "black"
  },
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  timer: {
    fontSize: 20,
    color: '#fff',
    marginVertical: 20,
  },
  logoutButton: {
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HomeScreen;