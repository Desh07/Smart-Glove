import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Profile() {
  const [profileUri, setProfileUri] = useState<string | null>(null);
  const [name] = useState("John Doe");
  const [email] = useState("john.doe@example.com");
  const [menuOpen, setMenuOpen] = useState(false);

  const requestPermissions = async () => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "We need access to your photos to change the profile picture."
        );
        return false;
      }
    }
    return true;
  };

  const changeAvatar = async () => {
    const allowed = await requestPermissions();
    if (!allowed) return;

    Alert.alert("Change picture", "Select an option", [
      {
        text: "Camera",
        onPress: async () => {
          const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
          });
          if (!result.canceled) setProfileUri(result.assets[0].uri);
        },
      },
      {
        text: "Gallery",
        onPress: async () => {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
          });
          if (!result.canceled) setProfileUri(result.assets[0].uri);
        },
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Open menu"
          style={styles.menuButton}
          onPress={() => setMenuOpen(true)}
        >
          <View style={styles.hamburger}>
            <View style={styles.hamburgerLine} />
            <View style={styles.hamburgerLine} />
            <View style={styles.hamburgerLine} />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Avatar */}
        <View style={styles.profileSection}>
          <View style={styles.avatarWrap}>
            {profileUri ? (
              <Image source={{ uri: profileUri }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarInitial}>{name.charAt(0)}</Text>
              </View>
            )}
            <TouchableOpacity style={styles.editBadge} onPress={changeAvatar}>
              <Text style={styles.editIcon}>✏️</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>

        {/* Info card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Account</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{name}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{email}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Slide-in menu */}
      <Modal
        visible={menuOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuOpen(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setMenuOpen(false)}
        >
          <View style={styles.menuPanel}>
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>Menu</Text>
              <TouchableOpacity onPress={() => setMenuOpen(false)}>
                <Text style={styles.close}>✕</Text>
              </TouchableOpacity>
            </View>
            {[
              { t: "Edit Profile", i: "✏️" },
              { t: "Settings", i: "⚙️" },
              { t: "Connected Devices", i: "🔗" },
              { t: "Help & Support", i: "❓" },
              { t: "About", i: "ℹ️" },
              { t: "Logout", i: "🚪" },
            ].map((m) => (
              <TouchableOpacity
                key={m.t}
                style={styles.menuItem}
                onPress={() => {
                  Alert.alert("Action", `${m.t} tapped`);
                  setMenuOpen(false);
                }}
              >
                <Text style={styles.menuIcon}>{m.i}</Text>
                <Text style={styles.menuText}>{m.t}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: {
    backgroundColor: "#E53935",
    paddingTop: Platform.OS === "ios" ? 50 : 20,
    paddingBottom: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 4,
  },
  headerTitle: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  menuButton: { padding: 8 },
  hamburger: { width: 24, height: 18, justifyContent: "space-between" },
  hamburgerLine: { width: 24, height: 3, backgroundColor: "#fff", borderRadius: 2 },

  scrollContent: { paddingBottom: 24 },
  profileSection: {
    alignItems: "center",
    paddingVertical: 28,
    backgroundColor: "#fff",
    marginBottom: 16,
  },
  avatarWrap: { position: "relative", marginBottom: 12 },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#E53935",
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#E53935",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#fff",
    elevation: 4,
  },
  avatarInitial: { fontSize: 42, color: "#fff", fontWeight: "bold" },
  editBadge: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#E53935",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  editIcon: { fontSize: 16 },
  name: { fontSize: 22, fontWeight: "bold", color: "#333", marginTop: 6 },
  email: { fontSize: 15, color: "#666", marginTop: 2 },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  cardTitle: { fontSize: 18, fontWeight: "bold", color: "#333", marginBottom: 10 },
  row: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 10 },
  label: { fontSize: 14, color: "#666" },
  value: { fontSize: 14, color: "#333", fontWeight: "600" },
  divider: { height: 1, backgroundColor: "#eee" },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  menuPanel: {
    width: 280,
    height: "100%",
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "ios" ? 50 : 20,
    elevation: 6,
  },
  menuHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  close: { fontSize: 22, color: "#666" },
  menuItem: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingVertical: 14 },
  menuIcon: { fontSize: 18, marginRight: 12 },
  menuText: { fontSize: 16, color: "#333" },
});
