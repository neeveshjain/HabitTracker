import { AuthProvide, useAuth } from "@/lib/auth-context";
import { Stack, useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isLoadingUser } = useAuth();

  const segments = useSegments();

  useEffect(() => {
    const isAuthGroup = segments[0] === "auth";
    if (!user && !isAuthGroup && !isLoadingUser) {
      router.replace("/auth");
    } else if (user && isAuthGroup && !isLoadingUser) {
      router.replace("/");
    }
  }, [user, segments]);

  return <>{children}</>;
}
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{flex:1}}>
    <AuthProvide>
      {/* <PaperProvider> */}
        <SafeAreaProvider>
          <RouteGuard>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </RouteGuard>
          <Toast/>
        </SafeAreaProvider>
      {/* </PaperProvider> */}
    </AuthProvide>
    </GestureHandlerRootView>
  );
}

// import { AuthProvide } from "@/lib/auth-context";
// import { Slot } from "expo-router";

// export default function RootLayout() {
//   return (
//     <AuthProvide>
//       <Slot />
//     </AuthProvide>
//   );
// }
