import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import api from '../../services/api';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) return Alert.alert('Error', 'Please fill all fields');
    setLoading(true);
    try {
      await api.post('/auth/register', { name, email, password, role: 'student' });
      Alert.alert('Success', 'Account Created! You can now log in.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Registration Failed', error.response?.data?.message || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Start learning Braille today.</Text>

      <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="#64748b" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email Address" placeholderTextColor="#64748b" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#64748b" secureTextEntry value={password} onChangeText={setPassword} />

      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        {loading ? <ActivityIndicator color="#0f172a" /> : <Text style={styles.buttonText}>Register as Student</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
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