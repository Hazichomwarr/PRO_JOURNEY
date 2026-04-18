// app/(app)/requests.tsx
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

type RequestType = { id: string; title: string };

const mockRequests: RequestType[] = [
  { id: "1", title: "Need gas help" },
  { id: "2", title: "Looking for a coach" },
  { id: "3", title: "Need a plumber" },
];

export default function Requests() {
  const [data, setData] = useState<RequestType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);

    try {
      const res = mockRequests; //api call later here.
      setData(res);
    } catch (e) {
      setError("Failed to load requests");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return <Text style={{ textAlign: "center" }}>Loading Requests...</Text>;
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
        <Pressable
          onPress={() => load()}
          style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
        >
          <Text>Retry</Text>
        </Pressable>
      </View>
    );
  }

  if (!data.length) {
    return (
      <View style={styles.centered}>
        <Text>No requests yet.</Text>
        <Pressable
          onPress={() => load()}
          style={({ pressed }) => [
            styles.button,
            { opacity: pressed ? 0.5 : 1 },
          ]}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Retry</Text>
        </Pressable>
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{ paddingVertical: 8 }}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RequestItem item={item} />}
      />
    </View>
  );
}

function RequestItem({ item }: { item: RequestType }) {
  return (
    <Pressable
      onPress={() => router.push(`/request/${item.id}`)}
      style={{ padding: 16, borderBottomWidth: 1 }}
    >
      <Text style={{ textDecorationLine: "underline" }}>{item.title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    padding: 5,
    backgroundColor: "black",
    borderRadius: 10,
    width: 60,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
