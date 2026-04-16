import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Login() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Login Screen</Text>

      <Pressable onPress={() => router.replace("/")}>
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
