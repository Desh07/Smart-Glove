import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Sign Language</Text>
      <Image
        source={require('../../logo.png')}
        style={styles.iconImage}
        resizeMode="contain"
        accessibilityLabel="Sign language illustration"
      />

      <Text style={styles.description}>
        Wear glove, make gestures{'\n'}and app speaks
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/language-selection')} accessibilityRole="button">
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  icon: {
    marginBottom: 20,
  },
  iconImage: {
    width: 140,
    height: 140,
    marginBottom: 20,
    borderRadius: 16,
    backgroundColor: '#fff',
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#f25c5c',
    paddingVertical: 12,
    paddingHorizontal: 90,
    borderRadius: 12,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
