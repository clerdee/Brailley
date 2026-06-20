import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

export default function LandingScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>STUDENT APP BETA</Text>
        </View>

        <Text style={styles.title}>
          Experience <Text style={styles.highlight}>Braille</Text>{'\n'}Like Never Before.
        </Text>

        <Text style={styles.subtitle}>
          An interactive mobile platform designed to help you learn and experience Braille through innovative haptic feedback.
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton} 
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.secondaryButtonText}>I already have an account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', justifyContent: 'space-between' },
  content: { paddingHorizontal: 30, paddingTop: 80, flex: 1, justifyContent: 'center' },
  badge: { backgroundColor: '#1e293b', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, alignSelf: 'flex-start', marginBottom: 20 },
  badgeText: { color: '#38bdf8', fontSize: 12, fontWeight: 'bold', letterSpacing: 1 },
  title: { fontSize: 42, fontWeight: '900', color: '#f8fafc', lineHeight: 48, marginBottom: 15 },
  highlight: { color: '#38bdf8' },
  subtitle: { fontSize: 16, color: '#94a3b8', lineHeight: 24, paddingRight: 20 },
  footer: { paddingHorizontal: 30, paddingBottom: 40 },
  primaryButton: { backgroundColor: '#38bdf8', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginBottom: 15, shadowColor: '#38bdf8', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
  primaryButtonText: { color: '#0f172a', fontSize: 16, fontWeight: 'bold' },
  secondaryButton: { backgroundColor: 'transparent', paddingVertical: 16, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#475569' },
  secondaryButtonText: { color: '#f8fafc', fontSize: 16, fontWeight: '600' }
});