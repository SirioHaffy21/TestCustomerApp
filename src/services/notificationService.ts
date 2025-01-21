import * as Notifications from 'expo-notifications';
//import * as Permissions from 'expo-permissions';

export async function registerForPushNotificationsAsync(){
  // const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  // if (status !== 'granted') {
  //   const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  //   if (status !== 'granted') {
  //     alert('Failed to get push token for push notification!');
  //     return;
  //   }
  // }
  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log(token);
}

export const sendPushNotification = async (
  expoPushToken: string,
  title: string,
  body: string
) => {
  const message = {
    to: expoPushToken,
    sound: "default",
    title,
    body,
    data: { extraData: "Thông báo khách hàng" },
  };

  try {
    const response = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error("Gửi thông báo không thành công.");
    }

    console.log("Thông báo đã được gửi!");
  } catch (error) {
    console.error("Lỗi khi gửi thông báo:", error);
  }
};
