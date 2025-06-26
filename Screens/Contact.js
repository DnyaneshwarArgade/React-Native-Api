// import { StyleSheet, View } from 'react-native';
// import React from 'react';
// import { ScrollView, GestureHandlerRootView, Text } from 'react-native-gesture-handler';

// const Contact = () => {
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <ScrollView horizontal={true} contentContainerStyle={styles.container}>
//         <View><Text>Dnyaneshwar</Text></View>
//         <View style={styles.box2} />
//         <View style={styles.box3} />
//         <View style={styles.box4} />
//         <View style={styles.box5} />
//         <View style={styles.box1} />
//         <View style={styles.box2} />
//         <View style={styles.box3} />
//         <View style={styles.box4} />
//         <View style={styles.box5} />
//         <View style={styles.box1} />
//         <View style={styles.box2} />
//         <View style={styles.box3} />
//         <View style={styles.box4} />
//         <View style={styles.box5} />
//         <View style={styles.box1} />
//         <View style={styles.box2} />
//         <View style={styles.box3} />
//         <View style={styles.box4} />
//         <View style={styles.box5} />
//       </ScrollView>
//       <View>
//         {/* <Button title="Go to About" onPress={() => navigation.navigate('Poster')} /> */}
//       </View>
//     </GestureHandlerRootView>
//   );
// };

// export default Contact;

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     // backgroundColor : "red" // Must be here for horizontal layout
//   },
//   box1: {
//     width: 100,
//     height: 100,
//     backgroundColor: 'red',
//     borderRadius : "50%",
//   },
//   box2: {
//     width: 100,
//     height: 100,
//     backgroundColor: 'blue',
//     borderRadius : "50%",
//   },
//   box3: {
//     width: 100,
//     height: 100,
//     backgroundColor: 'green',
//     borderRadius : "50%",
//   },
//   box4: {
//     width: 100,
//     height: 100,
//     backgroundColor: 'yellow',
//     borderRadius : "50%",
//   },
//   box5: {
//     width: 100,
//     height: 100,
//     backgroundColor: 'purple',
//     borderRadius : "50%",
//   },
// });

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Contact = () => {
  return (
    <View style={styles.container}>
      <Text>Contact</Text>
      <Text>Contact</Text>
      <Text>Contact</Text>
      <Text>Contact</Text>
      <Text>Contact</Text>
      <Text>Contact</Text>
      <Text>Contact</Text>
      <Text>Contact</Text>
    </View>
  )
}

export default Contact

const styles = StyleSheet.create({
  container : {
    flex : 1,
    flexDirection : "row",
  }
})
