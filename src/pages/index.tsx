// Option 1b: fetch products on the server side (in getStaticProps)
// but with Incremental Static Regeneration (in getStaticProps)
import { GetStaticProps } from 'next';
import Page from '../components/Page';
import { getProducts, Product } from '../lib/products';
import ProductCard from '../components/ProductCard';

interface HomePageProps {
  products: Product[];
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  console.log('[HomePage] getStaticProps()');
  const products = await getProducts();
  return {
    props: { products },
    revalidate: parseInt(process.env.REVALIDATE_SECONDS!),
  };
};

const HomePage: React.FC<HomePageProps> = ({ products }) => {
  console.log('[HomePage] render:', products);
  return (
    <Page title="Vegetables">
      <ul className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </Page>
  );
};

export default HomePage;