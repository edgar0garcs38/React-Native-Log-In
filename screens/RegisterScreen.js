import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
} from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { auth } from '../config/firebaseconfig';

const { width } = Dimensions.get('window');

const validationSchema = Yup.object().shape({
  nombre: Yup.string().min(2, 'Mínimo 2 caracteres').required('Campo obligatorio'),
  email: Yup.string().email('Correo inválido').required('Campo obligatorio'),
  password: Yup.string().min(6, 'Mínimo 6 caracteres').required('Campo obligatorio'),
});

export default function RegisterScreen({ navigation }) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: { nombre: '', email: '', password: '' },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const credential = await createUserWithEmailAndPassword(
          auth,
          values.email.trim(),
          values.password,
        );
        await updateProfile(credential.user, {
          displayName: values.nombre.trim(),
        });
        navigation.replace('Perfil');
      } catch (error) {
        Alert.alert('Error', getFirebaseMessage(error.code));
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.card}>
        <Text style={styles.title}>Crear cuenta</Text>

        <TextInput
          placeholder="Nombre"
          value={formik.values.nombre}
          onChangeText={formik.handleChange('nombre')}
          onBlur={formik.handleBlur('nombre')}
          style={styles.input}
        />
        {formik.touched.nombre && formik.errors.nombre && (
          <Text style={styles.error}>{formik.errors.nombre}</Text>
        )}

        <TextInput
          placeholder="Correo"
          value={formik.values.email}
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />
        {formik.touched.email && formik.errors.email && (
          <Text style={styles.error}>{formik.errors.email}</Text>
        )}

        <TextInput
          placeholder="Contraseña"
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          secureTextEntry
          style={styles.input}
        />
        {formik.touched.password && formik.errors.password && (
          <Text style={styles.error}>{formik.errors.password}</Text>
        )}

        <Pressable
          onPress={formik.handleSubmit}
          disabled={loading}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
            loading && styles.buttonDisabled,
          ]}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>Registrarme</Text>
          )}
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Ingreso')} style={styles.linkButton}>
          <Text style={styles.linkText}>Ya tengo una cuenta</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function getFirebaseMessage(code) {
  if (code === 'auth/email-already-in-use') {
    return 'Este correo ya está registrado.';
  }
  if (code === 'auth/invalid-email') {
    return 'El correo no es válido.';
  }
  if (code === 'auth/weak-password') {
    return 'La contraseña debe tener al menos 6 caracteres.';
  }
  return 'No se pudo crear la cuenta.';
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8fafc',
    padding: 20,
  },
  logo: {
    width: width * 0.6,
    height: width * 0.35,
    alignSelf: 'center',
    marginTop: 32,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    color: '#1e293b',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 18,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    padding: 12,
    marginBottom: 6,
    backgroundColor: '#ffffff',
  },
  error: {
    color: '#dc2626',
    fontSize: 12,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 10,
    minHeight: 48,
  },
  buttonPressed: {
    opacity: 0.75,
  },
  buttonDisabled: {
    opacity: 0.65,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  linkButton: {
    alignItems: 'center',
    marginTop: 16,
    padding: 8,
  },
  linkText: {
    color: '#2563eb',
    fontWeight: '600',
  },
});
