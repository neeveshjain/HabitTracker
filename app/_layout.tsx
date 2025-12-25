import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";


function RouteGuard({children}:{children:React.ReactNode}){
  const isAuth = false;
  const router = useRouter()

  useEffect(()=> {
    if(!isAuth){
      router.replace("/auth");
    }
  });

  return <>{children}</>;  

}
export default function RootLayout() {
  return (
    <RouteGuard>
    <Stack>
      <Stack.Screen name = "(tabs)" options={{headerShown : false}}/>
    </Stack>
    </RouteGuard>
  );
}

// import { Slot } from "expo-router";

// export default function RootLayout() {
//   return <Slot />;
// }
