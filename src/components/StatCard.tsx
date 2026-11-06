import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type StatCardProps = {
  title: string;
  value: string | number;
};

export default function StatCard({
  title,
  value,
}: StatCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#F8F8FB',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },

  value: {
    fontSize: 22,
    fontWeight: '700',
    color: '#756FE8',
  },

  title: {
    fontSize: 12,
    color: '#8B8DA8',
    marginTop: 5,
  },
});