import React, { useState, useRef, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Catalog from "./pages/Catalog";
import Cart from "./pages/Cart";
import ThankYouPage from "./pages/ThankYouPage";

const AppRoutes = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const checkoutItems = useRef(null); 

  const handleAddToCart = (product, quantity) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id);
      if (itemExists) {
        toast.info(`Quantidade atualizada no carrinho: ${product.name}`);
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        toast.success(`${product.name} adicionado ao carrinho!`);
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const handleUpdateCart = (product, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === product.id ? { ...item, quantity: +quantity } : item
      )
    );
    toast.info(`Quantidade atualizada: ${product.name}`);
  };

  const handleRemoveFromCart = (product) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== product.id)
    );
    toast.error(`${product.name} removido do carrinho.`);
  };

  const clearCartAndNavigate = (items) => {
    checkoutItems.current = items;
    setCartItems([]); // Limpa o carrinho
  };

  useEffect(() => {
    if (checkoutItems.current && cartItems.length === 0) {
      navigate("/thank-you", {
        state: { cartItems: checkoutItems.current },
      });
      checkoutItems.current = null;
    }
  }, [cartItems, navigate]);

  return (
    <>
      <nav>
        <Link to="/">Catálogo</Link>
        <Link to="/cart">Carrinho</Link>
      </nav>
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={<Catalog onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                setCartItems={setCartItems}
                onUpdateCart={handleUpdateCart}
                onRemoveFromCart={handleRemoveFromCart}
                clearCart={clearCartAndNavigate}
              />
            }
          />
          <Route
            path="/thank-you"
            element={<ThankYouPage clearCart={() => {}} />}
          />
        </Routes>
      </div>
      <ToastContainer />
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default App;
