import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import api from '../../services/api';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return Alert.alert('Error', 'Please fill all fields');
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data.role === 'admin') {
        return Alert.alert('Access Denied', 'Admins must use the Web Portal.');
      }
      Alert.alert('Success', 'Welcome to Brailley Student App!');
    } catch (error) {
      Alert.alert('Login Failed', error.response?.data?.message || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Braill<Text style={styles.highlight}>ey.</Text></Text>
      <Text style={styles.subtitle}>Student App Portal</Text>

      <TextInput style={styles.input} placeholder="Email Address" placeholderTextColor="#64748b" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#64748b" secureTextEntry value={password} onChangeText={setPassword} />

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#0f172a" /> : <Text style={styles.buttonText}>Sign In</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')} style={{ marginTop: 20 }}>
        <Text style={styles.linkText}>Don't have an account? <Text style={styles.linkHighlight}>Register</Text></Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', justifyContent: 'center', padding: 30 },
  title: { fontSize: 45, fontWeight: '900', color: '#f8fafc', marginBottom: 5 },
  highlight: { color: '#38bdf8' },
  subtitle: { fontSize: 16, color: '#94a3b8', marginBottom: 40 },
  input: { backgroundColor: 'rgba(30, 41, 59, 0.8)', padding: 15, borderRadius: 10, color: '#fff', marginBottom: 15, borderWidth: 1, borderColor: '#334155' },
  button: { backgroundColor: '#38bdf8', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#0f172a', fontWeight: 'bold', fontSize: 16 },
  linkText: { color: '#94a3b8', textAlign: 'center' },
  linkHighlight: { color: '#38bdf8', fontWeight: 'bold' }
});