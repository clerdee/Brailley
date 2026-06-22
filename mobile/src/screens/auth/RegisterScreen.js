import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import api from '../../services/api';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username) return Alert.alert('Error', 'Please enter a username');
    setLoading(true);
    try {
      // Backend should check if username exists. If yes, return error.
      await api.post('/auth/register', { username, role: 'student' });
      Alert.alert('Success', 'Account Created! Welcome to Brailley.');
      // Navigate to your main app screen here (e.g., Home or Dashboard)
      // navigation.replace('Home'); 
    } catch (error) {
      Alert.alert('Registration Failed', error.response?.data?.message || 'Username might already be taken');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Pick a unique username to start learning.</Text>

      <TextInput 
        style={styles.input} 
        placeholder="Choose a Username" 
        placeholderTextColor="#64748b" 
        autoCapitalize="none" 
        value={username} 
        onChangeText={setUsername} 
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        {loading ? <ActivityIndicator color="#0f172a" /> : <Text style={styles.buttonText}>Get Started</Text>}
      </TouchableOpacity>

      {/* Using REPLACE here prevents stacking */}
      <TouchableOpacity onPress={() => navigation.replace('Login')} style={{ marginTop: 20 }}>
        <Text style={styles.linkText}>Already have an account? <Text style={styles.linkHighlight}>Login</Text></Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', justifyContent: 'center', padding: 30 },
  title: { fontSize: 35, fontWeight: '800', color: '#f8fafc', marginBottom: 5 },
  subtitle: { fontSize: 16, color: '#94a3b8', marginBottom: 40 },
  input: { backgroundColor: 'rgba(30, 41, 59, 0.8)', padding: 15, borderRadius: 10, color: '#fff', marginBottom: 15, borderWidth: 1, borderColor: '#334155' },
  button: { backgroundColor: '#38bdf8', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#0f172a', fontWeight: 'bold', fontSize: 16 },
  linkText: { color: '#94a3b8', textAlign: 'center' },
  linkHighlight: { color: '#38bdf8', fontWeight: 'bold' }
});