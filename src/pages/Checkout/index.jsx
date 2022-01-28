import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import "./style.css";
import IconApple from "../../assets/png/apple.png";

const Checkout = (props) => {
  const cart = props.cart;
  let navigation = useNavigate();
  const [tip, setTip] = useState(0);
  const [tipAmount, setTipAmount] = useState(parseFloat(0.0));
  const [subAmount, setSubAmount] = useState(parseFloat(0.0));
  const [amountBill, setAmountBill] = useState(parseFloat(0.0));
  const [tax, setTax] = useState(0.0);

  //Sub 1% of custom tip
  const subValueTip = () => {
    if (tip - 1 >= 0) {
      setTip(tip - 1);
    }
  };

  //Add 1% of custom tip
  const addValueTip = () => {
    if (tip + 1 <= 100) {
      setTip(tip + 1);
    }
  };

  useEffect(() => {
    //If cart is empty back to menu
    if(cart.length === 0) { navigation('/') }

    //Calc amount of items in cart without tax and tip
    const calculateTotalAmount = async () => {
      let amount = 0.0;
      for (let item of cart) {
        amount += item.amount;
      }
      setSubAmount(amount.toFixed(2));
      return amount.toFixed(2);
    };
    calculateTotalAmount().then((amount) => {

      //Add tax to amount
      const taxValue = (amount / 100) * 13.63;
      setTax(taxValue.toFixed(2));
      const amountBill = parseFloat(amount) + parseFloat(taxValue);
      setAmountBill(amountBill.toFixed(2));
    });
  }, []);

  //Change the tip amount and add to bill amount
  useEffect(() => {
    const tipActivated = document.querySelector(`.value${tip}`);
    const allTipsButtons = document.querySelectorAll(".tip");
    const buttonTipOther = document.querySelector(".other");

    allTipsButtons.forEach((button) => {
      button.classList.remove("activated");
    });
    if (tipActivated) {
      tipActivated.classList.add("activated");
    } else {
      const divInput = document.querySelector(".other-tips");
      buttonTipOther.classList.add("activated");
      divInput.classList.remove("hidden");
    }

    if (tip >= 0) {
      const tipAmount = (subAmount / 100) * tip;
      setTipAmount(tipAmount.toFixed(2));
      const amountBillTmp = parseFloat(subAmount) + parseFloat(tipAmount);
      setAmountBill(amountBillTmp.toFixed(2));
    }
  }, [tip]);

  return (
    <div className="checkout-container">
      <div className="content-details">
        <div className="detail-button" onClick={props.showDetailsAndHidden}>
          <h3>order breakdown</h3>
          <span className="button-expand"></span>
          <span className="button-collapse hidden"></span>
        </div>
        <div className="order-detail-description hidden">
          {cart.map((item, index) => {
            return (
              <span className="order-item" key={index}>
                <span className="quantity-product">
                  {item.quantity}x {item.product.name}
                </span>
                <span className="amount-value-item">£{item.amount}</span>
              </span>
            );
          })}
        </div>
      </div>
      <div className="content-tip">
        <b>Leave a tip:</b>
        <div className="options-tip">
          <div className="tip value0" onClick={() => setTip(0)}>
            Not now
          </div>
          <div className="tip value18" onClick={() => setTip(18)}>
            18%
          </div>
          <div className="tip value20" onClick={() => setTip(20)}>
            20%
          </div>
          <div className="tip value25" onClick={() => setTip(25)}>
            25%
          </div>
          <div className="tip other" onClick={() => setTip(5)}>
            Other
          </div>
        </div>
        <div className="other-tips hidden">
          <span className="minus" onClick={subValueTip}></span>
          <div className="quantity">
            <span className="other-tip">{tip}%</span>
          </div>
          <span className="plus" onClick={addValueTip}></span>
          <span className="alert-error hidden">Invalid value!</span>
        </div>
        <p>100% of your tip goes to your server 😁</p>
      </div>
      <div className="content-bill">
        <div className="bill-items">
          <div className="bill-item">
            <span className="title-item">Sub total:</span>
            <span className="value-item">£{subAmount}</span>
          </div>
          <div className="bill-item">
            <span className="title-item">Tax:</span>
            <span className="value-item">£{tax}</span>
          </div>
          <div className="bill-item">
            <span className="title-item">Tip:</span>
            <span className="value-item">£{tipAmount}</span>
          </div>
          <div className="bill-total">
            <span className="title-item">Total:</span>
            <span className="value-item">£{amountBill}</span>
          </div>
        </div>
      </div>
      <div className="content-checkout-buttons">
        <div className="checkout-button apple" onClick={() => navigation('/chekoutdone')}>
          Pay with{" "}
          <img src={IconApple} alt="" className="checkout-icon-apple" />
          Pay
        </div>
        <div className="checkout-button card" onClick={() => navigation('/chekoutdone')}>Or pay by card</div>
      </div>
    </div>
  );
};

export default Checkout;
