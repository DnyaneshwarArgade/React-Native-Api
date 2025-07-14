import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Items from './Items';
import Customer from './Customer';
import Order from './Order';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const HomeScreen = () => (
  <View style={styles.screen}>
    <Text>This is Home Screen</Text>
  </View>
);

const Home = () => {
  const navigation = useNavigation();
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    setShowLogout(false);
    navigation.replace('Login');
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: true,
          headerRight: () => (
            <View>
              <TouchableOpacity onPress={() => setShowLogout(!showLogout)}>
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
                  }}
                  style={{
                    width: 30,
                    height: 30,
                    marginRight: 15,
                    borderRadius: 15,
                  }}
                />
              </TouchableOpacity>
              {showLogout && (
                <View style={styles.logoutMenu}>
                  <Pressable onPress={handleLogout}>
                    <Text style={styles.logoutText}>Logout</Text>
                  </Pressable>
                </View>
              )}
            </View>
          ),
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { paddingBottom: 5, height: 60 },
          tabBarLabelStyle: { fontSize: 12 },
          tabBarIcon: ({ focused }) => {
            let iconUrl;
            if (route.name === 'Home') {
              iconUrl = 'https://cdn-icons-png.flaticon.com/512/1946/1946436.png';
            } else if (route.name === 'Customer') {
              iconUrl = 'https://cdn-icons-png.flaticon.com/512/3048/3048122.png';
            } else if (route.name === 'Order') {
              iconUrl = 'https://cdn-icons-png.flaticon.com/512/107/107831.png';
            } else if (route.name === 'Items') {
              iconUrl = 'https://cdn-icons-png.flaticon.com/512/3081/3081559.png';
            }
            return (
              <Image
                source={{ uri: iconUrl }}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? 'black' : 'gray',
                }}
              />
            );
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Customer" component={Customer} />
        <Tab.Screen name="Order" component={Order} />
        <Tab.Screen name="Items" component={Items} />
      </Tab.Navigator>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutMenu: {
    position: 'absolute',
    top: 40,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    elevation: 5,
    width: "100",

  },
  logoutText: {
    fontSize: 16,
    color: 'black',
  },
});
