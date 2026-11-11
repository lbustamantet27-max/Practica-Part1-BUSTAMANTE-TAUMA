import "../global.css";

import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#1d4ed8" },
        headerTintColor: "#ffffff",
        contentStyle: { backgroundColor: "#f1f5f9" },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Catálogo de productos" }} />

      <Stack.Screen
        name="producto/[id]"
        options={{ title: "Detalle del producto" }}
      />
    </Stack>
  );
}
