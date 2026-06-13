import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://vmsmiobcneudojputsnj.supabase.co';
// Mantén aquí tu clave ANON real de Supabase
const supabaseAnonKey = 'TU_SUPABASE_ANON_KEY_AQUI'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage, // Permite guardar los tokens de Google de forma segura en el celular
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // Evita conflictos con redirecciones web en entornos móviles
  },
});