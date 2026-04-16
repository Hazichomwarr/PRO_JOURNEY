import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Details() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
      <Text style={{ fontWeight: "700", textAlign: "center", margin: 20 }}>
        Details
      </Text>
      <Pressable onPress={() => router.back()}>
        <Text style={{ textAlign: "center" }}> {"<-"} Go Back</Text>
      </Pressable>
    </View>
  );
}
