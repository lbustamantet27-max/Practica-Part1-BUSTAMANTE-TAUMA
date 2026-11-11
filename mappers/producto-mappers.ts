import type { Producto, ProductoApi } from "../types/productos-types";

export function mapearProducto(producto: ProductoApi): Producto {
  return {
    id: producto.id,
    nombre: producto.title.trim(),
    imagenUrl: producto.image.trim(),
    precio: producto.price,
    descripcion: producto.description,
    categoria: producto.category,
  };
}
