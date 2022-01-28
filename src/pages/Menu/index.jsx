import React from "react";
import Product from "../../components/Product";

import "./style.css";

const Menu = (props) => {
  const products = props.products;

  return (
    <>
      <div className="content-items">
        {/* For to construct menu's items  */}
        {products.map((product, index) => {
          return <Product product={product} key={index} getProductToOrder={props.getProductToOrder} />;
        })}
      </div>
    </>
  );
};

export default Menu;
