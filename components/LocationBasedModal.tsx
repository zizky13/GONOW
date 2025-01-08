import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, RadioButton, TextInput } from "react-native-paper";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { mazarine, pensive } from "../constants/Colors";
import {
    addDocumentToLocBased,
    addDocumentToTimeBased,
} from "@/utils/firestore";
import { useModalState } from "@/hooks/modalState";
import { GeoPoint } from "firebase/firestore";

const LocationBasedModal = () => {
    const [checked, setChecked] = React.useState("nonPrio");
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [lat, setLat] = React.useState(0.0);
    const [long, setLong] = React.useState(0.0);
    const [radius, setRadius] = React.useState(0);
    const { hideModal } = useModalState();

    return (
        <View style={styles.formContainer}>
            <TextInput
                label="Judul"
                style={styles.inputContainer}
                onChangeText={(text) => setTitle(text)}
            />

            <TextInput
                label="Deskripsi"
                style={{ margin: 8 }}
                onChangeText={(text) => setDescription(text)}
            />

            <TextInput
                keyboardType="number-pad"
                label="Latitude"
                style={{ margin: 8 }}
                onChangeText={(num) => setLat(parseFloat(num))}
            />

            <TextInput
                keyboardType="number-pad"
                label="Longitude"
                style={{ margin: 8 }}
                onChangeText={(num) => setLong(parseFloat(num))}
            />

            <TextInput
                keyboardType="number-pad"
                label="Radius"
                style={{ margin: 8 }}
                onChangeText={(num) => setRadius(parseInt(num))}
            />

            <View
                style={{
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                }}
            >
                <Text style={{ color: pensive, marginTop: 8 }}>Prioritas</Text>
                <View style={styles.radioContainer}>
                    <View
                        style={styles.radioButton}
                    >
                        <RadioButton
                            value="priority"
                            status={checked === "priority"
                                ? "checked"
                                : "unchecked"}
                            onPress={() => setChecked("priority")}
                            color={pensive}
                        />
                        <Text style={styles.textStyle}>Ya</Text>
                    </View>

                    <View style={styles.radioButton}>
                        <RadioButton
                            value="nonPrio"
                            status={checked === "nonPrio"
                                ? "checked"
                                : "unchecked"}
                            onPress={() => setChecked("nonPrio")}
                            color={pensive}
                        />
                        <Text style={styles.textStyle}>Tidak</Text>
                    </View>
                </View>
            </View>

            <View style={styles.pickerView}>
            </View>

            <Button
                mode="contained"
                buttonColor={pensive}
                textColor={mazarine}
                onPress={() => {
                    addDocumentToLocBased(
                        description,
                        false,
                        new GeoPoint(lat, long),
                        checked === "priority",
                        radius,
                        false,
                        title,
                    ).then(() => {
                        hideModal();
                    });
                }}
            >
                Submit
            </Button>
        </View>
    );
};

export default LocationBasedModal;

const styles = StyleSheet.create({
    formContainer: {},

    inputContainer: {
        margin: 8,
    },

    input: {
        borderWidth: 2,
        backgroundColor: "white",
        borderRadius: 24,
        flex: 1,
    },

    radioButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    textStyle: {
        color: pensive,
        fontFamily: "OpenSans",
    },

    pickerView: {
        margin: 8,
        padding: 4,
        flexDirection: "row",
    },

    radioContainer: {
        flexDirection: "row",
        margin: 8,
    },
});
