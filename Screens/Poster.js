import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const NamePoster = () => {
  const [name, setName] = useState('');

  const sendNameToServer = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'कृपया नाव भरा');
      return;
    }

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: name, // इथे तू 'name', 'fullName' असं काहीही ठेवू शकतो
        }),
      });

      const json = await response.json();
      console.log('Server Response:', json);
      Alert.alert('Success', 'तुझं नाव सर्व्हरला पाठवलं गेलं! ✅');
    } catch (error) {
      console.error('Error sending name:', error);
      Alert.alert('Error', 'नाव पाठवताना त्रुटी आली 😢');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>तुझं नाव लिहा:</Text>
      <TextInput
        style={styles.input}
        placeholder="तुझं नाव इथे लिहा"
        value={name}
        onChangeText={text => setName(text)}
      />
      <Button title="नाव सर्व्हरला पाठवा" onPress={sendNameToServer} />
    </View>
  );
};

export default NamePoster;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});