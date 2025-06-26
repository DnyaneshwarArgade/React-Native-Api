import { StyleSheet, Text, View, ActivityIndicator, FlatList, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import About from './Screens/About';
import Contact from './Screens/Contact';

// ------------------------ Home Screen ------------------------
const Home = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    getApidata();
  }, []);

  const getApidata = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const result = await response.json();
      setData(result);
      setFilteredData(result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchId === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter(item => item.id.toString() === searchId);
      setFilteredData(filtered);
    }
  };

  const handleReset = () => {
    setFilteredData(data);
    setSearchId(' ');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>API Data</Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>List</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('About')}>
          <Text style={styles.buttonText}>Table</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Contact')}>
          <Text style={styles.buttonText}>Contact Page</Text>
        </TouchableOpacity>

      </View>

      <TextInput
        style={styles.input}
        placeholder='Enter ID to search...'
        value={searchId}
        id='searchinput'
        onChangeText={text => setSearchId(text.replace(/[^0-9]/g, ''))}
        keyboardType='numeric'
      />

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemBox}>
              <Text style={styles.itemText}>ID: {item.id}</Text>
              <Text style={styles.itemText}>UserID: {item.userId}</Text>
              <Text style={styles.itemText}>Title: {item.title}</Text>
              <Text style={styles.itemText}>Body: {item.body}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

// ------------------------ Navigation Setup ------------------------
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="About" component={About} /> 
        <Stack.Screen name='Contact' component={Contact} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// ------------------------ Styles ------------------------
const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemBox: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "red",
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    minWidth: 100,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default App;
