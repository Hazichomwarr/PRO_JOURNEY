// app/(app)/request/[id].tsx
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function Request() {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ flex: 1 }}>
      <Text>Showing details for request ID: {id}</Text>
    </View>
  );
}
