import React, { createContext, useState, useContext, useRef } from 'react';
import { Animated, Text, StyleSheet, SafeAreaView, View } from 'react-native';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);
  const translateY = useRef(new Animated.Value(-100)).current;

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });

    // Slide down
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Auto-hide after 3 seconds
    setTimeout(() => {
      Animated.timing(translateY, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setNotification(null));
    }, 3000);
  };

  const getBackgroundColor = (type) => {
    switch (type) {
      case 'error': return '#e11d48'; // Rose/Red
      case 'success': return '#10b981'; // Emerald/Green
      default: return '#38bdf8'; // Sky Blue
    }
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <Animated.View 
          style={[
            styles.toastContainer, 
            { transform: [{ translateY }] }
          ]}
        >
          <SafeAreaView>
            <View style={[styles.toastContent, { borderLeftColor: getBackgroundColor(notification.type) }]}>
              <Text style={styles.toastText}>{notification.message}</Text>
            </View>
          </SafeAreaView>
        </Animated.View>
      )}
    </NotificationContext.Provider>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    paddingHorizontal: 20,
    paddingTop: 50, // Adjust based on device notch
  },
  toastContent: {
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  toastText: {
    color: '#f8fafc',
    fontSize: 15,
    fontWeight: '600',
  },
});