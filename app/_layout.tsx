import { AuthContext } from "@/lib/AuthContext";
import { Stack } from "expo-router";
import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const [isLogIn, setIsLogIn] = useState<boolean>(false);

  return (
    <SafeAreaProvider>
      <AuthContext.Provider value={{ isLogIn, setIsLogIn }}>
        <Stack screenOptions={{ headerShown: false }} />
      </AuthContext.Provider>
    </SafeAreaProvider>
  );
}
