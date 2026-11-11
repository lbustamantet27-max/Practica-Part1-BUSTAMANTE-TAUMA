export interface ProductoApi {
  id: number;
  title: string;
  image: string;
  price: number;
  category: string;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface Producto {
  id: number;
  nombre: string;
  imagenUrl: string;
  precio: number;
  categoria: string;
  descripcion: string;
}

