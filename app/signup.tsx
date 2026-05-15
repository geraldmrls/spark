import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import GoogleIcon from "../assets/svg/google.svg";
import SparkLogo from "../assets/svg/spark.svg";

// local variables and hooks
import { supabase } from "@/lib/supabase";

// svg
import EyeClosed from "../assets/svg/eye-closed.svg";
import EyeOpen from "../assets/svg/eye-open.svg";

export default function Signup() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confPassword, setConfPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>("");

  // eye states
  const [eyePass, setEyePass] = useState<string>("closed");
  const [eyeConfPass, setEyeConfPass] = useState<string>("closed");

  // handle signup
  async function handleSignup() {
    if (!fullName || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== confPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    if (error) {
      setError(error.message);
    } else {
      setMessage("check your email to confirm your account");
    }
    setLoading(false);
  }

  // when loading show
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

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
            value={fullName}
            onChangeText={(text) => setFullName(text)}
            placeholder="Enter your full name"
            autoCorrect={false}
            style={styles.input}
          />
        </View>

        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email Address</Text>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            placeholder="name@example.com"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
          />
        </View>

        {/* Password */}
        <View style={styles.inputGroup}>
          {/* password validation */}
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Min. 8 characters"
            secureTextEntry={eyePass === "closed"}
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
          />
          <Pressable
            style={styles.eyePass}
            onPress={() => {
              setEyePass(eyePass === "open" ? "closed" : "open");
            }}
          >
            {eyePass === "open" ? (
              <EyeOpen width={23} height={23} />
            ) : (
              <EyeClosed width={23} height={23} />
            )}
          </Pressable>
        </View>

        {/* Confirm password */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Confirm password</Text>
          <TextInput
            value={confPassword}
            onChangeText={(text) => setConfPassword(text)}
            placeholder="Min. 8 characters"
            secureTextEntry={eyeConfPass === "closed"}
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
          />
          <Pressable
            style={styles.eyePass}
            onPress={() => {
              setEyeConfPass(eyeConfPass === "open" ? "closed" : "open");
            }}
          >
            {eyeConfPass === "open" ? (
              <EyeOpen width={23} height={23} />
            ) : (
              <EyeClosed width={23} height={23} />
            )}
          </Pressable>
        </View>

        {/* Create Account Button */}
        <Pressable style={styles.createButton} onPress={() => handleSignup()}>
          <Text style={styles.createButtonText}>Create Account</Text>
        </Pressable>

        {/* show messages - errors */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {message ? <Text style={styles.messageText}>{message}</Text> : null}
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
  passwordValidation: {
    display: "flex",
    flexDirection: "row",
  },
  eyePass: {
    position: "absolute",
    right: 10,
    top: 38,
  },
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
    marginRight: 5,
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
  errorText: {
    color: "#f87171",
    fontSize: 13,
    marginBottom: 12,
  },
  messageText: {
    color: "#22c55e",
    fontSize: 13,
    marginBottom: 12,
  },
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
