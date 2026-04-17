import { setToken } from "@/lib/auth";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

const handleLogin = async () => {
  //call Api and get token
  const fakeToken = "abc123";

  await setToken(fakeToken);
  router.replace("/");
};

export default function Login() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Login Screen</Text>

      <Pressable onPress={handleLogin}>
        <Text
          style={{
            marginTop: 20,
            padding: 10,
            backgroundColor: "black",
            color: "white",
          }}
        >
          Login
        </Text>
      </Pressable>
    </View>
  );
}
