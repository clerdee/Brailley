import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Vibration } from 'react-native';
import * as Haptics from 'expo-haptics';

export default function NumbersSymbolsScreen({ navigation }) {
  const [char, setChar] = useState('1');
  const [isVibrating, setIsVibrating] = useState(false);

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

  const playPattern = async (c) => {
    setIsVibrating(true);
    const p = dict[c];
    for (let r = 0; r < 3; r++) {
      if (p[r]) { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy); Vibration.vibrate(250); }
      else Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      await new Promise(r => setTimeout(r, 500));
      if (p[r + 3]) { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy); Vibration.vibrate(250); }
      else Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      await new Promise(r => setTimeout(r, 600));
    }
    setIsVibrating(false);
  };

  const renderDot = (a, i) => <View key={i} style={[styles.dot, a && styles.activeDot]} />;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.replace('Home')}><Text style={styles.backBtn}>Back</Text></TouchableOpacity>
        <Text style={styles.hTitle}>Numbers & Symbols</Text>
        <View style={{ width: 40 }} />
      </View>
      <View style={styles.container}>
        <View style={styles.dispCard}><Text style={styles.lText}>{char}</Text></View>
        <View style={[styles.gridCont, isVibrating && styles.vibeActive]}>
          <View style={styles.bGrid}>
            <View style={styles.col}>{renderDot(dict[char][0], 0)}{renderDot(dict[char][1], 1)}{renderDot(dict[char][2], 2)}</View>
            <View style={styles.col}>{renderDot(dict[char][3], 3)}{renderDot(dict[char][4], 4)}{renderDot(dict[char][5], 5)}</View>
          </View>
        </View>
        <ScrollView style={styles.kbScroll}>
          <View style={styles.kbGrid}>
            {Object.keys(dict).map((c) => (
              <TouchableOpacity key={c} style={[styles.key, c === char && styles.activeKey]} onPress={() => { setChar(c); playPattern(c); }}>
                <Text style={styles.keyText}>{c}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
  gridCont: { backgroundColor: '#1e293b', paddingVertical: 30, paddingHorizontal: 40, borderRadius: 30, borderWidth: 2, borderColor: '#334155', marginBottom: 20, alignItems: 'center' },
  vibeActive: { borderColor: '#38bdf8' },
  bGrid: { flexDirection: 'row', justifyContent: 'space-between', width: 140 },
  col: { justifyContent: 'space-between', height: 220 },
  dot: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#334155' },
  activeDot: { backgroundColor: '#38bdf8' },
  kbScroll: { flex: 1 },
  kbGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', paddingBottom: 20 },
  key: { width: 50, height: 50, backgroundColor: '#1e293b', margin: 6, borderRadius: 8, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#334155' },
  activeKey: { borderColor: '#38bdf8', borderWidth: 2 },
  keyText: { color: '#f8fafc', fontSize: 18, fontWeight: 'bold' }
});