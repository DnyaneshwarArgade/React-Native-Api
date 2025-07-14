import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TextInput,
  TouchableOpacity, Image, Modal, Alert
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Screens/Home';
import Icon from 'react-native-vector-icons/FontAwesome'

const Stack = createNativeStackNavigator();

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    fetch('https://onlinetradings.in/batla-backend/public/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Alert.alert(data.message);
          navigation.replace('Home');
          setEmail('');
          setPassword('');
        } else {
          Alert.alert(data.message);
        }
      })
      .catch((error) => {
        console.error('Login Error:', error);
        Alert.alert('Error', 'Something went wrong.');
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/6681/6681204.png' }}
          style={styles.image}
        />
        <Text style={styles.labeltext}>Email :</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.labeltext}>Password :</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.logintext}>Login</Text>
        </TouchableOpacity>

        <View style={styles.iconview}>
          <Icon.Button
            name="facebook"
            backgroundColor="#3b5998"
             style={styles.iconbutton}
          >
          Facebook
          </Icon.Button>

          <Icon.Button
          style={styles.iconbutton}
            name="google"
            backgroundColor="#DB4437"
          >Google</Icon.Button>

        </View>

      </View>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6.65,
    elevation: 8,
    alignItems: 'center',
  },
  image: {
    height: 100,
    width: 100,
    marginBottom: 20
  },
  labeltext: {
    fontSize: 16,
    alignSelf: 'flex-start',
    marginTop: 20
  },
  input: {
    width: '100%',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
    marginTop: 10,
  },
  button: {
    backgroundColor: 'orange',
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  logintext: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  iconview: {
    flexDirection: "row",
    gap : 10,
    marginTop  : 12
  },
 
});
