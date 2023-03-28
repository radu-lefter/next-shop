import { NextApiHandler } from 'next';
import { fetchJson } from '../../lib/api';
import { CartItem } from '../../lib/cart';

const { CMS_URL } = process.env;

function stripCartItem(cartItem: any): CartItem {
  return {
    id: cartItem.id,
    product: {
      id: cartItem.attributes.products.data[0].id,
      title: cartItem.attributes.products.data[0].attributes.title,
      price: cartItem.attributes.products.data[0].attributes.price,
    },
    quantity: cartItem.quantity,
  };
}

const handleCart: NextApiHandler<CartItem[]> = async (req, res) => {
  const { jwt } = req.cookies;
  if (!jwt) {
    res.status(401).end();
    return;
  }
  try {
    const cartItems = await fetchJson(`${CMS_URL}/cart-items`, {
      headers: { 'Authorization': `Bearer ${jwt}` },
    });
    res.status(200).json(cartItems.map(stripCartItem));
  } catch (err) {
    res.status(401).end();
  }
};

export default handleCart;