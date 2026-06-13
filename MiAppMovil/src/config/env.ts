export const env = {
  // Limpiamos la URL por si acaso quedó la ruta REST guardada en la caché de Expo
  supabaseUrl: (process.env.EXPO_PUBLIC_SUPABASE_URL || "")
    .replace("/rest/v1/", "")
    .replace(/\/$/, ""), // Remueve barras diagonales al final
    
  supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "",
};