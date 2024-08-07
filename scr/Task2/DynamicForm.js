import React, { useState } from 'react';
import { View, Text, TextInput, Switch, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const DynamicForm = ({ config }) => {
  const [formState, setFormState] = useState(() =>
    config.reduce((acc, field) => ({ ...acc, [field.id]: field.type === 'switch' ? false : '' }), {})
  );

  const handleChange = (id, value) => {
    setFormState((prevState) => ({ ...prevState, [id]: value }));
  };

  const renderField = (field) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
        return (
          <View key={field.id} style={styles.fieldContainer}>
            <Text style={styles.label}>{field.label}</Text>
            <TextInput
              style={styles.input}
              placeholder={field.placeholder}
              keyboardType={field.type === 'number' ? 'numeric' : 'default'}
              onChangeText={(text) => handleChange(field.id, text)}
              value={formState[field.id]}
            />
          </View>
        );
      case 'switch':
        return (
          <View key={field.id} style={{...styles.fieldContainer, flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
            <Text style={styles.label}>{field.label}</Text>
            <Switch
              onValueChange={(value) => handleChange(field.id, value)}
              value={formState[field.id]}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.formContainer}>
        {config.map(renderField)}
        <TouchableOpacity style={styles.button} onPress={() => console.log(formState)} >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)',
  },
  formContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    backgroundColor: '#f9f9f9',
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
});

export default DynamicForm;
