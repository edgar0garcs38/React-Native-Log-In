import React from 'react';
import { View, Text, StyleSheet, Share } from 'react-native';
import CustomButton from '../components/CustomButton';

export default function ProfileScreen({ route }) {
  const { docenteName, codigoRegistro } = route.params || {};

  const handleFirmarAsistencia = async () => {
    await Share.share({
      message: `Asistencia del docente ${docenteName} registrada con éxito para el período 2026.`,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Docente Activo: <Text style={styles.value}>{docenteName}</Text></Text>
        <Text style={styles.label}>Código de Registro: <Text style={styles.value}>{codigoRegistro}</Text></Text>
      </View>

      <CustomButton
        title="Firmar Asistencia"
        onPress={handleFirmarAsistencia}
        isDanger={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 24,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 12,
    fontWeight: '600',
  },
  value: {
    color: '#1e293b',
    fontWeight: 'bold',
  },
});