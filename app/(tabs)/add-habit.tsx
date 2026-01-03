import { useState } from "react";
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Button, SegmentedButtons, TextInput } from "react-native-paper";

const frequencies = ["daily", "weekly", "montly"];
type frequency = (typeof frequencies)[number];
export default function addhabitScreen() {

  const [title,setTitle] = useState<string>("");
  const [description,setDesciption] = useState<string>("");
  const [frequency,setFrequency] = useState<frequency>("daily");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
      <TextInput label="Title" mode="outlined" style={styles.input} onChangeText={setTitle}/>
      <TextInput label="Description" mode="outlined" style={styles.input} onChangeText={setDesciption}/>

      <View style={styles.frequencyContainer}>
        <SegmentedButtons
          value={frequency}
          onValueChange={(value)=> setFrequency(value as frequency)}
          buttons={frequencies.map((freq) => ({
            value: freq,
            label: freq.charAt(0).toUpperCase() + freq.slice(1),
          }))}
        />
      </View>
      <Button mode="contained" disabled={!title || !description}>Add Habit</Button>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:16,
    backgroundColor:"#f5f5f5",
    justifyContent:"center"

  },
  input:{
    marginBottom:16
  },
  frequencyContainer:{
    marginBottom:24
  }
});
