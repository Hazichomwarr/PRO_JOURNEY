import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import { setToken } from "@/lib/auth";
import { useState } from "react";

export default function Login() {
  // const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  const handleLogin = async () => {
    // later → call your Next.js API
    const fakeToken = "abcd1234";
    setToken(fakeToken);
    router.replace("/");
  };

  // if (!loading) return <Text>Loading...</Text>;

  return (
    <View>
      <Text>Login</Text>

      <Pressable onPress={handleLogin}>
        <Text>Login</Text>
      </Pressable>
    </View>
  );
}
