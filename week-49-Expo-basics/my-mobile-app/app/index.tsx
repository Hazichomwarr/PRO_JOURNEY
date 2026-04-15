import { View, Text, StyleSheet } from "react-native";

export default function App() {
  return (
    <View style={styles.screen}>
      <Header />
      <View style={styles.content}>
        <Text>
          <main>TouchPoint Mobile</main>
        </Text>
      </View>
      <Footer />
    </View>
  );
}

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

const styles = StyleSheet.create({
  screen: {
    flex: 1, // MOST IMPORTANT LINE
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
