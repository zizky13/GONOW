import { Text, View } from "react-native";
import React from "react";
import { useNotificationModalState } from "@/hooks/modalState";


const ModalNotification = () => {
  return (
    <View>
      <Text>Notification triggered!</Text>
      <Text>Tap anywhere to continue</Text>
    </View>
  );
};

export default ModalNotification;
