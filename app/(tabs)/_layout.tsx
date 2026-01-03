import { useAuth } from "@/lib/auth-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";

export default function TabsLayout() {
  const { user, isLoadingUser } = useAuth();

  if (isLoadingUser) return null;

  if (!user) {
    return <Redirect href="/auth" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "#f5f5f5" },
        headerShadowVisible: false,
        tabBarStyle:{
          backgroundColor: "#f5f5f5",
          borderTopWidth:0,
          elevation:0,
          shadowOpacity:0,
        },
        tabBarActiveTintColor:"#6200ee",
        tabBarInactiveTintColor:"#666666"
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Today's Habits",
          tabBarIcon: ({ size, color,focused }) => <MaterialCommunityIcons name="calendar-today" size={size} color={color}/>,
        }}
      />

       <Tabs.Screen
        name="streaks"
        options={{
          title: "Streaks",
          tabBarIcon: ({ size, color,focused }) => <MaterialCommunityIcons name="chart-line" size={size} color={color}/>,
        }}
      />

      <Tabs.Screen
        name="add-habit"
        options={{
          title: "Add Habit",
          tabBarIcon: ({ size, color,focused }) => <MaterialCommunityIcons name="plus-circle" size={size} color={color}/>,
        }}
      />
    </Tabs>
  );
}
