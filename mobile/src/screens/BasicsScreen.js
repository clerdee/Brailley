import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Vibration } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';

export default function BasicsScreen({ navigation }) {
  const [letter, setLetter] = useState('A');
  const [status, setStatus] = useState('idle');
  const [sound, setSound] = useState();

  const alpha = {
    A: [true, false, false, false, false, false], B: [true, true, false, false, false, false],
    C: [true, false, false, true, false, false], D: [true, false, false, true, true, false],
    E: [true, false, false, false, true, false], F: [true, true, false, true, false, false],
    G: [true, true, false, true, true, false], H: [true, true, false, false, true, false],
    I: [false, true, false, true, false, false], J: [false, true, false, true, true, false],
    K: [true, false, true, false, false, false], L: [true, true, true, false, false, false],
    M: [true, false, true, true, false, false], N: [true, false, true, true, true, false],
    O: [true, false, true, false, true, false], P: [true, true, true, true, false, false],
    Q: [true, true, true, true, true, false], R: [true, true, true, false, true, false],
    S: [false, true, true, true, false, false], T: [false, true, true, true, true, false],
    U: [true, false, true, false, false, true], V: [true, true, true, false, false, true],
    W: [false, true, false, true, true, true], X: [true, false, true, true, false, true],
    Y: [true, false, true, true, true, true], Z: [true, false, true, false, true, true]
  };

  useEffect(() => {
    const load = async () => { const { sound } = await Audio.Sound.createAsync(require('../../assets/buzz.mp3')); setSound(sound); };
    load(); return () => sound?.unloadAsync();
  }, []);

  const trigger = async (isHard, keepPlaying = false) => {
    if (isHard) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy); Vibration.vibrate(250);
      if (sound) { await sound.setPositionAsync(0); await sound.playAsync(); if(!keepPlaying) { await new Promise(r => setTimeout(r, 400)); await sound.pauseAsync(); } }
    } else { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }
  };

  const playPattern = async (l) => {
    setStatus('start'); await new Promise(r => setTimeout(r, 500));
    setStatus('playing'); const p = alpha[l];
    for (let r = 0; r < 3; r++) {
      const left = p[r], right = p[r+3];
      await trigger(left, right); 
      await new Promise(r => setTimeout(r, 500));
      await trigger(right, false);
      await new Promise(r => setTimeout(r, 600));
    }
    setStatus('idle');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.replace('Home')}><Text style={styles.backBtn}>Back</Text></TouchableOpacity>
        <Text style={styles.hTitle}>The Alphabet</Text><View style={{ width: 40 }} />
      </View>
      <View style={styles.container}>
        <View style={styles.dispCard}><Text style={styles.lText}>{letter}</Text></View>
        <View style={[styles.gridCont, { borderColor: status === 'playing' ? '#38bdf8' : status === 'start' ? '#22c55e' : '#334155' }]}>
          <View style={styles.bGrid}>
            <View style={styles.col}>{alpha[letter].slice(0,3).map((a,i) => <View key={i} style={[styles.dot, a && styles.activeDot]} />)}</View>
            <View style={styles.col}>{alpha[letter].slice(3,6).map((a,i) => <View key={i+3} style={[styles.dot, a && styles.activeDot]} />)}</View>
          </View>
        </View>
        <ScrollView style={styles.kbScroll} contentContainerStyle={styles.kbGrid}>
          {Object.keys(alpha).map((l) => (
            <TouchableOpacity key={l} style={[styles.key, l === letter && styles.activeKey]} onPress={() => { setLetter(l); playPattern(l); }}>
              <Text style={styles.keyText}>{l}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0f172a' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 25, paddingTop: 20, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#1e293b' },
  backBtn: { color: '#38bdf8', fontSize: 16, fontWeight: '600' },
  hTitle: { color: '#f8fafc', fontSize: 18, fontWeight: '700' },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  dispCard: { alignItems: 'center', marginBottom: 20 },
  lText: { fontSize: 60, fontWeight: '900', color: '#f8fafc' },
  gridCont: { backgroundColor: '#1e293b', paddingVertical: 30, paddingHorizontal: 40, borderRadius: 30, borderWidth: 3, marginBottom: 20, alignItems: 'center' },
  bGrid: { flexDirection: 'row', justifyContent: 'space-between', width: 140 },
  col: { justifyContent: 'space-between', height: 220 },
  dot: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#334155' },
  activeDot: { backgroundColor: '#38bdf8' },
  kbScroll: { flex: 1 },
  kbGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', paddingBottom: 20 },
  key: { width: 45, height: 45, backgroundColor: '#1e293b', margin: 4, borderRadius: 8, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#334155' },
  activeKey: { borderColor: '#38bdf8', borderWidth: 2 },
  keyText: { color: '#f8fafc', fontSize: 16, fontWeight: 'bold' }
});