import {
  Database_Id,
  databases,
  habits_collection_id,
  habits_completion_id,
} from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import { Habit, HabitCompletion } from "@/Types/Database.Type";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Query } from "react-native-appwrite";
import { Card } from "react-native-paper";

export default function streaks() {
  const { user } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [completedhabits, setcompletedHabits] = useState<HabitCompletion[]>([]);

  useEffect(() => {
    fetchHabits();
    fetchCompletions();
  }, [user]);

  const fetchHabits = async () => {
    try {
      const response = await databases.listDocuments<Habit>(
        Database_Id!,
        habits_collection_id!,
        [Query.equal("user_id", user?.$id ?? "")]
      );
      setHabits(response.documents);
      console.log(habits);
      console.log("Fetching Done");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCompletions = async () => {
    try {
      const response = await databases.listDocuments<HabitCompletion>(
        Database_Id!,
        habits_completion_id!,
        [Query.equal("user_id", user?.$id ?? "")]
      );
      const completions = response.documents as HabitCompletion[];
      setcompletedHabits(completions);
      console.log(habits);
      console.log("Fetching Done");
    } catch (error) {
      console.log(error);
    }
  };

  interface StreakData {
    streak: number;
    bestStreak: number;
    total: number;
  }

  const getStreakData = (habitid: string): StreakData => {
    const habitCompletions = completedhabits
      ?.filter((c) => c.habit_id === habitid)
      .sort(
        (a, b) =>
          new Date(a.completed_at).getTime() -
          new Date(b.completed_at).getTime()
      );
    if (habitCompletions?.length === 0) {
      return { streak: 0, bestStreak: 0, total: 0 };
    }

    // build streak data
    let streak = 0;
    let bestStreak = 0;
    let total = habitCompletions.length;
    let lastDate: Date | null = null;
    let currentStreak = 0;

    habitCompletions?.forEach((c) => {
      const date = new Date(c.completed_at);
      if (lastDate) {
        const diff =
          (date.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24);
        if (diff <= 1.5) {
          currentStreak += 1;
        } else {
          currentStreak = 1;
        }
      } else {
        if (currentStreak > bestStreak) bestStreak = currentStreak;
        streak = currentStreak;
        lastDate = date;
      }
    });

    return { streak, bestStreak, total };
  };
  const habitStreaks = habits.map((habit) => {
    const {streak,bestStreak,total} = getStreakData(habit.$id);
    return {habit,streak,bestStreak,total}
  })

  const rankedHabits = habitStreaks.sort((a,b) => a.bestStreak - b.bestStreak)

 return (
  <View>
    <Text>Habit Streaks</Text>

    {habits.length === 0 ? (
      <View>
        <Text>No Habits yet.</Text>
      </View>
    ) : (
      rankedHabits.map(({habit,streak,bestStreak,total},key)=>(
        <Card key={key}>
          <Card.Content>
            <Text>
              {habit.title}
            </Text>
            <Text>
              {habit.description}
            </Text>
            <View>
              <View>
                <Text>
                  🔥 {streak}
                </Text>
                <Text>
                  Current {streak}
                </Text>
              </View>
              <View>
                <Text>
                  🏆 {streak}
                </Text>
                <Text>
                  Best {streak}
                </Text>
              </View>
              <View>
                <Text>
                  ✅ {streak}
                </Text>
                <Text>
                  Total {streak}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      ))
    )}
  </View>
);
}