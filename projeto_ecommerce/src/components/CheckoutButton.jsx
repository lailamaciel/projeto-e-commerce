import React from "react";
import { toast } from "react-toastify";

const CheckoutButton = ({ cartItems, clearCart }) => {
  const handleCheckout = () => {
    if (cartItems.length > 0) {
      toast.success("Compra finalizada com sucesso!");
      clearCart(cartItems); 
    } else {
      toast.error("Seu carrinho está vazio.");
    }
  };

  return <button onClick={handleCheckout}>Finalizar Compra</button>;
};

export default CheckoutButton;
