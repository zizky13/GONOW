import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, RadioButton, TextInput } from "react-native-paper";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { mazarine, pensive } from "../constants/Colors";
import { addDocumentToTimeBased } from "@/utils/firestore";
import { useModalState } from "@/hooks/modalState";

const ModalForm = () => {
  const [checked, setChecked] = React.useState("nonPrio");
  const [date, setDate] = React.useState(new Date());
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const { hideModal } = useModalState();

  const onChange = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

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

      <View style={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
        <Text style={{ color: pensive, marginTop: 8 }}>Prioritas</Text>
        <View style={styles.radioContainer}>
          <View
            style={styles.radioButton}
          >
            <RadioButton
              value="priority"
              status={checked === "priority" ? "checked" : "unchecked"}
              onPress={() => setChecked("priority")}
              color={pensive}
            />
            <Text style={styles.textStyle}>Ya</Text>
          </View>

          <View style={styles.radioButton}>
            <RadioButton
              value="nonPrio"
              status={checked === "nonPrio" ? "checked" : "unchecked"}
              onPress={() => setChecked("nonPrio")}
              color={pensive}
            />
            <Text style={styles.textStyle}>Tidak</Text>
          </View>
        </View>
      </View>

      <View style={styles.pickerView}>
        <Button
          mode="outlined"
          buttonColor={pensive}
          textColor={pensive}
          icon="calendar"
          onPress={showDatepicker}
        >
          Show date
        </Button>
        <Button
          mode="outlined"
          buttonColor={pensive}
          textColor={pensive}
          icon="clock"
          onPress={showTimepicker}
        >
          Show time
        </Button>
      </View>

      <Text style={[styles.textStyle, { margin: 8 }]}>
        Selected: {date.toLocaleString()}
      </Text>
      <Button
        mode="contained"
        buttonColor={pensive}
        textColor={mazarine}
        onPress={() => {
          addDocumentToTimeBased(
            description,
            title,
            false,
            checked === "priority",
            date,
            false
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

export default ModalForm;

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
