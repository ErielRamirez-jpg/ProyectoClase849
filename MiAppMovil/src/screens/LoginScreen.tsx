import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import ScreenWrapper from "../components/ScreenWrapper";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { i18n } from "../contexts/LanguageContext";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("mjsalinas@unitec.edu");
  const [password, setPassword] = useState("");

  const { login, loginWithGoogle } = useAuth();

  const handleLogin = () => {
    try {
      login(email, password);
      navigation.navigate("MainTabs");
    } catch (error) {
      console.log(error);
    }
  };

  // Función que dispara el flujo web de Google
  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();

    } catch (error) {
      console.log("Error al presionar el botón de Google:", error);
    }
  };

  return (
    <ScreenWrapper>
      <CustomInput
        type="email"
        placeholder="Ingresa tu correo"
        value={email}
        onChange={setEmail}
      />

      <CustomInput
        type="password"
        placeholder="Ingresa tu contraseña"
        value={password}
        onChange={setPassword}
      />

      <CustomButton title={i18n.t("signIn")} onPress={handleLogin} />


      <CustomButton 
        title="Continuar con Google" 
        variant="tertiary" 
        onPress={handleGoogleLogin} 
      />

      <CustomButton 
        title="¿No tienes cuenta? Regístrate" 
        variant="secondary"
        onPress={() => navigation.navigate("Register")} 
      />
    </ScreenWrapper>
  );
}