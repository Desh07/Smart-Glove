import { useTheme } from "@/contexts/ThemeContext";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Switch, Text, View } from "react-native";

export default function AccessibilityScreen() {
  const { darkMode, toggleDarkMode, colors, language } = useTheme();
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [vibrationFeedback, setVibrationFeedback] = useState(false);
  const [simpleInterface, setSimpleInterface] = useState(false);

  const t = {
    en: {
      title: "Accessibility Settings",
      darkMode: "Dark Mode",
      darkModeDesc: "Switches to dark theme",
      largeText: "Large Text",
      largeTextDesc: "Increases text size across the app",
      highContrast: "High Contrast",
      highContrastDesc: "Improves text and background contrast",
      vibration: "Vibration Feedback",
      vibrationDesc: "Vibrates when a gesture is recognized",
      simple: "Simple Interface",
      simpleDesc: "Shows only essential features",
      footer: "Accessibility settings apply to the entire app.",
    },
    si: {
      title: "ප්‍රවේශ්‍යතා සැකසුම්",
      darkMode: "අඳුරු මාදිලිය",
      darkModeDesc: "අඳුරු තේමාව වෙත මාරු වේ",
      largeText: "විශාල පෙළ",
      largeTextDesc: "යෙදුම පුරා පෙළ ප්‍රමාණය වැඩි කරයි",
      highContrast: "ඉහළ ප්‍රතිසන්ධිය",
      highContrastDesc: "පෙළ සහ පසුබිම ප්‍රතිසන්ධිය වැඩිදියුණු කරයි",
      vibration: "කම්පන ප්‍රතිපෝෂණය",
      vibrationDesc: "අභිනයක් හඳුනා ගත් විට කම්පනය වේ",
      simple: "සරල අතුරුමුහුණත",
      simpleDesc: "අත්‍යවශ්‍ය විශේෂාංග පමණක් පෙන්වයි",
      footer: "ප්‍රවේශ්‍යතා සැකසුම් මුළු යෙදුමටම අදාළ වේ.",
    },
    ta: {
      title: "அணுகல் அமைப்புகள்",
      darkMode: "இருண்ட பயன்முறை",
      darkModeDesc: "இருண்ட தீம் உக்கு மாறுகிறது",
      largeText: "பெரிய உரை",
      largeTextDesc: "செயலி முழுவதும் உரை அளவை அதிகரிக்கிறது",
      highContrast: "உயர் மாறுபாடு",
      highContrastDesc: "உரை மற்றும் பின்னணி மாறுபாட்டை மேம்படுத்துகிறது",
      vibration: "அதிர்வு கருத்து",
      vibrationDesc: "சைகை அங்கீகரிக்கப்படும்போது அதிர்கிறது",
      simple: "எளிய இடைமுகம்",
      simpleDesc: "அத்தியாவசிய அம்சங்களை மட்டும் காட்டுகிறது",
      footer: "அணுகல் அமைப்புகள் முழு செயலிக்கும் பொருந்தும்.",
    },
  }[language];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>{t.title}</Text>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
          <View style={[styles.row, { borderBottomColor: colors.divider }]}>
            <View style={styles.textBlock}>
              <Text style={[styles.label, { color: colors.text }]}>{t.darkMode}</Text>
              <Text style={[styles.description, { color: colors.textSecondary }]}>{t.darkModeDesc}</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: "#767577", true: colors.primary }}
              thumbColor={darkMode ? "#f4f3f4" : "#f4f3f4"}
            />
          </View>

          <View style={[styles.row, { borderBottomColor: colors.divider }]}>
            <View style={styles.textBlock}>
              <Text style={[styles.label, { color: colors.text }]}>{t.largeText}</Text>
              <Text style={[styles.description, { color: colors.textSecondary }]}>{t.largeTextDesc}</Text>
            </View>
            <Switch
              value={largeText}
              onValueChange={setLargeText}
              trackColor={{ false: "#767577", true: colors.primary }}
              thumbColor={largeText ? "#f4f3f4" : "#f4f3f4"}
            />
          </View>

          <View style={[styles.row, { borderBottomColor: colors.divider }]}>
            <View style={styles.textBlock}>
              <Text style={[styles.label, { color: colors.text }]}>{t.highContrast}</Text>
              <Text style={[styles.description, { color: colors.textSecondary }]}>{t.highContrastDesc}</Text>
            </View>
            <Switch
              value={highContrast}
              onValueChange={setHighContrast}
              trackColor={{ false: "#767577", true: colors.primary }}
              thumbColor={highContrast ? "#f4f3f4" : "#f4f3f4"}
            />
          </View>

          <View style={[styles.row, { borderBottomColor: colors.divider }]}>
            <View style={styles.textBlock}>
              <Text style={[styles.label, { color: colors.text }]}>{t.vibration}</Text>
              <Text style={[styles.description, { color: colors.textSecondary }]}>{t.vibrationDesc}</Text>
            </View>
            <Switch
              value={vibrationFeedback}
              onValueChange={setVibrationFeedback}
              trackColor={{ false: "#767577", true: colors.primary }}
              thumbColor={vibrationFeedback ? "#f4f3f4" : "#f4f3f4"}
            />
          </View>

          <View style={[styles.row, { borderBottomColor: colors.divider }]}>
            <View style={styles.textBlock}>
              <Text style={[styles.label, { color: colors.text }]}>{t.simple}</Text>
              <Text style={[styles.description, { color: colors.textSecondary }]}>{t.simpleDesc}</Text>
            </View>
            <Switch
              value={simpleInterface}
              onValueChange={setSimpleInterface}
              trackColor={{ false: "#767577", true: colors.primary }}
              thumbColor={simpleInterface ? "#f4f3f4" : "#f4f3f4"}
            />
          </View>
        </View>

        <Text style={[styles.footer, { color: colors.textSecondary }]}>{t.footer}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  card: {
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  textBlock: {
    flex: 1,
    paddingRight: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
  },
  footer: {
    marginTop: 16,
    fontSize: 13,
    textAlign: "center",
  },
});
