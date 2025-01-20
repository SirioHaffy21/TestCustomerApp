import React, { useEffect, useState } from 'react';
import { registerForPushNotificationsAsync, setupNotificationHandler } from './src/notifications/NotificationHandler';
import * as Notifications from 'expo-notifications';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';

const App = () => {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

  useEffect(() => {
    setupNotificationHandler();

    const fetchPushToken = async () => {
      const token = await registerForPushNotificationsAsync();
      setExpoPushToken(token);
    };

    fetchPushToken();

    // Lắng nghe sự kiện khi người dùng nhấn vào thông báo
    const notificationListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      notificationListener.remove();
    };
  }, []);

  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

export default App;
