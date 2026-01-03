import { databases } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import { router } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ID } from "react-native-appwrite";
import {
  Button,
  SegmentedButtons,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import Toast from "react-native-toast-message";

const frequencies = ["daily", "weekly", "monthly"];
const theme = useTheme();
type frequency = (typeof frequencies)[number];
export default function addhabitScreen() {
  const [title, setTitle] = useState<string>("");
  const [description, setDesciption] = useState<string>("");
  const [frequency, setFrequency] = useState<frequency>("daily");
  const { user } = useAuth();
  const [error, setError] = useState<string>("");

  const handleSubmit = async () => {
    if (!user) return;
    try {
      await databases.createDocument(
        process.env.EXPO_PUBLIC_APPWRITE_DB_ID!,
        process.env.EXPO_PUBLIC_APPWRITE_Habits_Collection!,
        ID.unique(),
        {
          user_id: user.$id,
          title,
          description,
          frequency,
          streak_count: 0,
          last_completed: new Date().toISOString(),
          created_at: new Date().toISOString(),
        }
      );
      Toast.show({
        type: "success",
        text1: "Habit added ✅",
      });

      router.back();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("There was an error creating habit.");
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <TextInput
          label="Title"
          mode="outlined"
          style={styles.input}
          onChangeText={setTitle}
        />
        <TextInput
          label="Description"
          mode="outlined"
          style={styles.input}
          onChangeText={setDesciption}
        />

        <View style={styles.frequencyContainer}>
          <SegmentedButtons
            value={frequency}
            onValueChange={(value) => setFrequency(value as frequency)}
            buttons={frequencies.map((freq) => ({
              value: freq,
              label: freq.charAt(0).toUpperCase() + freq.slice(1),
            }))}
          />
        </View>
        <Button
          mode="contained"
          onPress={handleSubmit}
          disabled={!title || !description}
        >
          Add Habit
        </Button>
        {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
  },
  input: {
    marginBottom: 16,
  },
  frequencyContainer: {
    marginBottom: 24,
  },
});
