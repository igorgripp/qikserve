import React, { useState, useEffect } from "react";
import "./style.css";
import Promotion from '../Promotion';

const ModalToAddOrder = (props) => {
  const product = props.product;
  
  const [orderPrice, setOrderPrice] = useState();
  const [quantity, setQuantity] = useState(1);

  const addOneUnit = () =>{
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
  }

  const removeOneUnit = () => {
    if(quantity > 1){
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
    }
  }

  useEffect(() => {}, [orderPrice]);
  useEffect(() => {
    //Verify the promotions coonditions
    const verifyPromotionCondition = async(product, promotion) =>{

      let amount = 0.00;
      const required_qty = promotion.required_qty;
      const originalPrice = product.floatPrice;
      const promotionPrice = promotion.floatPrice;

      switch(promotion.type){
        case "QTY_BASED_PRICE_OVERRIDE":
        if(quantity/required_qty >= 1){
          amount = promotionPrice * (parseInt(quantity/required_qty));
          if(quantity%required_qty === 1){
            amount += originalPrice * (quantity%required_qty);
          }
        }else{
          amount = originalPrice;
        }
          break;
        case "BUY_X_GET_Y_FREE":
          if(promotion.required_qty > quantity) setQuantity(promotion.required_qty);
          if(quantity/required_qty >= 1){
            amount = originalPrice * (parseInt(quantity/required_qty));
            if(quantity%required_qty === 1){
              amount += originalPrice * (quantity%required_qty);
            }
          }
          else{
            amount = originalPrice;
          }
          break;
        case "FLAT_PERCENT":
          amount = quantity * product.priceWithDiscont;
          break;
      }
      return amount;
      
    }
    
    if(product.promotions.length > 0) {
      for( let promotion of product.promotions)
      {
        verifyPromotionCondition(product, promotion)
          .then(res => {
            setOrderPrice(res.toFixed(2));
          });
      }
    }else{
      setOrderPrice((quantity * product.floatPrice).toFixed(2));
    }

  }, [quantity]);

  return (
    <>
      <div className="container-modal">
        <div className="content-modal">
          <div className="item-picture">
            <img
              src={require(`../../assets/jpg/${product.id}-modal.jpg`)}
              alt={product.name}
              className="modal-picture"
            />
            <div className="close-modal-button" onClick={props.cancelProductToOrder}></div>
          </div>
          <div className="item-resume">
            <h1>{product.name}</h1>
            <div className="promotions-content">
              {product.promotions.map((promotion, index) => {
                return <Promotion promotion={promotion} key={index} />;
              })}
            </div>
          </div>
          <div className="quantity-choose">
            <h3>Quantity:</h3>
            <div className="choose">
              <span className="minus" onClick={removeOneUnit}></span>
              <div className="quantity">
                <h1>{quantity}</h1>
              </div>
              <span className="plus" onClick={addOneUnit}></span>
            </div>
          </div>
          <div className="button-add-order"onClick={props.addProductToCart(product, quantity, orderPrice)}>
            <p>Add to order: £{orderPrice}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalToAddOrder;
