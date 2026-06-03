import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Vibration } from 'react-native';

export default function CustomButton({ title, onPress, isDanger }) {
  const handlePress = () => {
    Vibration.vibrate(80);
    onPress();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[styles.button, isDanger ? styles.danger : styles.primary]}
      onPress={handlePress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    width: '80%',
  },
  primary: {
    backgroundColor: '#2563eb',
  },
  danger: {
    backgroundColor: '#dc2626',
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});