import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { purple } from '../utils/colors';

const styles = StyleSheet.create({
  reset: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: purple,
  },
});

export default function TextButton({ children, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.reset}>{children}</Text>
    </TouchableOpacity>
  );
}
