import { useState, useEffect, useRef } from 'react';
import * as Device from "expo-device";
import * as Notifications from 'expo-notifications';   
import Constansts from 'expo-constants'; 
import { Platform } from 'react-native';

export interface PushNotificationState {
    notification?: Notifications.Notification;
    expoPushToken?: Notifications.ExpoPushToken;
}

export const usePushNotifications = (): PushNotificationState => {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldPlaySound: false,
            shouldShowAlert: true,
            shouldSetBadge: false
        }),
    });

    const [expoPushToken, setExpoPushToken] = useState<
        Notifications.ExpoPushToken | undefined
    >();

    const [notification, setNotification] = useState<
        Notifications.Notification | undefined
    >();

    const notificationListener = useRef<Notifications.Subscription>();
    const responseListener = useRef<Notifications.Subscription>();

    async function registerForPushNotificationsAsync() {
        let token;

        if (Device.isDevice) {
            const {status: existingStatus} = await Notifications.getPermissionsAsync();

            let finalStatus = existingStatus;
            if (existingStatus !== "granted") {
                const {status} = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }

            if (finalStatus !== "granted") {
                alert("Failed to get push token");
            }

            token = await Notifications.getExpoPushTokenAsync({
                projectId: Constansts.expoConfig?.extra?.eas?.projectId,
            })

            if (Platform.OS === 'android') {
                Notifications.setNotificationChannelAsync("default", {
                    name: "default",
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0,250,250,250],
                    lightColor:rgba(7, 247, 67, 0.49)
                });
            }

            return token;
        } else {
            console.log("ERROR: Please use a physical device");
        }
    }

    useEffect(() => {
        registerForPushNotificationsAsync().then((token) => {
            setNotification(notification);
        })

        notificationListener.current = 
            Notifications.addNotificationReceivedListener((notification) => {
                setNotification(notification);
            });
        responseListener.current = 
            Notifications.addNotificationResponseReceivedListener((response) => {
                console.log(response);
            });
        return () => {
            Notifications.removeNotificationSubscription(
                notificationListener.current!
            );

            Notifications.removeNotificationSubscription(responseListener.current!);
        }
    }, []);

    return {
        expoPushToken,
        notification
    };
};

function rgba(arg0: number, arg1: number, arg2: number, arg3: number): string | undefined {
    throw new Error('Function not implemented.');
}
