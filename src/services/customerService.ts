import API from "./api";
import { sendPushNotification } from "./notificationService";

export interface Customer {
  CUSTOMER_ID?: number;
  CUSTOMER_NAME: string;
  CUSTOMER_CODE: string;
}

export const getCustomers = async () => {
  const response = await API.get("/customers");
  return response.data.customers;
};

export const addCustomer = async (customer: Customer) => {
  const response = await API.post("/customers/add", customer);
  return response.data;
};

export const addCustomerWithNotification = async (customer: Customer, expoPushToken: string | null) => {
  if (!expoPushToken) {
    console.warn('Không có Expo Push Token. Bỏ qua thông báo.');
    return;
  }

  try {
    // Gửi yêu cầu thêm khách hàng
    const customerData = await addCustomer(customer);

    // Gửi thông báo
    await sendPushNotification(
      expoPushToken,
      'Khách hàng mới',
      `Khách hàng ${customer.CUSTOMER_NAME} đã được thêm thành công!`
    );

    return customerData;
  } catch (error) {
    console.error('Lỗi khi thêm khách hàng với thông báo:', error);
    throw error;
  }
};

export const updateCustomer = async (id: number, customer: Customer) => {
  const response = await API.post(`/customers/edit`, customer);
  return response.data;
};

// export const deleteCustomer = async (customer: Customer) => {
//   const response = await API.get(`/customers/remove`, customer);
//   return response.data;
// };
