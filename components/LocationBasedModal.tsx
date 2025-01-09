import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, RadioButton, TextInput } from "react-native-paper";
import { mazarine, pensive } from "../constants/Colors";
import { addDocumentToLocBased } from "@/utils/firestore";
import { useModalState } from "@/hooks/modalState";
import { GeoPoint } from "firebase/firestore";
import { Modal } from "react-native";
import * as Mapbox from '@rnmapbox/maps';
import * as Location from 'expo-location';


Mapbox.setAccessToken(
    process.env.EXPO_PUBLIC_MAPBOX_KEY ? process.env.EXPO_PUBLIC_MAPBOX_KEY : "",
);

const LocationBasedModal = () => {
    const mapRef = React.useRef(null);
    const [checked, setChecked] = React.useState("nonPrio");
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [mapVisible, setMapVisible] = React.useState(false);
    const [currentLocation, setCurrentLocation] = React.useState({
        latitude: -6.291815,
        longitude: 106.726430,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [lat, setLat] = React.useState(0.0);
    const [long, setLong] = React.useState(0.0);
    const [radius, setRadius] = React.useState(0);
    const { hideModal } = useModalState();

    const getCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            alert("Permission denied");
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setCurrentLocation({
            ...currentLocation,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        });
        setLat(location.coords.latitude);
        setLong(location.coords.longitude);
    };

    React.useEffect(() => {
        getCurrentLocation();
    }, []);

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

            <Button
                mode="outlined"
                style={{ margin: 8 }}
                onPress={() => setMapVisible(true)}
            >
                Pick Location on Map
            </Button>

            <Modal
                animationType="slide"
                transparent={false}
                visible={mapVisible}
                onRequestClose={() => setMapVisible(false)}
            >
                <View style={styles.mapContainer}>
                    <Mapbox.MapView
                        ref={mapRef}
                        style={styles.map}
                        compassEnabled={true}
                        logoEnabled={false}
                        scaleBarEnabled={false}
                    >
                        <Mapbox.Camera
                            defaultSettings={{
                                centerCoordinate: [long, lat],
                                zoomLevel: 14
                            }}
                        />
                        <Mapbox.PointAnnotation
                            id="selectedLocation"
                            coordinate={[long, lat]}
                            draggable
                            onDragEnd={(e) => {
                                setLat(e.geometry.coordinates[1]);
                                setLong(e.geometry.coordinates[0]);
                            }}
                        >
                            <View />
                        </Mapbox.PointAnnotation>
                    </Mapbox.MapView>
                    <Button
                        mode="contained"
                        onPress={() => setMapVisible(false)}
                        style={styles.confirmButton}
                    >
                        Confirm Location
                    </Button>
                </View>
            </Modal>

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

    mapContainer: {
        flex: 1,
        position: "relative",
    },
    map: {
        flex: 1,
    },
    confirmButton: {
        position: "absolute",
        bottom: 20,
        alignSelf: "center",
        width: "90%",
    },
});
