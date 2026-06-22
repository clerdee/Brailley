import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';

export default function HomeScreen({ navigation }) {
  
  const handleLogout = () => {
    navigation.replace('Landing');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.logo}>Braill<Text style={styles.highlight}>ey.</Text></Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeSection}>
          <Text style={styles.greeting}>Welcome back!</Text>
          <Text style={styles.subGreeting}>Ready to continue your Braille journey?</Text>
        </View>

        <Text style={styles.sectionTitle}>Your Modules</Text>

        {/* Module Card 1 */}
        <TouchableOpacity style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Basics: The Alphabet</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>In Progress</Text>
            </View>
          </View>
          <Text style={styles.cardDescription}>
            Learn to identify the dots for letters A through Z using haptic feedback.
          </Text>
        </TouchableOpacity>

        {/* Module Card 2 */}
        <TouchableOpacity style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Numbers & Symbols</Text>
          </View>
          <Text style={styles.cardDescription}>
            Understand how the number sign transforms letters into numbers.
          </Text>
        </TouchableOpacity>

        {/* Module Card 3 */}
        <TouchableOpacity style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Word Contractions</Text>
          </View>
          <Text style={styles.cardDescription}>
            Master short-form words to read and write Braille much faster.
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0f172a' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 25, 
    paddingTop: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b'
  },
  logo: { fontSize: 24, fontWeight: '900', color: '#f8fafc' },
  highlight: { color: '#38bdf8' },
  logoutButton: { padding: 8 },
  logoutText: { color: '#94a3b8', fontSize: 14, fontWeight: '600' },
  
  container: { flex: 1, paddingHorizontal: 25 },
  welcomeSection: { marginTop: 30, marginBottom: 40 },
  greeting: { fontSize: 32, fontWeight: '800', color: '#f8fafc', marginBottom: 8 },
  subGreeting: { fontSize: 16, color: '#94a3b8', lineHeight: 24 },
  
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#f8fafc', marginBottom: 15, letterSpacing: 0.5 },
  
  card: { 
    backgroundColor: '#1e293b', 
    borderRadius: 16, 
    padding: 20, 
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#334155'
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#f8fafc' },
  badge: { backgroundColor: 'rgba(56, 189, 248, 0.1)', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 12 },
  badgeText: { color: '#38bdf8', fontSize: 12, fontWeight: 'bold' },
  cardDescription: { color: '#94a3b8', fontSize: 14, lineHeight: 22 },
});