import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { setToken } from "@/lib/auth";
import { router } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);

  function validateValues(email: string, password: string) {
    const newErrors: Record<string, string> = {};

    setErrors({}); //clear old errors on new validation

    if (!email || !email.includes("@")) {
      newErrors.email = "Please enter a valid email.";
    }

    if (!password || password.length < 6) {
      newErrors.password = "Required. Min 6 chars.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  const handleLogin = async () => {
    if (loading) return; //Prevent Double Submission

    const isValid = validateValues(email, password);
    if (!isValid) return;

    try {
      setLoading(true);

      const res = await apiFetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      await setToken(res.token);
      router.replace("/");
    } catch (e) {
      console.log("Error:", e);
      setErrors((prev) => ({ ...prev, message: "Something went wroing" }));
    } finally {
      setLoading(false);
    }
  };

  // if (!loading) return <Text>Loading...</Text>;

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 50, textAlign: "center" }}>Login Screen</Text>
      <KeyboardAvoidingView
        style={{ marginTop: 10, flex: 1, gap: 10 }}
        behavior="padding"
      >
        <View style={{ backgroundColor: "#D3D3D3" }}>
          <TextInput
            placeholder="Enter your email"
            value={email}
            style={styles.input}
            onChangeText={(newemail) => setEmail(newemail)}
          />
          {errors.email && <Text style={{ color: "red" }}>{errors.email}</Text>}
        </View>
        <View style={{ backgroundColor: "#D3D3D3" }}>
          <TextInput
            secureTextEntry
            placeholder="Enter your password"
            value={password}
            style={styles.input}
            onChangeText={(pwd) => setPassword(pwd)}
          />
          {errors.password && (
            <Text style={{ color: "red" }}>{errors.password}</Text>
          )}
        </View>

        <Pressable
          onPress={handleLogin}
          style={{
            marginTop: 20,
            padding: 5,
            backgroundColor: "black",
            borderRadius: 10,
          }}
          disabled={loading}
        >
          <Text style={{ textAlign: "center", color: "white" }}>
            {loading ? "loading..." : "Login"}
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { height: 40, borderWidth: 1, padding: 10, borderRadius: 5 },
});
