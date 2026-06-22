import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import api from '../../services/api';

import { useNotification } from '../../context/NotificationContext';
import { getOrCreateDeviceId } from '../../utils/deviceAuth';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const { showNotification } = useNotification();

  const handleLogin = async () => {
    if (!username) {
      return showNotification('Please enter your username', 'error');
    }
    
    setLoading(true);
    try {
      const deviceId = await getOrCreateDeviceId();

      if (!deviceId) {
        setLoading(false);
        return showNotification('Could not retrieve device credentials.', 'error');
      }

      const res = await api.post('/auth/login', { 
        username, 
        deviceId 
      });

      if (res.data.role === 'admin') {
        return showNotification('Admins must use the Web Portal.', 'error');
      }

      showNotification('Welcome back to Brailley!', 'success');
      
      setTimeout(() => {
        navigation.replace('Home');
      }, 1500);

    } catch (error) {
      console.error("API ERROR:", error.response?.data || error.message);
      
      const errorMsg = error.response?.data?.message || 'Username not found or unrecognized device';
      showNotification(errorMsg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Braill<Text style={styles.highlight}>ey.</Text></Text>
      <Text style={styles.subtitle}>Welcome back. Enter your username.</Text>

      <TextInput 
        style={styles.input} 
        placeholder="Username" 
        placeholderTextColor="#64748b" 
        autoCapitalize="none" 
        value={username} 
        onChangeText={setUsername} 
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#0f172a" /> : <Text style={styles.buttonText}>Sign In</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.replace('Register')} style={{ marginTop: 20 }}>
        <Text style={styles.linkText}>Don't have an account? <Text style={styles.linkHighlight}>Get Started</Text></Text>
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