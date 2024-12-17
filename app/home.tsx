import { FlatList, StyleSheet, Text, View } from "react-native";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import ReminderCard from "@/components/ReminderCard";
import ModalForm from "@/components/ModalForm";
import { formatDate, formatTime } from "@/utils/dateUtils";
import { FAB, Modal, Portal } from "react-native-paper";
import {
    getDocumentsFromTimeBased,
    updateDocumentFromTimeBased,
} from "@/utils/firestore";
import { useModalState, useNotificationModalState } from "@/hooks/modalState";
import ModalNotification from "@/components/ModalNotification";

const home = () => {
    interface Reminder {
        timeMark: firebase.firestore.Timestamp;
        title: string;
        timeStamp: string;
        showNotificationModal: boolean;
    }

    const [dbData, setDbData] = React.useState<Reminder[]>([]);
    const { visible, showModal, hideModal } = useModalState();
    const [currentDoc, setCurrentDoc] = React.useState("");
    const {
        visibleNotification,
        showNotificationModal,
        hideNotificationModal,
    } = useNotificationModalState();

    // Function to hide notification modal and update the document status
    const handleHideNotification = async (currentDoc: string) => {
        await updateDocumentFromTimeBased(currentDoc, {
            showNotificationModal: false,
            hasConfirmed: true,
        });
        hideNotificationModal();
    };

    // Fetch data from Firestore
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDocumentsFromTimeBased();
                setDbData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
        dbData.forEach((item) => {
            if (item.showNotificationModal) {
                try {
                    if (item.showNotificationModal) {
                        showNotificationModal();
                        setCurrentDoc(item.timeStamp);
                    }
                } catch (error) {
                    console.error("Error showing notification:", error);
                }
            }
        });
    }, [dbData]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.userInfoContainer}>
                <View style={styles.userInfo}>
                    <Text>Hello, User!</Text>
                </View>
            </View>

            <View style={styles.cardContainer}>
                <FlatList
                    data={dbData}
                    renderItem={({ item }) => {
                        return (
                            // console.log(item)
                            <ReminderCard
                                date={formatDate(item.timeMark.toDate())}
                                time={formatTime(item.timeMark.toDate())}
                                title={item.title}
                                timeStamp={item.timeStamp}
                            />
                        );
                    }}
                    keyExtractor={(item, index) => item.timeStamp + index}
                    ListEmptyComponent={() => <Text>No reminders found</Text>}
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
                    contentContainerStyle={styles.containerStyle}
                >
                    <ModalForm />
                </Modal>

                <Modal
                    visible={visibleNotification}
                    onDismiss={() => handleHideNotification(currentDoc)}
                    contentContainerStyle={styles.containerStyle}
                >
                    <ModalNotification />
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

    containerStyle: {
        backgroundColor: "#273c75",
        padding: 20,
    },
});

export default home;
