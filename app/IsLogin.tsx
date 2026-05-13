import { StyleSheet, Text, View } from "react-native";

export default function IsLogIn() {
  return (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingText}>Checking authentication...</Text>
    </View>
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
