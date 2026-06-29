import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Vibration } from 'react-native';
import * as Haptics from 'expo-haptics';

export default function BasicsScreen({ navigation }) {
  const [currentLetter, setCurrentLetter] = useState('A');
  const brailleAlphabet = {
    A: [true, false, false, false, false, false],
    B: [true, true, false, false, false, false],
    C: [true, false, false, true, false, false]
  };

  const handleBack = () => navigation.replace('Home');
  
  const nextLetter = () => {
    Vibration.vibrate(400); // LONG VIBRATION: Para alam na nag-next letter na
    setCurrentLetter(prev => prev === 'A' ? 'B' : prev === 'B' ? 'C' : 'A');
  };

  const handleDotTouch = (isActive) => {
    if (isActive) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy); // HARD: Naka-angat na dot
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); // LIGHT: Flat/walang dot
    }
  };

  const renderDot = (isActive, i) => (
    <TouchableOpacity 
      key={i} 
      activeOpacity={0.8}
      onPressIn={() => handleDotTouch(isActive)} // Nagva-vibrate the moment na ma-touch
      style={[styles.dot, isActive && styles.activeDot]} 
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}><Text style={styles.backButton}>Back</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>The Alphabet</Text>
        <View style={{ width: 40 }} />
      </View>
      <View style={styles.container}>
        <View style={styles.displayCard}>
          <Text style={styles.letterText}>{currentLetter}</Text>
          <Text style={styles.subtitle}>American Braille</Text>
        </View>
        <View style={styles.gridContainer}>
          <View style={styles.brailleGrid}>
            <View style={styles.column}>
              {renderDot(brailleAlphabet[currentLetter][0], 0)}{renderDot(brailleAlphabet[currentLetter][1], 1)}{renderDot(brailleAlphabet[currentLetter][2], 2)}
            </View>
            <View style={styles.column}>
              {renderDot(brailleAlphabet[currentLetter][3], 3)}{renderDot(brailleAlphabet[currentLetter][4], 4)}{renderDot(brailleAlphabet[currentLetter][5], 5)}
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.actionButton} onPress={nextLetter}>
          <Text style={styles.actionText}>Next Letter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0f172a' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 25, paddingTop: 20, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#1e293b' },
  backButton: { color: '#38bdf8', fontSize: 16, fontWeight: '600' },
  headerTitle: { color: '#f8fafc', fontSize: 18, fontWeight: '700' },
  container: { flex: 1, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center' },
  displayCard: { alignItems: 'center', marginBottom: 30 },
  letterText: { fontSize: 80, fontWeight: '900', color: '#f8fafc' },
  subtitle: { fontSize: 16, color: '#94a3b8', marginTop: 10 },
  gridContainer: { backgroundColor: '#1e293b', paddingVertical: 50, paddingHorizontal: 60, borderRadius: 40, borderWidth: 1, borderColor: '#334155', marginBottom: 40 },
  brailleGrid: { flexDirection: 'row', justifyContent: 'space-between', width: 200 },
  column: { justifyContent: 'space-between', height: 320 },
  dot: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#334155' },
  activeDot: { backgroundColor: '#38bdf8', shadowColor: '#38bdf8', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 15, elevation: 12 },
  actionButton: { backgroundColor: '#38bdf8', paddingVertical: 16, paddingHorizontal: 40, borderRadius: 12, width: '100%', alignItems: 'center' },
  actionText: { color: '#0f172a', fontSize: 16, fontWeight: 'bold' }
});