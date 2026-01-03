import { databases } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import { Habit } from "@/Types/Database.Type";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Query } from "react-native-appwrite";
import { Button } from "react-native-paper";

export default function Index() {
  const { signOut , user} = useAuth();
  const [habits,setHabits] = useState<Habit[]>();
  useEffect(()=>{fetchHabits()},[user]);

  const fetchHabits = async () => {
    try {
      const response = await databases.listDocuments<Habit>(
        process.env.EXPO_PUBLIC_APPWRITE_DB_ID!,
        process.env.EXPO_PUBLIC_APPWRITE_Habits_Collection!,
        [Query.equal("user_id",user?.$id ?? "")]
      );
      setHabits(response.documents);
      console.log(habits);
      console.log('Fetching Done');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.View}>
      <Text>Just getting started.</Text>
      <Button mode="text" onPress={signOut} icon={"logout"}>
        Sign Out
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  View: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  navButton: {
    width: 100,
    height: 20,
    backgroundColor: "cyan",
    borderRadius: 8,
    textAlign: "center",
  },
});
