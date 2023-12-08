import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Modal, ModalFooter } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { AuthContext } from '../../Index'
import '../CSS/modalFinishBuy.css'
import { CardProduct } from '../HomePage/CardProduct'

export const SellModal = ({ isOpen, id, onClose, image, user, title, price, quantity, modal, getProducts }) => {

    const { dataUser } = useContext(AuthContext);
    const [total, setTotal] = useState(price);
    const [form, setForm] = useState({
        publication: id,
        user: dataUser.id,
        quantity: 1
    });

    const handleTotal = (e) => {
        e.preventDefault();
        const quantityD = document.getElementById('inputQuantity').value;
        const totalF = price * quantityD
        setTotal(totalF);
        setForm({
            ...form,
            [e.target.name]: e.target.value,
            publication: id,
            user: dataUser.id
        });
    }
    useEffect( () => {

    }, [isOpen, id, onClose, image, user, title, price, quantity, modal])

    const buy = async () => {
        try{
            const quantity = document.getElementById('inputQuantity').value;
            console.log(form);
            if(quantity == 0 || quantity == '') return (
                Swal.fire({
                    icon: 'info',
                    title: 'ingresa la cantidad que quieres'
                })
            );
            const { data } = await axios.put('http://localhost:3200/publication/buy', form);
            Swal.fire({
                icon: 'success',
                title: data.message
            });
            getProducts();
        }catch(err){
            console.log(err);
        }
    }

  return (
    <>
      <Modal show={isOpen} >
                <Modal.Header className='text-black' >
                    <Modal.Title className=''>Finalizar Compra</Modal.Title>
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
                        ></CardProduct>
                        </div>
                    </div>
                    <form action=''>
                        <div className='mb-3'>
                            <input min={0} className='form-control' style={{ borderColor: '#263340', marginTop: '10px' }} type='number' id='inputQuantity' placeholder='Ingresa la cantidad que quieres comprar' name='quantity' onChange={handleTotal} required />
                        </div>
                        <div>
                            <h3>Total: Q{total}.00</h3>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer className='bg2 text-white'>
                    <div className='reg_btn'>
                        <button className='btn btn-primary' type='button' onClick={buy}>
                            Comprar
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
    </>
  )
}
