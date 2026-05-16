import { AuthContext } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const [isLogIn, setIsLogIn] = useState<boolean>(false);
  const [isOnboarding, setIsOnboarding] = useState<boolean>(false);

  const [loading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("#eef0f7");
    NavigationBar.setButtonStyleAsync("dark");
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setIsLogIn(true);
      } else {
      }
      setIsLoading(false);
    };
    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setIsLogIn(true);
      } else {
        setIsLogIn(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#eef0f7",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <AuthContext.Provider
        value={{ isLogIn, setIsLogIn, isOnboarding, setIsOnboarding }}
      >
        <StatusBar style="dark" backgroundColor="#eef0f7" />

        <Stack screenOptions={{ headerShown: false }}>
          {isLogIn ? (
            <Stack.Screen name="(tabs)" />
          ) : (
            <Stack.Screen name="Login" />
          )}
        </Stack>
      </AuthContext.Provider>
    </SafeAreaProvider>
  );
}
