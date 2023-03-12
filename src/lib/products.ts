export interface Product {
    id: number;
    title: string;
  }
  
  function stripProduct(product: any): Product {
    return {
      id: product.id,
      title: product.attributes.title,
    };
  }
  
  export async function getProducts(): Promise<Product[]> {
    const response = await fetch('http://localhost:1337/api/products');
    const products = await response.json();
    return products.data.map(stripProduct);
  }