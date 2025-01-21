import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity, Alert } from "react-native";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";
//import { HandleNotification } from "../utils/handleNotification";
import * as Notifications from 'expo-notifications';
//import * as Permissions from 'expo-permissions';
import { registerForPushNotificationsAsync } from "../notifications/NotificationHandler";
interface Customer {
  CUSTOMER_ID: number;
  CUSTOMER_NAME: string;
  CUSTOMER_CODE: string;
}

const HomeScreen = ({ navigation }: any) => {
  const {isLoggedIn} = useAuth();
  const [customers, setCustomers] = useState<Customer[]>([]);

  const handleAddCustomer = () => {
    navigation.navigate('AddCustomer');
  };

  const fetchCustomers = async () => {
    try {
      const response = await API.get("/customers");
      setCustomers(response.data.customers);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  // useEffect(() => {
  //   HandleNotification.checkNotificationPermission();
  // }, []);

  useEffect(() => {
    fetchCustomers();
    registerForPushNotificationsAsync();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách khách hàng</Text>
      <FlatList
        data={customers}
        keyExtractor={(item) => item.CUSTOMER_ID.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.CUSTOMER_NAME}</Text>
            <Text style={styles.email}>{item.CUSTOMER_CODE}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddCustomer}>
        <Icon name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  item: { padding: 15, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  name: { fontSize: 18, fontWeight: "bold" },
  email: { fontSize: 16, color: "#555" },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007BFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default HomeScreen;
