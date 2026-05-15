import { AuthContext } from "@/lib/AuthContext";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const [isLogIn, setIsLogIn] = useState<boolean>(false);
  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("#eef0f7");
    NavigationBar.setButtonStyleAsync("dark");
  }, []);
  return (
    <SafeAreaProvider>
      <AuthContext.Provider value={{ isLogIn, setIsLogIn }}>
        <StatusBar style="dark" backgroundColor="#eef0f7" />
        <Stack screenOptions={{ headerShown: false }} />
      </AuthContext.Provider>
    </SafeAreaProvider>
  );
}
