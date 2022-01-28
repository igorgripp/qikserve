import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Loading from "./components/Loading";
import Header from "./components/Header";
import Menu from "./pages/Menu";
import ModalToAddOrder from "./components/ModalToAddOrder";
import Order from "./pages/Order";
import Checkout from "./pages/Checkout";
import CheckoutDone from "./pages/Checkout-done";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [productToOrder, setProductToOrder] = useState();
  const [cart, setCart] = useState([]);
  const navigation = useNavigate();

  //Get the chosen product on Menu to send to Modal
  const getProductToOrder = product => () =>{
    setProductToOrder(product);
  }

  //Cancel the product from order
  const cancelProductToOrder = () => {
    setProductToOrder();
  }

  //Add Product, Quantity and Amount of the order in cart
  const addProductToCart = (product, quantity, amount) => () => {
    const order = {
      product: product,
      quantity: quantity,
      amount: parseFloat(amount)
    }

    cart.push(order);
    //Set empty product to Order
    setProductToOrder();
    navigation('/order');

  }

  //Show and Hide de detail box of the order
  const showDetailsAndHidden = () =>{
    const detail = document.querySelector('.order-detail-description');
    const buttonExpand = document.querySelector('.button-expand');
    const buttonCollapse = document.querySelector('.button-collapse');

    if(detail.classList[1] === "hidden"){
      detail.classList.remove('hidden');
      buttonExpand.classList.add('hidden');
      buttonCollapse.classList.remove('hidden');
    }else{
      detail.classList.add('hidden');
    buttonExpand.classList.remove('hidden');
    buttonCollapse.classList.add('hidden');
    }
  }

  useEffect(() => {

  }, [productToOrder])

  useEffect(() => {

    //Get All Product from API
    async function getAllProducts() {
      const productsWithPromotions = [];
      const allProducts = await axios
        .get("http://localhost:8081/products")
        .then((res) => {
          return res.data;
        })
        .catch((erros) => {
          console.error(erros);
        });

      //This for is to get all promotions by products
      for (let product of allProducts) {
        const productWithPromotions = await axios
          .get(`http://localhost:8081/products/${product.id}`)
          .then((res) => {
            return res.data;
          });
        productsWithPromotions.push(productWithPromotions);
      }
      setProducts(productsWithPromotions);
    }
    getAllProducts().then(() => {
      //When all products have all promotion set off the loading screen
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading />;
  else {
    return (
      <div className="App">
        <Header  hasItems={cart.length ? true : false}/>
          <Routes>
            <Route exact path="/" element={<Menu products={products} getProductToOrder={getProductToOrder} />} />
            <Route path="/order" element={<Order cart={cart} showDetailsAndHidden={showDetailsAndHidden} />} />
            <Route path="/checkout" element={<Checkout cart={cart} showDetailsAndHidden={showDetailsAndHidden} />} />
            <Route path="/chekoutdone" element={<CheckoutDone />} />
          </Routes>
        {productToOrder && <ModalToAddOrder product={productToOrder} cancelProductToOrder={cancelProductToOrder} addProductToCart={addProductToCart} />}
      </div>
    );
  }
}

export default App;
