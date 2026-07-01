import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import api from '../../services/api';
import { useNotification } from '../../context/NotificationContext';
import { getOrCreateDeviceId } from '../../utils/deviceAuth';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState(''); const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();

  const handleRegister = async () => {
    if (!username) return showNotification('Enter username', 'error');
    setLoading(true);
    try {
      const deviceId = await getOrCreateDeviceId();
      await api.post('/auth/register', { username, deviceId, role: 'student' });
      showNotification('Account Created!', 'success');
      setTimeout(() => navigation.replace('Login'), 1000);
    } catch (e) { showNotification(e.response?.data?.message || 'Error', 'error'); }
    finally { setLoading(false); }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.back}>← Back</Text></TouchableOpacity>
      <Text style={styles.title}>Get Started</Text>
      <Text style={styles.subtitle}>Choose a username to begin</Text>
      <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#64748b" value={username} onChangeText={setUsername} autoCapitalize="none" />
      <TouchableOpacity style={styles.btn} onPress={handleRegister} disabled={loading}>
        {loading ? <ActivityIndicator color="#0f172a" /> : <Text style={styles.btnTxt}>Create Account</Text>}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.replace('Login')} style={styles.link}><Text style={styles.linkTxt}>Already have an account? <Text style={styles.hl}>Login</Text></Text></TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 30, justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: '800', color: '#f8fafc', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#94a3b8', marginBottom: 32 },
  input: { backgroundColor: '#1e293b', padding: 18, borderRadius: 12, color: '#fff', fontSize: 16, marginBottom: 16, borderWidth: 1, borderColor: '#334155' },
  btn: { backgroundColor: '#38bdf8', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  btnTxt: { color: '#0f172a', fontWeight: 'bold', fontSize: 16 },
  link: { marginTop: 24, alignItems: 'center' },
  linkTxt: { color: '#94a3b8', fontSize: 14 },
  hl: { color: '#38bdf8', fontWeight: 'bold' },
  back: { color: '#64748b', marginBottom: 20 }
});