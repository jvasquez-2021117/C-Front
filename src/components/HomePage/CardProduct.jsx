import axios from 'axios';
import React, { useState, useEffect, useContext }from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Index';
import '../CSS/cardProduct.css'
import { SellModal } from '../Modals/SellModal';

export const CardProduct = ({ _id, image, user, title, price, quantity, image2, modal, email, getProducts }) => {

  const [img, setImg] = useState('');
  const { loggedIn, dataUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [titleUser, setTitleUser] = useState('');
  const [viewBtnBuy, setViewBtnBuy] = useState(modal);


  const [showModalSell, setShowModalSell] = useState(false);

    const handleOpenSellModal = () => {
      if(!loggedIn) {
        navigate('/login');
        Swal.fire({
          icon: 'info',
          title: 'Inicia sesion para poder comprar'
      });
      }
      setShowModalSell(true);
    }
    const handleCloseSellModal = () => {
        setShowModalSell(false);
    }

  const getImage = async ()=> {
    try{
      const { data } = await axios(`https://api-c-roman.onrender.com/publication/get-image/${image}`, {
        responseType: 'blob'
      });
      const imageURL = URL.createObjectURL(data);
      setImg(imageURL);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    if (image === undefined) {
    } else {
        getImage();
    }
    if(email == dataUser.email){
      setTitleUser('Tu publicación');
      setViewBtnBuy(true);
    }else{
      setTitleUser(user)
    }
}, [image]);

  return (
    <>
    
          
            <div className='card__product'>
              <p>{titleUser}</p>
              <img src={img || image2} alt="imagen celular"/>
              <h3>Q{price}.00</h3>
              <div className='name__product__container'>
                <p><b>{title}</b></p>
              </div>
              <p>Unidades: {quantity}</p>
              <button onClick={handleOpenSellModal} className='btn__buy' style={ viewBtnBuy ? { display: 'none' } : {}}>Comprar</button>
            </div>
            <SellModal
            id={_id}
            isOpen={showModalSell}
            onClose={handleCloseSellModal}
            image={image}
            title={title}
            quantity={quantity}
            price={price}
            modal={true}
            getProducts={getProducts}
        ></SellModal>
    </>
  )
}
