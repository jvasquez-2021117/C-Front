import axios from 'axios';
import React, { useState, useEffect }from 'react'
import '../CSS/cardProductPreview.css'

export const CardProductPreview = ({ _id, image, user, title, price, quantity, image2 }) => {

  const [img, setImg] = useState('');

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
}, [image]);

  return (
    <>
    
          
            <div className='card__product_preview'>
              <img src={img || image2} alt="imagen celular"/>
              <h3>Q{price}.00</h3>
              <div className='name__product__container_preview'>
                <p><b>{title}</b></p>
              </div>
              <p>Unidades: {quantity}</p>
              <button className='btn__buy_preview'>Comprar</button>
            </div>
    </>
  )
}
