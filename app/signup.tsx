import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SparkLogo from "../assets/svg/spark.svg";

export default function Signup() {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.loginContainer}>
        <SparkLogo width={70} height={70} />
        <Text style={styles.sparkTitle}>Spark</Text>
        <Text>Welcome to Spark!</Text>
        <Text>Sign up to find your meaningul connection</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: { flex: 1 },
  loginContainer: {
    backgroundColor: "#fff",
    height: "100%",
    alignItems: "center",
    paddingTop: 50,
  },
  sparkTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
