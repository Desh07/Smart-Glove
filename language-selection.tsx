import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function LanguageSelectionScreen() {
  const router = useRouter();
  const [language, setLanguage] = useState<'ta' | 'si' | null>('si');
  const [activeNav, setActiveNav] = useState<'home' | 'language' | 'profile'>('language');

  function selectLanguage(code: 'ta' | 'si') {
    setLanguage(code);
  }

  function go(route: 'home' | 'language' | 'profile') {
    setActiveNav(route);
    if (route === 'home') router.push('/');
    if (route === 'language') router.push('/language-selection');
    if (route === 'profile') router.push('/');
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.logo}>SSL <Text style={styles.logoHighlight}>GLOVE</Text></Text>
        <Ionicons name="menu" size={22} color="#111" />
      </View>

      <Text style={styles.title}>Select Language</Text>
      <Text style={styles.subtitle}>Pick your preferred language to{"\n"}receive spoken output</Text>

      <Pressable
        style={[styles.langButton, language === 'ta' && styles.langSelected]}
        onPress={() => selectLanguage('ta')}
        accessibilityRole="button"
      >
        <Text style={styles.langTitle}>தமிழ்</Text>
        <Text style={styles.langSub}>Tamil</Text>
      </Pressable>

      <Pressable
        style={[styles.langButton, language === 'si' && styles.langSelected]}
        onPress={() => selectLanguage('si')}
        accessibilityRole="button"
      >
        <Text style={styles.langTitle}>සිංහල</Text>
        <Text style={styles.langSub}>Sinhala</Text>
      </Pressable>

      <View style={styles.bottomNav}>
        <Pressable style={styles.navItem} onPress={() => go('home')}>
          <Ionicons name="home-outline" size={22} color={activeNav === 'home' ? '#2ecc71' : '#777'} />
          <Text style={[styles.navLabel, activeNav === 'home' && styles.navLabelActive]}>Home</Text>
        </Pressable>

        <Pressable style={styles.navItem} onPress={() => go('language')}>
          <Ionicons name="language-outline" size={22} color={activeNav === 'language' ? '#2ecc71' : '#777'} />
          <Text style={[styles.navLabel, activeNav === 'language' && styles.navLabelActive]}>Language</Text>
        </Pressable>

        <Pressable style={styles.navItem} onPress={() => go('profile')}>
          <Ionicons name="person-outline" size={22} color={activeNav === 'profile' ? '#2ecc71' : '#777'} />
          <Text style={[styles.navLabel, activeNav === 'profile' && styles.navLabelActive]}>Profile</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },

  logo: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  logoHighlight: {
    color: '#ff5c8d',
  },

  titleBox: {
    backgroundColor: '#f1ecf7',
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 10,
  },

  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },

  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    marginBottom: 18,
  },

  langButton: {
    backgroundColor: '#f7f2fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  langSelected: {
    backgroundColor: '#dff7e2',
  },
  langTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  langSub: {
    fontSize: 13,
    color: '#444',
  },

  bottomNav: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  navItem: {
    alignItems: 'center',
  },
  navLabel: {
    marginTop: 6,
    fontSize: 12,
    color: '#777',
  },
  navLabelActive: {
    color: '#0cee6aff',
    fontWeight: '600',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  
});
