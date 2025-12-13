import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

type Props = {
  onSignIn: (userInfo: any) => void;
};

export default function GoogleSignIn({ onSignIn }: Props) {
  const [loading, setLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    // Replace these placeholders with your actual OAuth client IDs.
    expoClientId: '<EXPO_CLIENT_ID_HERE>',
    iosClientId: '<IOS_CLIENT_ID_HERE>',
    androidClientId: '<ANDROID_CLIENT_ID_HERE>',
    webClientId: '<WEB_CLIENT_ID_HERE>',
    scopes: ['profile', 'email'],
  });

  useEffect(() => {
    async function handleResponse() {
      if (response?.type === 'success') {
        setLoading(true);
        try {
          const { authentication } = response;
          if (!authentication?.accessToken) {
            throw new Error('No access token');
          }

          const userRes = await fetch('https://www.googleapis.com/userinfo/v2/me', {
            headers: { Authorization: `Bearer ${authentication.accessToken}` },
          });

          const userInfo = await userRes.json();
          onSignIn(userInfo);
        } catch (err) {
          console.warn('Google sign-in error', err);
        } finally {
          setLoading(false);
        }
      }
    }

    handleResponse();
  }, [response, onSignIn]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Pressable
          style={({ pressed }) => [styles.button, !request && styles.disabled, pressed && styles.pressed]}
          onPress={() => {
            // promptAsync opens the OAuth flow; on mobile this will open the native or browser flow.
            promptAsync();
          }}
          disabled={!request}
          accessibilityLabel="Sign in with Google"
        >
          <Image
            source={{ uri: 'https://developers.google.com/identity/images/g-logo.png' }}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.buttonText}>Sign in with Google</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    width: '100%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  logo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#444',
  },
  disabled: {
    opacity: 0.6,
  },
  pressed: {
    opacity: 0.8,
  },
});
