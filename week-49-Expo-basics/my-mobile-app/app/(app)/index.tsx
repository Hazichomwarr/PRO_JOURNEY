// app/(app)/index.tsx
import { apiFetch } from "@/lib/api";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await apiFetch("/api/test");
        setMessage(res.message); // Property 'message' does not exist on type 'Response'.
      } catch (e) {
        console.log("error:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <Text>Loading...</Text>;

  return (
    <View style={styles.screen}>
      <Header />
      <View style={styles.content}>
        {/* CONTENT TOP */}
        <View style={styles.contentTop}>
          <Text>Top Content</Text>
          <Text>{message}</Text>
          <Pressable onPress={() => router.push("/profile")}>
            <Text style={styles.footerButton}>Go to Profile</Text>
          </Pressable>
        </View>

        {/* CONTENT BOTTOM */}
        <View style={styles.contentBottom}>
          <Text>BOTTOM Content</Text>
          <Pressable onPress={() => router.push("/details")}>
            <Text style={styles.footerButton}>Go to Details</Text>
          </Pressable>
        </View>
      </View>

      <Footer />
    </View>
  );
}

// ------------------- HELPERS ------------------------
function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>HEADER</Text>
    </View>
  );
}
function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerButton}>CTA-1</Text>
      <Text style={styles.footerButton}>CTA-2</Text>
    </View>
  );
}

// --------------------- STYLES ----------------------------
const styles = StyleSheet.create({
  screen: {
    flex: 1, // MOST IMPORTANT LINE
  },

  content: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "stretch", //default bc 'center' changes cross-axis behavior
  },
  contentTop: {
    flex: 7,
    backgroundColor: "blue",
  },
  contentBottom: {
    flex: 3,
    backgroundColor: "green",
  },

  header: {
    padding: 16,
    backgroundColor: "gray",
    alignItems: "center",
  },

  headerText: {
    color: "white",
  },

  footer: {
    padding: 16,
    backgroundColor: "black",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  footerText: {
    color: "white",
  },

  footerButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    backgroundColor: "white",
    minWidth: 100,
    textAlign: "center",
  },
});
