import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileTab() {
  const [profileUri, setProfileUri] = useState<string | null>(null);
  const [name, setName] = useState("John Doe");
  const [email] = useState("john.doe@example.com");
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<"en" | "si" | "ta">("en");

  // Language labels always shown in their native script
  const langLabels = {
    english: "English",
    sinhala: "සිංහල",
    tamil: "தமிழ்",
  };

  const t = {
    en: {
      profile: "Profile",
      account: "Account",
      name: "Name",
      email: "Email",
      preferredLanguage: "Preferred Language",
      menu: "Menu",
      menuItems: [
        { t: "Edit Profile", i: "✏️" },
        { t: "Settings", i: "⚙️" },
        { t: "Connected Devices", i: "🔗" },
        { t: "Help & Support", i: "❓" },
        { t: "About", i: "ℹ️" },
        { t: "Logout", i: "🚪" },
      ],
    },
    si: {
      profile: "පැතිකඩ",
      account: "ගිණුම",
      name: "නම",
      email: "ඊමේල්",
      preferredLanguage: "වඩා කැමති භාෂාව",
      menu: "මෙනු",
      menuItems: [
        { t: "පැතිකඩ සංස්කරණය", i: "✏️" },
        { t: "සැකසුම්", i: "⚙️" },
        { t: "සම්බන්ධිත උපාංග", i: "🔗" },
        { t: "උදව් සහ සහය", i: "❓" },
        { t: "විස්තර", i: "ℹ️" },
        { t: "ඉවත් වෙන්න", i: "🚪" },
      ],
    },
    ta: {
      profile: "சுயவிவரம்",
      account: "கணக்கு",
      name: "பெயர்",
      email: "மின்னஞ்சல்",
      preferredLanguage: "விருப்ப மொழி",
      menu: "பட்டி",
      menuItems: [
        { t: "சுயவிவரத்தைத் திருத்து", i: "✏️" },
        { t: "அமைப்புகள்", i: "⚙️" },
        { t: "இணைக்கப்பட்ட சாதனங்கள்", i: "🔗" },
        { t: "உதவி & ஆதரவு", i: "❓" },
        { t: "பற்றி", i: "ℹ️" },
        { t: "வெளியேறு", i: "🚪" },
      ],
    },
  }[lang];

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
      {/* Header with hamburger */}
      <View style={styles.header}>
        {/* Left: App logo text */}
        <View style={styles.logoWrap}>
          <Text style={styles.logoText}>
            <Text style={styles.logoSSL}>SSL </Text>
            <Text style={styles.logoGLOVE}>GLOVE</Text>
          </Text>
        </View>

        {/* Right: Hamburger */}
        <TouchableOpacity style={styles.menuButton} onPress={() => setMenuOpen(true)}>
          <View style={styles.hamburger}>
            <View style={styles.hamburgerLine} />
            <View style={styles.hamburgerLine} />
            <View style={styles.hamburgerLine} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Centered title below the header bar */}
      <View style={styles.titleBar}>
        <View style={styles.titleBadge}>
          <Text style={styles.headerTitle}>{t.profile}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Avatar and info */}
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
          <TextInput
            style={styles.nameInput}
            value={name}
            onChangeText={setName}
            placeholder={t.name}
            placeholderTextColor="#999"
          />
          <Text style={styles.email}>{email}</Text>
        </View>

        {/* Account card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t.account}</Text>
          <View style={styles.row}>
            <Text style={styles.label}>{t.name}</Text>
            <Text style={styles.value}>{name}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.label}>{t.email}</Text>
            <Text style={styles.value}>{email}</Text>
          </View>
        </View>

        {/* Preferred Language card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t.preferredLanguage}</Text>
          <View style={styles.langRow}>
            {[
              { key: "en", label: langLabels.english },
              { key: "si", label: langLabels.sinhala },
              { key: "ta", label: langLabels.tamil },
            ].map((opt) => (
              <TouchableOpacity
                key={opt.key}
                style={[
                  styles.langChip,
                  lang === (opt.key as any) && styles.langChipActive,
                ]}
                onPress={() => setLang(opt.key as any)}
              >
                <Text
                  style={[
                    styles.langChipText,
                    lang === (opt.key as any) && styles.langChipTextActive,
                  ]}
                >
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.langHint}>
            {/* Simple hint updated per language for clarity */}
            {lang === "en"
              ? "Changing the language applies to the entire app."
              : lang === "si"
              ? "භාෂාව වෙනස් කළ විට මුළු යෙදුමටම එය බලපායි."
              : "மொழி மாற்றம் செயலியின் அனைத்து பகுதிகளுக்கும் பொருந்தும்."}
          </Text>
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
              <Text style={styles.menuTitle}>{t.menu}</Text>
              <TouchableOpacity onPress={() => setMenuOpen(false)}>
                <Text style={styles.close}>✕</Text>
              </TouchableOpacity>
            </View>
            {t.menuItems.map((m) => (
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
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "ios" ? 12 : (StatusBar.currentHeight || 0),
    paddingBottom: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    elevation: 4,
  },
  logoWrap: { flex: 1 },
  logoText: { fontSize: 18, fontWeight: "bold", letterSpacing: 0.5 },
  logoSSL: { color: "#333" },
  logoGLOVE: { color: "#E53935" },
  titleBar: { backgroundColor: "#fff", alignItems: "center", paddingVertical: 12, elevation: 2 },
  titleBadge: {
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#f7e6e6",
    borderWidth: 1,
    borderColor: "#f0caca",
  },
  headerTitle: { color: "#333", fontSize: 20, fontWeight: "bold" },
  menuButton: { padding: 8 },
  hamburger: { width: 24, height: 18, justifyContent: "space-between" },
  hamburgerLine: { width: 24, height: 3, backgroundColor: "#333", borderRadius: 2 },

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
  nameInput: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginTop: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#fafafa",
    textAlign: "center",
  },
  email: { fontSize: 15, color: "#666", marginTop: 2 },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 16,
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
  
  // Language selector styles
  langRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 6,
  },
  langChip: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 10,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    backgroundColor: "#fafafa",
    alignItems: "center",
  },
  langChipActive: {
    borderColor: "#E53935",
    backgroundColor: "#fdeaea",
  },
  langChipText: {
    fontSize: 14,
    color: "#444",
    fontWeight: "500",
  },
  langChipTextActive: {
    color: "#E53935",
    fontWeight: "700",
  },
  langHint: {
    marginTop: 8,
    fontSize: 12,
    color: "#777",
  },
});
