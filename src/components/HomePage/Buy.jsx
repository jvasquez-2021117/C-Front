import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { CardProduct } from './CardProduct';
import '../CSS/cardProduct.css'
import '../CSS/buy.css'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Index';

export const Buy = () => {

    const navigate = useNavigate();
    const { dataUser, loggedIn } = useContext(AuthContext);
    const [publication, setPublication] = useState([{}]);


    const getProducts = async () => {
        try{
            const { data } = await axios('https://api-c-roman.onrender.com/publication/getPublications');
            setPublication(data.publications);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        getProducts();
    }, [loggedIn, dataUser])

  return (
    <>
        <section className='bull' style={{background: '#f2f3f3'}}>
            <div className='title' style={{margin: '0px'}}>
                <div className='title__container'>
                    <h2>Compra</h2>
                </div>
                <div className='btn__add__container'>
                    <button className='btn__add' onClick={()=> navigate('/sell')}>
                        Vende
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16" style={{marginLeft: '10px'}}>
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div className='container__card' style={ publication.length === 0 ? { height: '200px' } : { }}>
                {
                    publication.length === 0 ?
                    <>
                        <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#f2f3f3'}}>
                            <h4>No hay nada por aqui</h4>
                        </div>
                    </> :
                    <>

                    <div   div className='content__section'>
                        {
                            publication.map(({ _id, user, image, title, price, quantity }, i) => {
                                return(
                                    <div key={i} style={{display: 'flex', justifyContent: 'center'}}>
                                        <CardProduct
                                            _id={_id}
                                            user={user?.name}
                                            image={image}
                                            title={title}
                                            price={price}
                                            quantity={quantity}
                                            email={user?.email}
                                            getProducts={getProducts}
                                        ></CardProduct>
                                    </div>
                                )
                            })
                        }
                    </div>
                    </>
                }
            </div>
        </section>
    </>
  )
}
