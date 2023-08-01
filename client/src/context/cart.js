import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./Auth";

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useState([]);

  const getCart = async (id) => {
    const { data } = await axios.get(`/api/v1/cart/get-cart/${id}`);

    let carts = data?.carts?.cartContents;
    if (carts) setCart(carts);
  };
  useEffect(() => {
    if (auth?.user?._id) getCart(auth?.user?._id);
    else {
      let existingCartItem = localStorage.getItem("cart");
      if (existingCartItem) setCart(JSON.parse(existingCartItem));
    }
  }, [auth]);
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
