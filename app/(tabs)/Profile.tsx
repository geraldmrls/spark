import { useAuthContext } from "@/lib/AuthContext";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// local variables hooks
import { supabase } from "@/lib/supabase";

export default function Profile() {
  const { setIsLogIn } = useAuthContext();

  async function handleLogout() {
    await supabase.auth.signOut();
    setIsLogIn(false);
    router.replace("/Login");
  }

  return (
    <SafeAreaView style={styles.loadingContainer}>
      <Text style={styles.loadingText}>Welcome to Spark</Text>
      <Pressable onPress={handleLogout}>
        <Text>Log out</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    color: "#9ca3af",
    fontSize: 14,
  },
});
