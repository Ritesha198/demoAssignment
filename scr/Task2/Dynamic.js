import React from 'react';
import { ImageBackground, SafeAreaView, StyleSheet } from 'react-native';
import DynamicForm from './DynamicForm';

const Dynamic = () => {
  const formConfig = [
    {
      id: 'name',
      type: 'text',
      label: 'Name',
      placeholder: 'Enter your name',
    },
    {
      id: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'Enter your email',
    },
    {
      id: 'age',
      type: 'number',
      label: 'Age',
      placeholder: 'Enter your age',
    },
    {
      id: 'subscribe',
      type: 'switch',
      label: 'Subscribe to newsletter',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
         <ImageBackground source={{ uri: 'https://th.bing.com/th/id/OIP.uT9cBBDaWvFPPl-zd48vTgHaMW?rs=1&pid=ImgDetMain' }} 
   
   imageStyle={{opacity:0.5,}} 
     style={styles.background}
   >

<DynamicForm config={formConfig} />


        </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: "black"
  },
});

export default Dynamic;
