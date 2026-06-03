import React from 'react';
import {
  View, Text, Image, StyleSheet, ScrollView,
  TextInput, Pressable, Alert, Dimensions,
} from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const { width } = Dimensions.get('window');

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Correo inválido').required('Campo obligatorio'),
  password: Yup.string().min(4, 'Mínimo 4 caracteres').required('Campo obligatorio'),
});

export default function LoginScreen({ navigation }) {
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: () => {
      navigation.navigate('Profile', {
        docenteName: 'Edgar Garces',
        codigoRegistro: 2026104,
      });
    },
  });

  return (
    <ScrollView>
      <Image
        source={require('../assets/logo.png')}
        style={{ width: width * 0.6, height: width * 0.4, alignSelf: 'center', marginTop: 40 }}
        resizeMode="contain"
      />

      <View style={styles.card}>

        <TextInput
          placeholder="Correo"
          value={formik.values.email}
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
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
          onPress={() => {
            if (!formik.values.email.trim() || !formik.values.password.trim()) {
              Alert.alert('Error', 'Rellena todos los campos.');
              return;
            }
            formik.handleSubmit();
          }}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
          <Text style={styles.buttonText}>Ingresar al Sistema</Text>
        </Pressable>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    padding: 12,
    marginBottom: 6,
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
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});