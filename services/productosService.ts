import axios from "axios";
import type { Producto, ProductoApi } from "../types/productos-types";
import { mapearProducto } from "../mappers/producto-mappers";

const api = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 15000,
});

export async function obtenerProductos(): Promise<Producto[]> {
  const respuesta = await api.get<ProductoApi[]>("/products");

  return respuesta.data.map(mapearProducto);
}

export async function obtenerProducto(id: number): Promise<Producto> {
  const respuesta = await api.get<ProductoApi | null>(`/products/${id}`);

  if (!respuesta.data) {
    throw new Error("Producto no encontrado");
  }

  return mapearProducto(respuesta.data);
}
