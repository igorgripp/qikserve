import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import "./style.css";
import Compass from "../../assets/png/compass.png";
import Receipt from "../../assets/png/receipt.png";

const Order = (props) => {

  const cart = props.cart;
  const [totalAmount, setTotalAmount] = useState(0.00);
  let navigation = useNavigate();

  useEffect(() => {
    //If cart is empty back to menu
    if(cart.length === 0) { navigation('/') }

    //calc the amount without tax and tip
    const calculateTotalAmount = async() =>{
      
      let amount = 0.00;
      for(let item of cart){
        amount += item.amount;
      }
      setTotalAmount(amount.toFixed(2));
    }

    calculateTotalAmount();
  },[]);

  return (
    <div className="order-container">
      <div className="order-message">
        <span className="icon-check"></span>
        <h1>Thank for your order!</h1>
        <p>We're getting it ready 💪</p>
      </div>
      <div className="content-details">
        <div className="detail-button" onClick={props.showDetailsAndHidden}>
          <h3>Your Order Detail</h3>
          <span className="button-expand"  ></span>
          <span className="button-collapse hidden" ></span>
        </div>
        <div className="order-detail-description hidden">
          {cart.map((item, index)=>{
            return <span className="order-item" key={index}><span className="quantity-product">{item.quantity}x {item.product.name}</span><span className="amount-value-item">£{item.amount}</span></span>
          })}
        </div>
      </div>
      <div className="button-options" onClick={() =>{navigation('/')}}>
        <img src={Compass} alt="compass" className="order-icon" />
        <div className="button-info">
          <h2>Browse the menu</h2>
        </div>
      </div>
      <div className="button-options" onClick={() => navigation('/checkout')}>
        <img src={Receipt} alt="receipt" className="order-icon" />
        <div className="button-info">
          <h2>View & pay check</h2>
          <p>Total: <b>£{totalAmount}</b></p>
        </div>
      </div>
    </div>
  );
};

export default Order;
