import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ThankYouPage = ({ clearCart }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const items = location.state?.cartItems ?? [];

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    clearCart(); 
  }, [clearCart]);

  return (
    <div className="thank-you-page">
      <h1>Obrigado por sua compra!</h1>
      <p>Seu pedido foi concluído com sucesso.</p>
      {items.length > 0 ? (
        <>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                {item.name} - {item.quantity} x R$ {item.price.toFixed(2)}
              </li>
            ))}
          </ul>
          <p>Total: R$ {totalPrice.toFixed(2)}</p>
        </>
      ) : (
        <p>Nenhum item encontrado.</p>
      )}
      <button onClick={() => navigate("/")}>Voltar ao catálogo</button>
    </div>
  );
};

export default ThankYouPage;
