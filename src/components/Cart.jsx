import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeItems } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleRemoveItem = () => {
    dispatch(removeItems());
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Cart Items</h1>
        <span>{cartItems.length} Items</span>
      </div>

      {cartItems.map((item) => {
        return (
          <div className="cart-item" key={item.id}>
            <img
              className="cart-item-image"
              src={item.image}
              alt={item.title}
            />

            <div className="cart-item-info">
              <h4>{item.title}</h4>

              {item.description && <p>{item.description}</p>}
            </div>

            <span className="cart-item-price">₹{item.price}</span>
            <button onClick={handleRemoveItem}>Remove</button>
          </div>
        );
      })}

      {cartItems.length === 0 ? (
        <p className="cart-empty">Cart is Empty</p>
      ) : (
        <div className="cart-bottom">
          <h3 className="cart-total">Total - ₹{total}</h3>

          <button className="clear-cart-btn" onClick={handleClearCart}>
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
