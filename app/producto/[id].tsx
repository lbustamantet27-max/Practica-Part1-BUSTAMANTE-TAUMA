import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { obtenerProducto } from "../../services/productosService";
import type { Producto } from "../../types/productos-types";

export default function DetalleProducto() {
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const productoId = Number(Array.isArray(id) ? id[0] : id);
  const [producto, setProducto] = useState<Producto | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [intento, setIntento] = useState(0);
  const volver = () =>
    router.canGoBack() ? router.back() : router.replace("/");

  useEffect(() => {
    let activo = true;
    async function cargar() {
      setCargando(true);
      setError("");
      try {
        if (!Number.isInteger(productoId) || productoId <= 0)
          throw new Error("ID inválido");
        const datos = await obtenerProducto(productoId);
        if (activo) setProducto(datos);
      } catch {
        if (activo)
          setError(
            "No se pudo cargar el producto. Revisa la conexión o el ID.",
          );
      } finally {
        if (activo) setCargando(false);
      }
    }
    void cargar();
    return () => {
      activo = false;
    };
  }, [productoId, intento]);

  if (cargando)
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#1d4ed8" />
        <Text>Cargando producto...</Text>
      </View>
    );
  if (error || !producto)
    return (
      <View style={styles.centro}>
        <Text>{error || "Producto no encontrado"}</Text>
        <Button title="Reintentar" onPress={() => setIntento((v) => v + 1)} />
        <Button title="Volver a la lista" onPress={volver} />
      </View>
    );

  return (
    <ScrollView
      style={styles.pantalla}
      contentContainerStyle={styles.contenido}
    >
      <Image
        source={{ uri: producto.imagenUrl }}
        style={styles.imagen}
        resizeMode="contain"
        accessibilityLabel={producto.nombre}
      />
      <Text style={styles.nombre}>{producto.nombre}</Text>
      <Text style={styles.precio}>USD {producto.precio.toFixed(2)}</Text>
      <Text style={styles.etiqueta}>Categoría</Text>
      <Text>{producto.categoria}</Text>
      <Text style={styles.etiqueta}>Descripción</Text>
      <Text style={styles.descripcion}>{producto.descripcion}</Text>
      <Button title="Volver a la lista" onPress={volver} />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  pantalla: { flex: 1 },
  centro: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 16,
  },
  contenido: { padding: 20, paddingBottom: 40, gap: 14 },
  imagen: {
    width: "100%",
    height: 260,
    backgroundColor: "white",
    borderRadius: 12,
  },
  nombre: { fontSize: 22, fontWeight: "bold", color: "#0f172a" },
  precio: { fontSize: 24, fontWeight: "bold", color: "#1d4ed8" },
  etiqueta: { fontSize: 17, fontWeight: "600", marginTop: 8 },
  descripcion: { fontSize: 16, lineHeight: 24 },
});
