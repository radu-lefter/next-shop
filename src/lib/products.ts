import { fetchJson } from './api';

const { CMS_URL } = process.env;

export interface Product {
    id: number;
    title: string;
    description: string;
    price: string;
  }
  
  function stripProduct(product: any): Product {
    return {
      id: product.id,
      title: product.attributes.title,
      description: product.attributes.description,
      price: '£' + product.attributes.price.toFixed(2),
    };
  }

  export async function getProduct(id: string): Promise<Product> {
    const product = await fetchJson(`${CMS_URL}/products/${id}`);
    return stripProduct(product.data);
  }
  
  export async function getProducts(): Promise<Product[]> {
    const products = await fetchJson(`${CMS_URL}/products`);
    return products.data.map(stripProduct);
  }