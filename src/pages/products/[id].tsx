import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import Title from '../../components/Title';
import { getProduct, getProducts, Product } from '../../lib/products';

interface ProductPageParams extends ParsedUrlQuery {
  id: string;
}

interface ProductPageProps {
  product: Product;
}

export const getStaticPaths: GetStaticPaths<ProductPageParams> = async () => {
  const products = await getProducts();
  return {
    paths: products.map((product) => ({
      params: { id: product.id.toString() },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  ProductPageProps,
  ProductPageParams
> = async ({ params }) => {
  const id = params?.id;
  if (!id) {
    throw new Error('id not set');
  }
  try {
    const product = await getProduct(id);
    return {
      props: { product },
      revalidate: 5 * 60, // seconds
    };
  } catch {
    throw new Error('id not set');
  }
};

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>
      <main className="px-6 py-4">
        <Title>{product.title}</Title>
        <p>{product.description}</p>
      </main>
    </>
  );
};

export default ProductPage;
