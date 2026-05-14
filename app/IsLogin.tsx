import { useAuthContext } from "@/lib/AuthContext";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

// local variables hooks
import { supabase } from "@/lib/supabase";

export default function IsLogIn() {
  const { isLogIn, setIsLogIn } = useAuthContext();

  // handle logout
  async function handleLogout() {
    await supabase.auth.signOut();
    setIsLogIn(false);
    router.replace("/Login");
  }

  if (isLogIn) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Welcome to spark</Text>
        <Pressable onPress={() => handleLogout()}>
          <Text>Log out</Text>
        </Pressable>
      </View>
    );
  }

  return null;
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
