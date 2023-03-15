import { fetchJson } from './api';

const { CMS_URL, CMS_IMG_URL } = process.env;

export interface Product {
    id: number;
    title: string;
    description: string;
    price: string;
    pictureUrl: string;
  }
  
  function stripProduct(product: any): Product {
    return {
      id: product.id,
      title: product.attributes.title,
      description: product.attributes.description,
      price: '£' + product.attributes.price.toFixed(2),
      pictureUrl: CMS_IMG_URL + product.attributes.image.data.attributes.url,
    };
  }

  export async function getProduct(id: string): Promise<Product> {
    const product = await fetchJson(`${CMS_URL}/products/${id}?populate=*`);
    return stripProduct(product.data);
  }
  
  export async function getProducts(): Promise<Product[]> {
    const products = await fetchJson(`${CMS_URL}/products?populate=*`);
    return products.data.map(stripProduct);
  }