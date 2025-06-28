import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [responses, setResponses] = useState([]);

  const handleSubmit = () => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log('Response:', data);
        setResponses(prev => [...prev, data]);
        setName('');
        setEmail('');
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert('Error', 'Something went wrong while submitting');
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        placeholder="Enter name"
        value={name}
        onChangeText={text => setName(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Enter email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
      />
      <Button title="Submit" onPress={handleSubmit} />

      {responses.length > 0 && (
        <View style={styles.result}>
          <Text style={styles.text}>All Submitted Responses:</Text>
          {responses.map((item, index) => (
            <Text key={index} style={styles.responseText}>
              {JSON.stringify(item, null, 2)}
            </Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderColor: '#888',
    borderRadius: 5,
  },
  result: {
    marginTop: 20,
  },
  text: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  responseText: {
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 4,
    fontSize: 12,
  },
});
