import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import GoogleSignIn from '../components/google-signin';

export default function RegisterScreen() {
	const router = useRouter();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [contact, setContact] = useState('');
	const [password, setPassword] = useState('');
	const [confirm, setConfirm] = useState('');
	const [remember, setRemember] = useState(false);

	function handleRegister() {
		// TODO: wire to your backend
		console.log('register', { name, email, contact });
		router.replace('/');
	}

	function handleGoogle(userInfo: any) {
		console.log('Google register result', userInfo);
		router.replace('/');
	}

	return (
		<ThemedView style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.titleRow}>
					<Text style={styles.titleBold}>SSL </Text>
					<Text style={styles.titleOrange}>GLOVE</Text>
				</Text>
				<ThemedText style={styles.subtitle}>WELCOME TO THE SMART GLOVE COMMUNITY</ThemedText>
			</View>

			<View style={styles.form}>
				<ThemedText style={styles.label}>Name</ThemedText>
				<TextInput placeholder="Enter your name" value={name} onChangeText={setName} style={styles.input} />

				<ThemedText style={styles.label}>Email</ThemedText>
				<TextInput placeholder="Enter your email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none" />

				<ThemedText style={styles.label}>Contact number</ThemedText>
				<TextInput placeholder="Enter your contact number" value={contact} onChangeText={setContact} style={styles.input} keyboardType="phone-pad" />

				<ThemedText style={styles.label}>Password</ThemedText>
				<TextInput placeholder="Enter your password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />

				<ThemedText style={styles.label}>Confirm Password</ThemedText>
				<TextInput placeholder="Confirm your password" value={confirm} onChangeText={setConfirm} style={styles.input} secureTextEntry />

				<View style={styles.rememberRow}>
					<Pressable onPress={() => setRemember(!remember)} style={styles.checkbox}>
						{remember ? <View style={styles.checkboxTick} /> : null}
					</Pressable>
					<ThemedText style={styles.rememberText}>Remember me</ThemedText>
				</View>

				<Pressable style={styles.signInButton} onPress={handleRegister} android_ripple={{ color: '#d94b4b' }}>
					<Text style={styles.signInText}>Register</Text>
				</Pressable>

				<View style={styles.spacer} />

				<GoogleSignIn onSignIn={handleGoogle} />

				<View style={styles.footerRow}>
					<ThemedText style={styles.footerText}>Already have an account? </ThemedText>
					<Pressable onPress={() => router.replace('/login')}>
						<ThemedText style={styles.loginText}>Login</ThemedText>
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
	titleBold: { fontWeight: '700', color: '#000', fontSize: 28 },
	titleOrange: { fontWeight: '700', color: '#f25c5c', fontSize: 28 },
	subtitle: { fontSize: 12, color: '#999', letterSpacing: 1 },
	form: { width: '100%', maxWidth: 380 },
	label: { fontSize: 14, color: '#333', marginBottom: 6, fontWeight: '600' },
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
	rememberRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
	checkbox: {
		width: 18,
		height: 18,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 4,
		marginRight: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
	checkboxTick: { width: 12, height: 12, backgroundColor: '#f25c5c', borderRadius: 2 },
	rememberText: { color: '#666' },
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
	signInText: { color: '#fff', fontSize: 16, fontWeight: '600' },
	spacer: { height: 12 },
	footerRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 14 },
	footerText: { color: '#777', fontSize: 12 },
	loginText: { color: '#f25c5c', fontSize: 12, marginLeft: 6, fontWeight: '600' },
});

