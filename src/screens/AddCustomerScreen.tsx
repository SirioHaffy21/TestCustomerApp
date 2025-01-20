import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { addCustomerWithNotification } from '../services/customerService';
import { registerForPushNotificationsAsync } from '../notifications/NotificationHandler';

const AddCustomerScreen = ({ navigation }: any) => {
  const [customerName, setCustomerName] = useState('');
  const [customerCode, setCustomerCode] = useState('');
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await registerForPushNotificationsAsync();
      //Alert.alert(expoPushToken);
      setExpoPushToken(token);
    };

    fetchToken();
  }, []);

  const handleAddCustomer = async () => {
    if (!customerName || !customerCode) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    try {
      await addCustomerWithNotification({ CUSTOMER_NAME: customerName, CUSTOMER_CODE: customerCode }, expoPushToken);
      Alert.alert('Thành công', 'Khách hàng đã được thêm và thông báo đã được gửi.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể thêm khách hàng.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thêm Khách Hàng</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên"
        value={customerName}
        onChangeText={setCustomerName}
      />
      <TextInput
        style={styles.input}
        placeholder="Mã"
        value={customerCode}
        onChangeText={setCustomerCode}
      />
      <Button title="Thêm" onPress={handleAddCustomer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 10, padding: 10, borderRadius: 5 },
});

export default AddCustomerScreen;
