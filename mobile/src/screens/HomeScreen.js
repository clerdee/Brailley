// HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';

export default function HomeScreen({ navigation }) {
  const handleLogout = () => navigation.replace('Landing');
  const goToBasics = () => navigation.replace('Basics');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.logo}>Braill<Text style={styles.highlight}>ey.</Text></Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}><Text style={styles.logoutText}>Log Out</Text></TouchableOpacity>
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeSection}>
          <Text style={styles.greeting}>Welcome back!</Text>
          <Text style={styles.subGreeting}>Ready to continue your BrailleLearn journey?</Text>
        </View>
        <Text style={styles.sectionTitle}>Your Modules</Text>
        <TouchableOpacity style={styles.card} onPress={goToBasics}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Basics: The Alphabet</Text>
            <View style={styles.badge}><Text style={styles.badgeText}>In Progress</Text></View>
          </View>
          <Text style={styles.cardDescription}>Learn to identify the dots for letters A through Z using haptic feedback.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <View style={styles.cardHeader}><Text style={styles.cardTitle}>Numbers & Basic Symbols</Text></View>
          <Text style={styles.cardDescription}>Understand number signs and essential punctuation marks in Braille.</Text>
        </TouchableOpacity>
        <Text style={styles.sectionTitleTask}>Training Center</Text>
        <TouchableOpacity style={styles.taskCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.taskTitle}>Daily Challenges</Text>
            <View style={styles.taskBadge}><Text style={styles.taskBadgeText}>New Tasks</Text></View>
          </View>
          <Text style={styles.taskDescription}>Put your skills to the test with text-to-Braille conversion and interactive literacy training exercises.</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0f172a' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 25, paddingTop: 20, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#1e293b' },
  logo: { fontSize: 24, fontWeight: '900', color: '#f8fafc' }, highlight: { color: '#38bdf8' },
  logoutButton: { padding: 8 }, logoutText: { color: '#94a3b8', fontSize: 14, fontWeight: '600' },
  container: { flex: 1, paddingHorizontal: 25 },
  welcomeSection: { marginTop: 30, marginBottom: 40 },
  greeting: { fontSize: 32, fontWeight: '800', color: '#f8fafc', marginBottom: 8 },
  subGreeting: { fontSize: 16, color: '#94a3b8', lineHeight: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#f8fafc', marginBottom: 15, letterSpacing: 0.5 },
  sectionTitleTask: { fontSize: 18, fontWeight: '700', color: '#f8fafc', marginTop: 15, marginBottom: 15, letterSpacing: 0.5 },
  card: { backgroundColor: '#1e293b', borderRadius: 16, padding: 20, marginBottom: 15, borderWidth: 1, borderColor: '#334155' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#f8fafc' },
  badge: { backgroundColor: 'rgba(56, 189, 248, 0.1)', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 12 },
  badgeText: { color: '#38bdf8', fontSize: 12, fontWeight: 'bold' },
  cardDescription: { color: '#94a3b8', fontSize: 14, lineHeight: 22 },
  taskCard: { backgroundColor: '#38bdf8', borderRadius: 16, padding: 20, marginBottom: 30, shadowColor: '#38bdf8', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 },
  taskTitle: { fontSize: 18, fontWeight: '800', color: '#0f172a' },
  taskBadge: { backgroundColor: '#0f172a', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 12 },
  taskBadgeText: { color: '#38bdf8', fontSize: 12, fontWeight: 'bold' },
  taskDescription: { color: '#0f172a', fontSize: 14, fontWeight: '600', lineHeight: 22 }
});