import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { supabase } from '../services/supabaseClient';
import { useAuth } from '../contexts/AuthContext'; // <-- Importamos tu hook de autenticación

export default function RegisterScreen({ navigation }: any) {

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Traemos la función global de Google desde tu AuthContext
  const { loginWithGoogle } = useAuth();

  const handleRegister = async () => {

    if (!name.trim() || !phoneNumber.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Error', 'Todos los campos son obligatorios. Por favor, llénalos.');
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            full_name: name.trim(),
            phone: phoneNumber.trim(),
          }
        }
      });

      if (error) {
        Alert.alert('Error en el registro', error.message);
        return;
      }

      if (data.user) {
        Alert.alert('¡Éxito!', 'Usuario creado correctamente.');
        navigation.navigate('Login'); 
      }

    } catch (err) {
      Alert.alert('Error inesperado', 'Ocurrió un problema al conectar con el servidor.');
    }
  };

  // Modificamos la función para usar tu flujo centralizado
  const handleGoogleRegister = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      Alert.alert('Error', 'No se pudo iniciar el flujo de autenticación con Google.');
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <CustomInput
          placeholder="Nombre completo"
          value={name}
          onChange={setName}
        />

        <CustomInput
          placeholder="Número de teléfono"
          value={phoneNumber}
          onChange={setPhoneNumber}
          type="number" 
        />

        <CustomInput
          placeholder="Correo electrónico"
          value={email}
          onChange={setEmail}
          type="email"
        />

        <CustomInput
          placeholder="Contraseña"
          value={password}
          onChange={setPassword}
          type="password"
        />

        <CustomButton
          title="Registrarse"
          variant="primary"
          onPress={handleRegister}
        />

        <CustomButton
          title="Continuar con Google"
          variant="secondary" // Opción válida ("primary" | "secondary" | "tertiary")
          onPress={handleGoogleRegister}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 15,
  },
});