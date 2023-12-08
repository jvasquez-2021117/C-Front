import React from 'react'
import '../CSS/welcome.css'

export const Welcome = () => {
  return (
    <section className='welcome'>
        <div className='welcome_container'>
            <div className='slogan'>
                <span><b>ahorra</b> al</span>
                <span>comprar</span>
                <span>y <b>gana</b></span>
                <span>al vender</span>
                <div className='description'>
                  <span>En <b>C</b> compras y vendes lotes de celulares</span>
                  <span>al <b>mejor precio del mercado</b></span>
                </div>
            </div>
            <div className='image'>
                <img src="https://images.dailyobjects.com/marche/product-images/1101/slick-phone-case-cover-for-iphone-13-pro-max-images/Nimbus-Phone-Case-Cover-For-iPhone-13-Pro-Max.png?tr=cm-pad_resize,v-2" alt="imagen celular" />
            </div>
        </div>
    </section>
  )
}
