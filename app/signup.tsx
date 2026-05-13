import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import GoogleIcon from "../assets/svg/google.svg";
import SparkLogo from "../assets/svg/spark.svg";

export default function Signup() {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        {/* Logo */}
        <SparkLogo width={40} height={40} />
        <Text style={styles.sparkTitle}>Spark</Text>

        {/* Header */}
        <Text style={styles.title}>Create your account</Text>
        <Text style={styles.subtitle}>
          Join Spark and find your meaningful connection.
        </Text>

        {/* Full Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Full Name</Text>
          <TextInput
            placeholder="Enter your full name"
            autoCorrect={false}
            style={styles.input}
          />
        </View>

        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email Address</Text>
          <TextInput
            keyboardType="email-address"
            placeholder="name@example.com"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
          />
        </View>

        {/* Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            placeholder="Min. 8 characters"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
          />
        </View>

        {/* Create Account Button */}
        <Pressable style={styles.createButton}>
          <Text style={styles.createButtonText}>Create Account</Text>
        </Pressable>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Google Button */}
        <Pressable style={styles.googleButton}>
          <GoogleIcon width={20} height={20} />
          <Text style={styles.googleButtonText}>Sign up with Google</Text>
        </Pressable>

        {/* Log In */}
        <View style={styles.loginRow}>
          <Text style={styles.loginText}>{"Already have an account? "}</Text>
          <Link href="/Login">
            <Text style={styles.loginLink}>Log in</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#eef0f7",
  },
  container: {
    flex: 1,
    paddingHorizontal: 35,
    paddingTop: 40,
    alignItems: "center",
  },
  sparkTitle: {
    fontSize: 24,
    color: "#7f5931",
    fontWeight: "bold",
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#111",
    alignSelf: "flex-start",
  },
  subtitle: {
    fontSize: 14,
    color: "#777",
    alignSelf: "flex-start",
    marginBottom: 24,
  },
  inputGroup: {
    width: "100%",
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    color: "#333",
    marginBottom: 6,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 14,
    width: "100%",
    backgroundColor: "#fff",
    fontSize: 15,
  },
  createButton: {
    backgroundColor: "#d4a373",
    paddingVertical: 16,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 24,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 11,
    color: "#999",
    letterSpacing: 0.8,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 14,
    borderRadius: 30,
    width: "100%",
    marginBottom: 16,
  },
  googleButtonText: {
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
  },
  loginRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  loginText: {
    fontSize: 14,
    color: "#555",
  },
  loginLink: {
    fontSize: 14,
    color: "#7f5931",
    fontWeight: "bold",
  },
});
