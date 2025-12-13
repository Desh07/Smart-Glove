import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<'home' | 'language' | 'profile'>('home');
  const [isSaved, setIsSaved] = useState(false);

  // Store both English and Sinhala phrases
  const [savedPhrases, setSavedPhrases] = useState<{ english: string; sinhala: string }[]>([]);

  const sinhalaPhrase = "සුරකින ලදී"; // Sinhala
  const englishPhrase = "Saved";     // English
  

  const navigate = (tab: 'home' | 'language' | 'profile') => {
    setActiveTab(tab);
  };

  const handleSavePhrase = () => {
    if (!isSaved) {
      // Save both English and Sinhala
      setSavedPhrases(prev => [...prev, { english: englishPhrase, sinhala: sinhalaPhrase }]);
      setIsSaved(true);
    } else {
      // Remove the last saved phrase if un-saving
      setSavedPhrases(prev => prev.slice(0, -1));
      setIsSaved(false);
    }
  };

  const handleMenuClick = () => {
    Alert.alert("Menu", "Menu button clicked!");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.logoSSL}>SSL</Text>
            <Text style={styles.logoGLOVE}>GLOVE</Text>
          </View>
          <TouchableOpacity onPress={handleMenuClick}>
            <Feather name="menu" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Welcome */}
        <View style={styles.welcomeBox}>
          <Text style={styles.welcomeText}>Welcome User</Text>
        </View>

        {/* Device Status */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="bluetooth" size={22} color="#6A5ACD" />
              <View style={{ marginLeft: 8 }}>
                <Text style={styles.cardTitle}>Device Status</Text>
                <Text style={styles.connected}>Connected</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.disconnectBtn}>
              <Text style={styles.disconnectText}>Disconnect</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Speaking Section */}
        <View style={styles.cardCenter}>
          <Text style={styles.sectionTitle}>Speaking for you...</Text>
          <Ionicons name="volume-high" size={50} color="#6A5ACD" />
        </View>

        {/* Last Gesture */}
        <View style={styles.cardCenter}>
          <Text style={styles.sectionTitle}>Last Recognized Gesture</Text>
          <Text style={styles.gestureText}>{sinhalaPhrase ?? ""}</Text>
          <Text style={styles.detecting}>Detecting...</Text>
        </View>

        {/* Saved Phrases */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.cardTitle}>Saved Phrases</Text>
            <TouchableOpacity onPress={handleSavePhrase}>
              <MaterialIcons
                name={isSaved ? "bookmark" : "bookmark-border"}
                size={22}
                color={isSaved ? "#6A5ACD" : "#000"}
              />
            </TouchableOpacity>
          </View>

          {savedPhrases.length === 0 ? (
            <Text style={styles.smallText}>No saved phrases</Text>
          ) : (
            savedPhrases.map((p, index) => (
              <View key={index} style={{ marginTop: 4 }}>
                <Text style={styles.smallText}>{p.english}</Text>
                <Text style={styles.smallText}>{p.sinhala}</Text>
              </View>
            ))
          )}
        </View>

        {/* Tutorials */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tutorials</Text>
          <Text style={styles.smallText}>• Setup Guide</Text>
          <Text style={styles.smallText}>• Instructions</Text>
          <Text style={styles.smallText}>• How to wear the Glove</Text>
          <Text style={styles.smallText}>• How Gesture recognition works</Text>
          <Text style={styles.smallText}>• FAQs</Text>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigate('home')}>
          <Ionicons name="home" size={24} color={activeTab === 'home' ? "#6A5ACD" : "#999"} />
          <Text style={[styles.navLabel, activeTab === 'home' && styles.navLabelActive]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigate('language')}>
          <Ionicons name="language" size={24} color={activeTab === 'language' ? "#6A5ACD" : "#999"} />
          <Text style={[styles.navLabel, activeTab === 'language' && styles.navLabelActive]}>Language</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigate('profile')}>
          <Ionicons name="person" size={24} color={activeTab === 'profile' ? "#6A5ACD" : "#999"} />
          <Text style={[styles.navLabel, activeTab === 'profile' && styles.navLabelActive]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F6FB" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16 },
  logoSSL: { fontSize: 17, fontWeight: "bold", color: "#000", textAlign: 'center' },
  logoGLOVE: { fontSize: 17, fontWeight: "bold", color: "#cf181eff", textAlign: 'center' },
  welcomeBox: { backgroundColor: "#EDE9FE", padding: 12, borderRadius: 25, alignItems: "center", marginHorizontal: 16, marginVertical: 8 },
  welcomeText: { fontSize: 16, fontWeight: "600" },
  card: { backgroundColor: "#FFF", borderRadius: 16, padding: 16, marginHorizontal: 16, marginBottom: 12 },
  cardCenter: { backgroundColor: "#FFF", borderRadius: 16, padding: 20, marginHorizontal: 16, marginBottom: 12, alignItems: "center" },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  cardTitle: { fontSize: 15, fontWeight: "600" },
  connected: { fontSize: 13, color: "green" },
  disconnectBtn: { backgroundColor: "#EFEAFE", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  disconnectText: { fontSize: 12, color: "#6A5ACD" },
  sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 12 },
  gestureText: { fontSize: 18, fontWeight: "600", marginVertical: 8 },
  detecting: { fontSize: 12, color: "#999" },
  smallText: { fontSize: 13, marginTop: 4 },
  moreText: { fontSize: 12, color: "#6A5ACD", marginTop: 4 },
  bottomNav: { flexDirection: "row", justifyContent: "space-around", paddingVertical: 12, backgroundColor: "#EDE9FE", borderRadius: 20, position: 'absolute', bottom: 10, left: 10, right: 10 },
  navItem: { alignItems: "center" },
  navLabel: { fontSize: 12, color: "#999", marginTop: 4 },
  navLabelActive: { color: "#6A5ACD", fontWeight: "600" },
});
