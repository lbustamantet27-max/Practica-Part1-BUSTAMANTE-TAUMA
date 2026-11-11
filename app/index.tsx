import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { obtenerProductos } from "../services/productosService";
import type { Producto } from "../types/productos-types";

export default function ListaProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    let activo = true;

    async function cargar() {
      setCargando(true);
      setError("");

      try {
        const datos = await obtenerProductos();

        if (activo) {
          setProductos(datos);
        }
      } catch {
        if (activo) {
          setError("No se pudieron cargar los productos.");
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    }

    void cargar();

    return () => {
      activo = false;
    };
  }, [intento]);

  if (cargando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#1d4ed8" />
        <Text>Cargando productos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centro}>
        <Text style={styles.error}>{error}</Text>
        <Button
          title="Reintentar"
          onPress={() => setIntento((actual) => actual + 1)}
        />
      </View>
    );
  }

  return (
    <FlatList
      style={styles.lista}
      data={productos}
      keyExtractor={(producto) => producto.id.toString()}
      contentContainerStyle={styles.contenido}
      ListEmptyComponent={<Text>No hay productos disponibles.</Text>}
      renderItem={({ item }) => (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Ver detalle de ${item.nombre}`}
          onPress={() =>
            router.push({
              pathname: "/producto/[id]",
              params: { id: item.id.toString() },
            })
          }
          style={({ pressed }) => [
            styles.tarjeta,
            pressed && styles.presionada,
          ]}
        >
          <Image
            source={{ uri: item.imagenUrl }}
            style={styles.imagen}
            resizeMode="contain"
            accessibilityLabel={item.nombre}
          />

          <Text style={styles.nombre}>{item.nombre}</Text>

          <Text style={styles.precio}>USD {item.precio.toFixed(2)}</Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  lista: {
    flex: 1,
  },
  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    gap: 16,
  },
  error: {
    color: "#b91c1c",
    textAlign: "center",
    fontSize: 16,
  },
  contenido: {
    padding: 16,
    paddingBottom: 32,
    gap: 16,
  },
  tarjeta: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    gap: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  presionada: {
    opacity: 0.7,
  },
  imagen: {
    width: "100%",
    height: 180,
  },
  nombre: {
    fontSize: 17,
    fontWeight: "600",
    color: "#0f172a",
  },
  precio: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1d4ed8",
  },
});
