// import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
// import React, { useState,useEffect } from 'react';

// const App = () => {

//   const [posts, setPosts] = useState([]);
//   console.log('posts', posts)
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     fetch('https://jsonplaceholder.typicode.com/posts')
//       .then((res) => res.json())
//       .then((data) => setPosts(data))
//       .catch((err) => console.error('API Error:', err))
//       .finally(() => setLoading(false));
//   }, []);




//   return (
//     <View style={styles.container}>
//       {loading ? (
//         <ActivityIndicator size="large" color="blue" style={{marginTop: 10}} />
//       ) : (
//         posts.slice(0, 5).map((post) => (
//           <Text key={post.id} style={{marginVertical: 2}}>
//            {post.id} {post.title}

//           </Text>
//         ))
//       )}
//     </View>
//   );
// };

// export default App;

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     marginTop: 50,
//   },
//   title: {
//     fontSize: 23,
//     textAlign: 'center',
//     color: 'red',
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 18,
//     color: 'blue',
//     marginBottom: 5,
//     marginTop: 10,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: 'black',
//     padding: 10,
//     borderRadius: 5,
//   },
//   button: {
//     marginTop: 20,
//     backgroundColor: 'blue',
//     padding: 12,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontSize: 16,
//   },
// });

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   ActivityIndicator,
//   StyleSheet,
//   ScrollView,
//   TextInput,
//   Button,
// } from 'react-native';
// import axios from 'axios';

// const App = () => {
//   const [data, setData] = useState([]);         // full data from API
//   const [loading, setLoading] = useState(true); // loading state
//   const [search, setSearch] = useState('');     // input filter
//   const [page, setPage] = useState(1);          // current page
//   const limit = 10;                              // items per page

//   useEffect(() => {
//     axios.get('https://jsonplaceholder.typicode.com/posts')
//       .then(response => {
//         setData(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('API Error:', error);
//         setLoading(false);
//       });
//   }, []);

//   // ✅ Input Filter: match title
//   const filteredData = data.filter(item =>
//     item.title.toLowerCase().includes(search.toLowerCase())
//   );

//   // ✅ Pagination logic
//   const startIndex = (page - 1) * limit;
//   const endIndex = startIndex + limit;
//   const paginatedData = filteredData.slice(startIndex, endIndex);
//   const totalPages = Math.ceil(filteredData.length / limit);

//   return (
//     <View style={{ flex: 1, paddingTop: 40, paddingHorizontal: 10 }}>
//       {/* 🔍 Input Filter */}
//       <TextInput
//         style={styles.input}
//         placeholder="Search title..."
//         value={search}
//         onChangeText={(text) => setSearch(text.replace(/[^a-zA-Z0-9 ]/g, ''))} // input filter
//       />

//       {loading ? (
//         <ActivityIndicator size="large" color="blue" />
//       ) : (
//         <ScrollView horizontal>
//           <View>
//             {/* Table Header */}
//             <View style={[styles.row, styles.header]}>
//               <Text style={[styles.cell, styles.headerText]}>ID</Text>
//               <Text style={[styles.cell, styles.headerText]}>UserId</Text>
//               <Text style={[styles.cell, styles.headerText]}>Title</Text>
//               <Text style={[styles.cell, styles.headerText]}>Body</Text>
//             </View>

//             {/* Table Rows */}
//             <ScrollView style={{ maxHeight: 400 }}>
//               {paginatedData.map(item => (
//                 <View key={item.id} style={styles.row}>
//                   <Text style={styles.cell}>{item.id}</Text>
//                   <Text style={styles.cell}>{item.userId}</Text>
//                   <Text style={styles.cell}>{item.title}</Text>
//                   <Text style={styles.cell}>{item.body}</Text>
//                 </View>
//               ))}
//             </ScrollView>

//             {/* Pagination Controls */}
//             <View style={styles.pagination}>
//               <Button
//                 title="Prev"
//                 onPress={() => setPage(prev => Math.max(prev - 1, 1))}
//                 disabled={page === 1}
//               />
//               <Text style={{ marginHorizontal: 10 }}>Page {page} / {totalPages}</Text>
//               <Button
//                 title="Next"
//                 onPress={() => setPage(prev => Math.min(prev + 1, totalPages))}
//                 disabled={page === totalPages}
//               />
//             </View>
//           </View>
//         </ScrollView>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   input: {
//     borderWidth: 1,
//     marginBottom: 10,
//     padding: 10,
//     fontSize: 16,
//     borderRadius: 5,
//   },
//   row: {
//     flexDirection: 'row',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     backgroundColor: '#fff',
//   },
//   header: {
//     backgroundColor: '#2196F3',
//   },
//   headerText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   cell: {
//     flex: 1,
//     padding: 10,
//     borderRightWidth: 1,
//     borderColor: '#ccc',
//     textAlign: 'left',
//     fontSize: 14,
//   },
//   pagination: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 10,
//     paddingBottom: 30,
//   },
// });

// export default App;

// import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
// import React, {useState, useEffect} from 'react'

// const App = () => {

//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   getApidata = () => {
//     const uri = "https://jsonplaceholder.typicode.com/posts";
//     const result = fetch(uri).json();
//     setData(result);
//     setLoading(false);
//   }
//   useEffect(() => {
//     getApidata();
//   })

//   return (
//     <View>
//       <Text>App</Text>
//       <View data={data} 
//          renderItem={({item})}
//       >
//         <Text style={{fontSize : 19}}>{item.id}</Text>
//         <Text style={{fontSize : 19}}>{item.userId}</Text>
//         <Text style={{fontSize : 19}}>{item.Title}</Text>
//         <Text style={{fontSize : 19}}>{item.Body}</Text>
//       </View>
//     </View>
//   )
// }

// export default App;


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
