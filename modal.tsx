import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import GoogleSignIn from '../components/google-signin';

export default function ModalScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSignIn() {
    // TODO: wire to your auth backend
    console.log('Modal sign in:', { email });
    router.replace('/');
  }

  function handleGoogle(userInfo: any) {
    console.log('Modal Google sign-in:', userInfo);
    router.replace('/');
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleRow}>
          <Text style={styles.titleBold}>SSL </Text>
          <Text style={styles.titleOrange}>GLOVE</Text>
        </Text>
        <ThemedText style={styles.subtitle}>LOGIN TO CONTINUE</ThemedText>
      </View>

      <View style={styles.form}>
        <ThemedText style={styles.label}>Email</ThemedText>
        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <ThemedText style={styles.label}>Password</ThemedText>
        <TextInput
          placeholder="Enter your password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        <Pressable onPress={() => console.log('Forgot password tapped')} style={styles.forgotRow}>
          <ThemedText style={styles.forgotText}>Forgot Password?</ThemedText>
        </Pressable>

        <Pressable style={styles.signInButton} onPress={handleSignIn} android_ripple={{ color: '#d94b4b' }}>
          <Text style={styles.signInText}>Login</Text>
        </Pressable>

        <View style={styles.spacer} />

        <GoogleSignIn onSignIn={handleGoogle} />

        <View style={styles.footerRow}>
          <ThemedText style={styles.footerText}>Don't have an account yet?</ThemedText>
          <Pressable onPress={() => router.replace('/register')}>
            <ThemedText style={styles.signupText}> Signup</ThemedText>
          </Pressable>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  titleRow: {
    fontSize: 28,
    marginBottom: 6,
  },
  titleBold: {
    fontWeight: '700',
    color: '#000',
    fontSize: 28,
  },
  titleOrange: {
    fontWeight: '700',
    color: '#f25c5c',
    fontSize: 28,
  },
  subtitle: {
    fontSize: 12,
    color: '#999',
    letterSpacing: 1,
  },
  form: {
    width: '100%',
    maxWidth: 380,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#eee',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  forgotRow: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  forgotText: {
    color: '#666',
    fontSize: 12,
  },
  signInButton: {
    width: '100%',
    backgroundColor: '#f25c5c',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    shadowColor: '#f25c5c',
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 3,
  },
  signInText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  spacer: {
    height: 12,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 14,
  },
  footerText: {
    color: '#777',
    fontSize: 12,
  },
  signupText: {
    color: '#f25c5c',
    fontSize: 12,
    marginLeft: 6,
    fontWeight: '600',
  },
});

