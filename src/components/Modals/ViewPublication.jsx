import axios from 'axios'
import React, { useState } from 'react'
import { Modal, ModalFooter } from 'react-bootstrap'
import '../CSS/modalFinishBuy.css'
import { CardProduct } from '../HomePage/CardProduct'

export const ViewPublication = ({ isOpen, onClose, image, user, email, title, price, quantity, modal }) => {

    const [total, setTotal] = useState(0);

    const handleTotal = (event) => {
        event.preventDefault()
        const quantity = document.getElementById('inputQuantity').value;
        const totalF = price * quantity
        setTotal(totalF);
    }

  return (
    <>
      <Modal show={isOpen} >
                <Modal.Header className='text-black' >
                    <Modal.Title className=''>Publication</Modal.Title>
                    <button onClick={onClose} type='button' className='btn' data-dismiss='modal' aria-label='Close'>
                        <span className='text-black' aria-hidden='true'>
                            &times;
                        </span>
                    </button>
                    
                </Modal.Header>
                <Modal.Body className='text-black' style={{overflowY: 'scroll'}}>
                    <div className='container__card container__card__modal'>
                        <div  className='content__section content__section__modal'>
                        <CardProduct
                            image={image}
                            title={title}
                            quantity={quantity}
                            price={price}
                            modal={modal}
                            email={email}
                            user={user}
                        ></CardProduct>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className='bg2 text-white'>
                    <div className='reg_btn'>
                        <button className='btn btn-primary' type='button'>
                            Post
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
    </>
  )
}
