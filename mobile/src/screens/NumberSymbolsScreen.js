import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Vibration } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';

export default function NumbersSymbolsScreen({ navigation }) {
  const [char, setChar] = useState('1');
  const [status, setStatus] = useState('idle');
  const [activeDot, setActiveDot] = useState(-1);
  const [sound, setSound] = useState();

  const dict = {
    '1': [true, false, false, false, false, false], '2': [true, true, false, false, false, false],
    '3': [true, false, false, true, false, false], '4': [true, false, false, true, true, false],
    '5': [true, false, false, false, true, false], '6': [true, true, false, true, false, false],
    '7': [true, true, false, true, true, false], '8': [true, true, false, false, true, false],
    '9': [false, true, false, true, false, false], '0': [false, true, false, true, true, false],
    ',': [false, true, false, false, false, false], ';': [false, true, true, false, false, false],
    ':': [false, true, false, false, true, false], '.': [false, true, false, false, true, true],
    '!': [false, true, true, false, true, false], '()': [false, true, true, false, true, true],
    '?': [false, true, true, false, false, true], '"': [false, true, true, false, false, true],
    '/': [false, false, true, true, false, false], '$': [true, true, false, true, false, true],
    "'": [false, false, true, false, false, false], '-': [false, false, true, false, false, true]
  };

  useEffect(() => {
    const load = async () => { const { sound } = await Audio.Sound.createAsync(require('../../assets/buzz.mp3')); setSound(sound); };
    load(); return () => sound?.unloadAsync();
  }, []);

  const trigger = async (isHard, idx, keep = false) => {
    setActiveDot(idx);
    if (isHard) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy); Vibration.vibrate(250);
      if (sound) { await sound.setPositionAsync(0); await sound.setVolumeAsync(1); await sound.playAsync(); if(!keep) { await new Promise(r => setTimeout(r, 400)); await sound.setVolumeAsync(0); await sound.pauseAsync(); } }
    } else Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const playPattern = async (c) => {
    setStatus('start'); await new Promise(r => setTimeout(r, 500));
    setStatus('playing'); const p = dict[c];
    for (let r = 0; r < 3; r++) {
      await trigger(p[r], r, p[r+3]); await new Promise(r => setTimeout(r, 500));
      await trigger(p[r+3], r+3, false); await new Promise(r => setTimeout(r, 600));
    }
    setStatus('idle'); setActiveDot(-1);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.replace('Home')}><Text style={styles.backBtn}>Back</Text></TouchableOpacity>
        <Text style={styles.hTitle}>Numbers & Symbols</Text><View style={{ width: 40 }} />
      </View>
      <View style={styles.container}>
        <View style={styles.dispCard}><Text style={styles.lText}>{char}</Text></View>
        <View style={[styles.gridCont, { borderColor: status === 'playing' ? '#38bdf8' : status === 'start' ? '#22c55e' : '#334155' }]}>
          <View style={styles.bGrid}>
            <View style={styles.col}>{dict[char].slice(0,3).map((a,i) => <View key={i} style={[styles.dot, a && styles.activeDot, activeDot === i && styles.playingDot]} />)}</View>
            <View style={styles.col}>{dict[char].slice(3,6).map((a,i) => <View key={i+3} style={[styles.dot, a && styles.activeDot, activeDot === i+3 && styles.playingDot]} />)}</View>
          </View>
        </View>
        <ScrollView style={styles.kbScroll} contentContainerStyle={styles.kbGrid}>
          {Object.keys(dict).map((c) => (
            <TouchableOpacity key={c} style={[styles.key, c === char && styles.activeKey]} onPress={() => { setChar(c); playPattern(c); }}>
              <Text style={styles.keyText}>{c}</Text>
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
  playingDot: { backgroundColor: '#22c55e', transform: [{ scale: 1.2 }] },
  kbScroll: { flex: 1 },
  kbGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', paddingBottom: 20 },
  key: { width: 50, height: 50, backgroundColor: '#1e293b', margin: 6, borderRadius: 8, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#334155' },
  activeKey: { borderColor: '#38bdf8', borderWidth: 2 },
  keyText: { color: '#f8fafc', fontSize: 18, fontWeight: 'bold' }
});