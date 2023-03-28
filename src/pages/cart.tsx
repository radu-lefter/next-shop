import Page from "../components/Page";
import { useQuery } from "react-query";
import { fetchJson } from "../lib/api";
import { CartItem } from "../lib/cart";

interface CartTableProps {
  cartItems: CartItem[];
}

const CartTable: React.FC<CartTableProps> = ({ cartItems }) => {
  return (
    <table>
      <thead>
        <tr>
          <th className="px-4 py-2">Product</th>
          <th className="px-4 py-2">Price</th>
          <th className="px-4 py-2">Quantity</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((cartItem) => (
          <tr key={cartItem.id}>
            <td className="px-4 py-2">{cartItem.product.title}</td>
            <td className="px-4 py-2 text-right">{cartItem.product.price}</td>
            <td className="px-4 py-2 text-right">{cartItem.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const CartPage: React.FC = () => {
  const query = useQuery<CartItem[]>("cartItems", () => fetchJson("/api/cart"));
  const cartItems = query.data;

  console.log("[CartPage] cartItems:", cartItems);
  return (
    <Page title="Cart">{cartItems && <CartTable cartItems={cartItems} />}</Page>
  );
};

export default CartPage;
