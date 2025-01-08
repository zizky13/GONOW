import { Pressable, StyleSheet, Text, View } from "react-native";
import { RadioButton } from "react-native-paper";
import { deleteDocumentFromLocBased } from "@/utils/firestore";

import React from "react";
import ModalForm from "./ModalForm";

interface LocationReminderCardProps {
    lat: number,
    long: number,
    title: string;
    timeStamp: string;
}

const LocationReminderCard: React.FC<LocationReminderCardProps> = (
    { lat, long, title, timeStamp },
) => {
    const [checked, setChecked] = React.useState("not");
    return (
        <View style={styles.cardView}>
            <Pressable
                onPress={
                    () => { return <ModalForm />; }
                }
                style={{ flex: 1, flexDirection: "row" }}
            >
                <View style={styles.actionContainer}>
                    <RadioButton
                        value="done"
                        status={checked === "done" ? "checked" : "unchecked"}
                        onPress={() =>{
                            setChecked("done")
                            deleteDocumentFromLocBased(timeStamp)
                        }}
                    />
                </View>

                <View
                    style={styles.reminderContent}
                >
                    <Text style={styles.title}>{title}</Text>
                </View>

                <View style={styles.timeStamp}>
                    <Text style={styles.location}>{lat}</Text>
                    <Text style={styles.location}>{long}</Text>
                </View>
            </Pressable>
        </View>
    );
};

export default LocationReminderCard;

const styles = StyleSheet.create({
    cardView: {
        flex: 1 / 10,
        margin: 4,
        borderWidth: 0.5,
        borderRadius: 12,
        flexDirection: "row",
    },

    timeStamp: {
        flex: 1,
        justifyContent: "center",
        padding: 4,
    },

    reminderContent: {
        flex: 1,
        flexDirection: "column",
        paddingLeft: 8,
        justifyContent: "center",
    },

    actionContainer: {
        flex: 1 / 4,
        justifyContent: "center",
        alignItems: "center",
    },

    date: {
        fontSize: 8.5,
        color: "gray",
        fontFamily: "OpenSans",
    },

    location: {
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: "OpenSans",
    },

    title: {
        fontSize: 22,
        fontFamily: "OpenSans",
    },

    checkRadio: {
        borderWidth: 1,
        flex: 1,
        borderRadius: "50%",
    },
});
