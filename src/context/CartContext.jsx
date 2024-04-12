import { createContext, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("shoppify-cart")) || []
  );

  useEffect(() => {
    localStorage.setItem("shoppify-cart", JSON.stringify(cart));
  }, [cart]);

  const [counts, setCounts] = useState({});

  const handleRemoveCartItem = (id) => {
    let u_cart = cart.filter((el) => el.id !== id);
    setCart(u_cart);
    localStorage.setItem("shoppify-cart", JSON.stringify(u_cart));
    toast.error("item removed !");
  };

  const handleDec = (id) => {
    setCounts((prev) => ({ ...prev, [id]: (prev[id] || 1) - 1 }));
  };
  const handleInc = (id) => {
    setCounts((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  };

  const removeCartItems = () => {
    localStorage.removeItem("shoppify-cart");
    setCart([]);
    //window.localtion.href="/payment-success"
  };
 
  const totalBill = cart.reduce((total, el) => {
    const itemTotal = (counts[el.id] || 1) * el.price;
    return total + itemTotal;
  }, 0);

  return (
    <cartContext.Provider
      value={{
        cart,
        counts,
        handleRemoveCartItem,
        handleDec,
        handleInc,
        removeCartItems,
        totalBill
      }}
    >
      {children}
    </cartContext.Provider>
  );
}