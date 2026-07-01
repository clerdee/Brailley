import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Vibration, Modal, Animated } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';

export default function NumbersSymbolsScreen({ navigation }) {
  const [char, setChar] = useState('1');
  const [status, setStatus] = useState('idle');
  const [activeDot, setActiveDot] = useState(-1);
  const [sound, setSound] = useState();
  const [showModal, setShowModal] = useState(false);
  const eyeAnim = useState(new Animated.Value(0))[0];

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

  useEffect(() => {
    if (showModal) {
      Animated.loop(Animated.sequence([
        Animated.timing(eyeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
        Animated.timing(eyeAnim, { toValue: 0, duration: 1000, useNativeDriver: true })
      ])).start();
    }
  }, [showModal]);

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
      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <View style={styles.robotHead}>
              <View style={styles.robotEyeContainer}>
                <Animated.View style={[styles.eye, { transform: [{ translateX: eyeAnim.interpolate({ inputRange: [0, 1], outputRange: [-5, 5] }) }] }]} />
                <Animated.View style={[styles.eye, { transform: [{ translateX: eyeAnim.interpolate({ inputRange: [0, 1], outputRange: [-5, 5] }) }] }]} />
              </View>
              <View style={styles.mouth} />
            </View>
            <Text style={styles.modalTitle}>Curious Robot says...</Text>
            <Text style={styles.modalText}>Follow the dot—it dances to the vibration.</Text>
            <TouchableOpacity onPress={() => setShowModal(false)} style={styles.closeBtn}><Text style={styles.btnText}>Understood.</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.replace('Home')}><Text style={styles.backBtn}>Back</Text></TouchableOpacity>
        <Text style={styles.hTitle}>Numbers & Symbols</Text>
        <TouchableOpacity onPress={() => setShowModal(true)} style={styles.helpBtn}><Text style={styles.helpTxt}>?</Text></TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={styles.dispCard}><Text style={styles.lText}>{char}</Text></View>
        <View style={[styles.gridCont, { borderColor: status === 'playing' ? '#38bdf8' : status === 'start' ? '#22c55e' : '#334155' }]}>
          <View style={styles.bGrid}>
            <View style={styles.col}>{dict[char].slice(0,3).map((a,i) => <View key={i} style={[styles.dot, a && styles.activeDot, activeDot === i && styles.playingDot]} />)}</View>
            <View style={styles.col}>{dict[char].slice(3,6).map((a,i) => <View key={i+3} style={[styles.dot, a && styles.activeDot, activeDot === i+3 && styles.playingDot]} />)}</View>
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.kbGrid}>
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
  helpBtn: { width: 35, height: 35, borderRadius: 18, backgroundColor: '#1e293b', alignItems: 'center', justifyContent: 'center' },
  helpTxt: { color: '#38bdf8', fontWeight: 'bold' },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  dispCard: { alignItems: 'center', marginBottom: 20 },
  lText: { fontSize: 60, fontWeight: '900', color: '#f8fafc' },
  gridCont: { backgroundColor: '#1e293b', paddingVertical: 30, paddingHorizontal: 40, borderRadius: 30, borderWidth: 3, marginBottom: 20, alignItems: 'center' },
  bGrid: { flexDirection: 'row', justifyContent: 'space-between', width: 140 },
  col: { justifyContent: 'space-between', height: 220 },
  dot: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#334155' },
  activeDot: { backgroundColor: '#38bdf8' },
  playingDot: { backgroundColor: '#22c55e', transform: [{ scale: 1.2 }] },
  kbGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', paddingBottom: 20 },
  key: { width: 50, height: 50, backgroundColor: '#1e293b', margin: 6, borderRadius: 8, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#334155' },
  activeKey: { borderColor: '#38bdf8', borderWidth: 2 },
  keyText: { color: '#f8fafc', fontSize: 18, fontWeight: 'bold' },
  modalBg: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.9)', justifyContent: 'center', alignItems: 'center' },
  modalCard: { backgroundColor: '#1e293b', padding: 25, borderRadius: 20, width: '80%', alignItems: 'center', borderWidth: 1, borderColor: '#334155' },
  robotHead: { width: 70, height: 60, backgroundColor: '#38bdf8', borderRadius: 12, marginBottom: 15, alignItems: 'center', justifyContent: 'center' },
  robotEyeContainer: { flexDirection: 'row', gap: 8 },
  eye: { width: 10, height: 10, backgroundColor: '#0f172a', borderRadius: 5 },
  mouth: { width: 25, height: 4, backgroundColor: '#0f172a', marginTop: 8, borderRadius: 2 },
  modalTitle: { fontSize: 20, color: '#f8fafc', fontWeight: 'bold', marginBottom: 10 },
  modalText: { color: '#94a3b8', textAlign: 'center', marginBottom: 20, lineHeight: 20 },
  closeBtn: { backgroundColor: '#38bdf8', padding: 15, borderRadius: 10, width: '100%', alignItems: 'center' },
  btnText: { color: '#0f172a', fontWeight: 'bold', fontSize: 16 }
});