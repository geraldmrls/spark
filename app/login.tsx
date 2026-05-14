// hooks
import { useEffect, useState } from "react";

// react native
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// local variables
import { useAuthContext } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";

// svg
import GoogleIcon from "../assets/svg/google.svg";
import SparkLogo from "../assets/svg/spark.svg";

export default function Login() {
  const { isLogIn, setIsLogIn } = useAuthContext();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // check if user is already logged in
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) setIsLogIn(true);
      setLoading(false);
    };
    checkSession();

    //listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setIsLogIn(true);
      } else {
        setIsLogIn(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // handle login
  async function handleLogin() {
    setError("");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      setIsLogIn(true);
    }
    setLoading(false);
  }

  // handle signup
  async function handleSignup() {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message);
    } else {
      setMessage("check your email to confirm your account");
    }
    setLoading(false);
  }

  // handle logout
  async function handleLogout() {
    await supabase.auth.signOut();
    setIsLogIn(false);
    setEmail("");
    setPassword("");
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
      <View style={styles.loginContainer}>
        {/* Logo */}
        <SparkLogo width={70} height={70} />
        <Text style={styles.sparkTitle}>Spark</Text>
        {/* Welcome */}
        <Text style={styles.welcomeTitle}>Welcome back.</Text>
        <Text style={styles.welcomeSubtitle}>
          Sign in to find your meaningful connection.
        </Text>
        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>EMAIL ADDRESS</Text>
          <TextInput
            value={email}
            keyboardType="email-address"
            placeholder="name@example.com"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
        </View>
        {/* Password */}
        <View style={styles.inputGroup}>
          <View style={styles.passwordLabelRow}>
            <Text style={styles.inputLabel}>PASSWORD</Text>
            <Pressable>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </Pressable>
          </View>
          <TextInput
            value={password}
            placeholder="••••••••"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        {/* Log In Button */}
        <Pressable style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </Pressable>

        {/* Error message */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Success message */}
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
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </Pressable>
        {/* Sign Up */}
        <View style={styles.signUpRow}>
          <Text style={styles.signUpText}>Don`t have an account? </Text>
          <Link href="/Signup">
            <Text style={styles.signUpLink}>Sign up</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: { flex: 1, backgroundColor: "#eef0f7" },
  loginContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 35,
  },
  sparkTitle: {
    fontSize: 24,
    color: "#7f5931",
    fontWeight: "bold",
    marginBottom: 16,
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#111",
    textAlign: "center",
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    marginBottom: 24,
  },
  inputGroup: {
    width: "100%",
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
    letterSpacing: 0.8,
  },
  passwordLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  forgotPassword: {
    fontSize: 13,
    color: "#7f5931",
    fontWeight: "600",
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
  loginButton: {
    backgroundColor: "#d4a373",
    paddingVertical: 16,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
    marginBottom: 24,
  },
  loginButtonText: {
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
    marginBottom: 30,
  },
  googleButtonText: {
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
  },
  signUpRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  signUpText: {
    fontSize: 14,
    color: "#555",
  },
  signUpLink: {
    fontSize: 14,
    color: "#7f5931",
    fontWeight: "bold",
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
});
