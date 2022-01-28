import React from "react";
import {useNavigate } from "react-router-dom";
import "./style.css";
import Logo from "../../assets/png/QS_WHITE_Logo_BLUE_Ranged.png";
import IconShopping from "../../assets/png/shopping-bag.png";

const Header = (props) => {
  const hasItems = props.hasItems;
  let navigate = useNavigate();
  return (
    <>
      <div className="header">
        <img src={Logo} alt="logo" className="logo" onClick={() => {navigate('/')}} />
        <span className="icon-wrap" onClick={() => {navigate('/order')}}>
          <span className={`alert-items ${hasItems ? "" : "hidden"}`}></span>
          <img
            src={IconShopping}
            alt="icon-shopping"
            className="icon-shopping"
          />
        </span>
      </div>
    </>
  );
};

export default Header;
