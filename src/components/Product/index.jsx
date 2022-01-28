import React, { useEffect, useState } from "react";
import "./style.css";
import Loading from "../Loading";
import Promotion from "../../components/Promotion";

const Product = (props) => {
  const [loading, setLoading] = useState(true);
  const product = props.product;

  //Calc the price of product that have flat percent promotion
  const getFlatPrice = (productPrice, amount) => {
    const flatPrice = productPrice - (productPrice / 100) * amount;
    return parseFloat(flatPrice.toFixed(2));
  };

  //Verify promotions and set HTML to show the price different
  const verifyPromotionType = (product, promotion) => {
    if (promotion.type === "FLAT_PERCENT") {
      product.priceWithDiscont = getFlatPrice(product.floatPrice, promotion.amount);
      return <span className="flat-price">£{product.priceWithDiscont}</span>;
    }
  };

  useEffect(() => {

    //Format all Product and Promotions prices to ££.¢¢
    const formattedPrices = async () => {
      product.floatPrice = parseFloat(`${product.price.toString().slice(0, -2)}.${product.price.toString().slice(-2)}`);

      for(let promotion of product.promotions){
        if(promotion.price){
          promotion.floatPrice = parseFloat(`${promotion.price.toString().slice(0, -2)}.${promotion.price.toString().slice(-2)}`);
        }
      }

    };
    formattedPrices().then(() => {
      //When all done set off the loading screen
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="item" onClick={props.getProductToOrder(product)}>
      <div className="description">
        <h1>{product.name}</h1>
        <div className="promotions-content">
          {product.promotions.map((promotion, index) => {
            return <Promotion promotion={promotion} key={index} />;
          })}
        </div>
        <span className="price">
          £{product.floatPrice}
          {product.promotions.map((promotion) => {
            return verifyPromotionType(product, promotion);
          })}
        </span>
      </div>
      <div className="picture-item">
        <img
          src={require(`../../assets/jpg/${product.id}.jpg`)}
          alt={product.name}
          className="picture"
        />
      </div>
    </div>
  );
};

export default Product;
