import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import ReminderCard from "@/components/ReminderCard";
import ModalForm from "@/components/ModalForm";
import { formatDate, formatTime } from "@/utils/dateUtils";
import { FAB, Modal, Portal } from "react-native-paper";

const home = () => {
    const date = new Date();
    const formattedTime = formatTime(date);
    const formattedDate = formatDate(date);

    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: "#273c75", padding: 20};

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.userInfoContainer}>
                <View style={styles.userInfo}>
                    <Text>Hello, {}</Text>
                </View>
            </View>

            <View style={styles.cardContainer}>
                <ReminderCard
                    date={formattedDate}
                    time={formattedTime}
                    title={"testout"}
                />
            </View>

            <FAB
                icon="plus"
                style={styles.fab}
                onPress={showModal}
            />

            <Portal>
                <Modal
                    visible={visible}
                    onDismiss={hideModal}
                    contentContainerStyle={containerStyle}
                >
                    <ModalForm/>
                </Modal>
            </Portal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    userInfoContainer: {
        backgroundColor: "red",
        flex: 1 / 10,
        padding: 16,
    },

    userInfo: {
        backgroundColor: "green",
        flex: 1,
        borderWidth: 1,
        borderRadius: 12,
        padding: 8,
    },

    cardContainer: {
        backgroundColor: "yellow",
        flex: 1,
        padding: 8,
    },

    fab: {
        position: "absolute",
        margin: 20,
        right: 0,
        bottom: 10,
    },
});

export default home;