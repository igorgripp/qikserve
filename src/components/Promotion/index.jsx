import React from "react";

const Promotion = (props) => {
  const promotion = props.promotion;
  const index = props.index;

  return (
    <>
      <div className={`promotion ${promotion.type}`} key={index}>
        {promotion.type === "QTY_BASED_PRICE_OVERRIDE" &&
          `${promotion.required_qty} units for ${promotion.floatPrice}`}
        {promotion.type === "BUY_X_GET_Y_FREE" && "Buy 2 get 1 FREE"}
        {promotion.type === "FLAT_PERCENT" && `${promotion.amount}% OFF`}
      </div>
    </>
  );
};

export default Promotion;
