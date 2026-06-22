import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import api from '../../services/api';
import { useNotification } from '../../context/NotificationContext';
import { getOrCreateDeviceId } from '../../utils/deviceAuth'; 

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification(); 

  const handleRegister = async () => {
    if (!username) {
      return showNotification('Please enter a username', 'error');
    }
    
    setLoading(true);
    try {
      const deviceId = await getOrCreateDeviceId();
      
      if (!deviceId) {
        setLoading(false);
        return showNotification('Could not generate a secure device binding.', 'error');
      }

      await api.post('/auth/register', { 
        username, 
        deviceId, 
        role: 'student' 
      });
      
      showNotification('Account Created! Please log in.', 'success');
      
      setTimeout(() => {
        navigation.replace('Login'); 
      }, 1500);

    } catch (error) {
      console.error("API ERROR:", error.response?.data || error.message);
      const errorMsg = error.response?.data?.message || 'Username might already be taken';
      showNotification(errorMsg, 'error');
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