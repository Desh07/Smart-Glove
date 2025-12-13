import { useTheme } from "@/contexts/ThemeContext";
import React, { useState } from "react";
import {
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function LanguageTab() {
  const { colors, language, darkMode } = useTheme();
  const [voiceLanguage, setVoiceLanguage] = useState<"si" | "ta">("si");

  const languages = [
    { key: "si" as const, label: "Sinhala", native: "සිංහල" },
    { key: "ta" as const, label: "Tamil", native: "தமிழ்" },
  ];

  const t = {
    en: {
      title: "Voice Output",
      description: "Select your preferred language to receive the audio output.",
      
    },
    si: {
      title: "හඩ ප්‍රතිදානය",
      description: "ශ්‍රව්‍ය ප්‍රතිදානය ලබාගැනීමට ඔබේ කැමති භාෂාව තෝරන්න.",
      
    },
    ta: {
      title: "குரல் வெளியீடு",
      description: "ஆடியோ வெளியீட்டைப் பெற உங்கள் விருப்ப மொழியைத் தேர்ந்தெடுக்கவும்.",
      
    },
  }[language];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.headerBg }]}>
        <Text style={[styles.logoText, { color: colors.text }]}>
          <Text style={styles.logoSSL}>SSL </Text>
          <Text style={styles.logoGLOVE}>GLOVE</Text>
        </Text>
      </View>

      {/* Title Section */}
      <View style={[styles.titleBar, { backgroundColor: colors.headerBg }]}>
        <View style={styles.titleBadge}>
          <Text style={[styles.headerTitle, { color: darkMode ? "#8B0000" : colors.text }]}>{t.title}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
          <Text style={[styles.description, { color: colors.textSecondary }]}>{t.description}</Text>

          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.key}
              style={[
                styles.voiceOption,
                { borderBottomColor: colors.divider },
                voiceLanguage === lang.key && [
                  styles.voiceOptionActive,
                  { backgroundColor: colors.inputBg },
                ],
              ]}
              onPress={() => setVoiceLanguage(lang.key)}
            >
              <View style={styles.voiceContent}>
                <Text style={[styles.voiceLabel, { color: colors.text }]}>
                  {lang.label}
                </Text>
                <Text style={[styles.voiceNative, { color: colors.textSecondary }]}>
                  {lang.native}
                </Text>
              </View>
              {voiceLanguage === lang.key && (
                <View style={styles.checkmark}>
                  <Text style={styles.checkmarkIcon}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.hint, { color: colors.textSecondary }]}></Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: Platform.OS === "ios" ? 12 : (StatusBar.currentHeight || 0),
    paddingBottom: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  logoText: { fontSize: 18, fontWeight: "bold", letterSpacing: 0.5 },
  logoSSL: { color: "inherit" },
  logoGLOVE: { color: "#E53935" },
  titleBar: { alignItems: "center", paddingVertical: 12, elevation: 2 },
  titleBadge: {
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#f7e6e6",
    borderWidth: 1,
    borderColor: "#f0caca",
  },
  headerTitle: { fontSize: 20, fontWeight: "bold" },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    marginBottom: 16,
  },
  description: {
    fontSize: 15,
    marginBottom: 16,
    textAlign: "center",
    lineHeight: 20,
  },
  voiceOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderRadius: 8,
    marginBottom: 4,
  },
  voiceOptionActive: {
    borderWidth: 2,
    borderColor: "#E53935",
  },
  voiceContent: {
    flex: 1,
  },
  voiceLabel: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  voiceNative: {
    fontSize: 16,
  },
  checkmark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#E53935",
    justifyContent: "center",
    alignItems: "center",
  },
  checkmarkIcon: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  hint: {
    fontSize: 13,
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
