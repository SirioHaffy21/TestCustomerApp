import React, { useEffect, useState } from 'react';
import { registerForPushNotificationsAsync, setupNotificationHandler } from './src/notifications/NotificationHandler';
import * as Notifications from 'expo-notifications';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { usePushNotifications } from './src/notifications/usePushNotifications';
import { View, Text } from 'react-native';

const App = () => {
  // const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

  // useEffect(() => {
  //   registerForPushNotificationsAsync();
  // }, []);
  const {expoPushToken, notification} = usePushNotifications();
  const data = JSON.stringify(notification, undefined, 2);

  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

export default App;
