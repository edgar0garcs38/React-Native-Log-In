import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import CustomButton from '../components/CustomButton';
import { auth } from '../config/firebaseconfig';

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        navigation.replace('Ingreso');
      }
    });
    return unsubscribe;
  }, [navigation]);

  const handleCerrarSesion = async () => {
    try {
      await signOut(auth);
    } catch {
      Alert.alert('Error', 'No se pudo cerrar sesión.');
    }
  };

  const nombre = user?.displayName || user?.email || 'Usuario';

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Perfil</Text>
        <Text style={styles.label}>Usuario conectado</Text>
        <Text style={styles.value}>{nombre}</Text>
      </View>

      <CustomButton
        title="Cerrar sesión"
        onPress={handleCerrarSesion}
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
    borderRadius: 8,
    padding: 24,
    width: '100%',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    color: '#1e293b',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 18,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 8,
    fontWeight: '600',
    textAlign: 'center',
  },
  value: {
    color: '#1e293b',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});
