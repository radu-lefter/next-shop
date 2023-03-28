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
    quantity: cartItem.attributes.Quantity,
  };
}

const handleGetCart: NextApiHandler<CartItem[]> = async (req, res) => {
  const { jwt } = req.cookies;
  if (!jwt) {
    res.status(401).end();
    return;
  }
  try {
    const cartItems = await fetchJson(`${CMS_URL}/cart-items?populate=*`, {
      headers: { 'Authorization': `Bearer ${jwt}` },
    });
    res.status(200).json(cartItems.data.map(stripCartItem));
    //res.status(200).json(cartItems.data);
  } catch (err) {
    res.status(401).end();
  }
};

const handlePostCart: NextApiHandler = async (req, res) => {
  const { jwt } = req.cookies;
  if (!jwt) {
    res.status(401).end();
    return;
  }
  const { productId, quantity } = req.body;
  try {
    await fetchJson(`${CMS_URL}/cart-items`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ product: productId, quantity }),
    });
    res.status(200).json({});
  } catch (err) {
    res.status(401).end();
  }
};

const handleCart: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      return handleGetCart(req, res);
    case 'POST':
      return handlePostCart(req, res);
    default:
      res.status(405).end();
  }
};

export default handleCart;