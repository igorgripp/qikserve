import React, {useEffect} from 'react';
import './style.css';
import Logo from '../../assets/png/QS_WHITE_Logo_BLUE_Ranged.png';

const CheckoutDone = () =>{

  useEffect(() => {
    const header = document.querySelector('.header');
    header.classList.add('hidden');
  }, [])

  return(
    <>
      <div className="end-message">
        <h1>
          Thank you,
        </h1>
        <img src={Logo} alt="" className="end-message-logo" />
        <h1>Come back soon!</h1>
      </div>
    </>
  );

}

export default CheckoutDone;