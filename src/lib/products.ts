export interface Product {
    id: number;
    title: string;
    description: string;
  }
  
  function stripProduct(product: any): Product {
    return {
      id: product.id,
      title: product.attributes.title,
      description: product.attributes.description,
    };
  }

  export async function getProduct(id: string): Promise<Product> {
    const response = await fetch(`http://localhost:1337/api/products/${id}`);
    const product = await response.json();
    return stripProduct(product.data);
  }
  
  export async function getProducts(): Promise<Product[]> {
    const response = await fetch('http://localhost:1337/api/products');
    const products = await response.json();
    return products.data.map(stripProduct);
  }