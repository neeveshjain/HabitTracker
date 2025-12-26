import { useAuth } from "@/lib/auth-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Redirect, Tabs } from "expo-router";

export default function TabsLayout() {
  const { user, isLoadingUser } = useAuth();

  if (isLoadingUser) return null;

  if (!user) {
    return <Redirect href="/auth" />;
  }

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "coral" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
