import React from "react";
import CartItem from "../components/CartItem";
import CheckoutButton from "../components/CheckoutButton";

const Cart = ({
  cartItems,
  onUpdateCart,
  onRemoveFromCart,
  clearCart,
}) => {
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h1>Carrinho</h1>
      {cartItems.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateCart={onUpdateCart}
              onRemoveFromCart={onRemoveFromCart}
            />
          ))}
          <div className="total">
            <p>Total: R$ {totalPrice.toFixed(2)}</p>
            <CheckoutButton
              cartItems={cartItems}
              clearCart={clearCart}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
