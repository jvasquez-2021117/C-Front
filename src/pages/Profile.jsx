import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react'
import '../components/CSS/profile.css'
import { CardProduct } from '../components/HomePage/CardProduct';
import { NavBar } from '../components/HomePage/NavBar'
import { AuthContext } from '../Index';

export const Profile = () => {

    const [publications, setPublications] = useState(true);
    const [sold, setSold] = useState(false);
    const [bought, setBought] = useState(false);
    const { dataUser } = useContext(AuthContext);

    const [publication, setPublication] = useState([{}]);

    const getProducts = async () => {
        try{
            const { data } = await axios(`https://api-c-roman.onrender.com/publication/getPublicationsByUser/${dataUser.id}`);
            setPublication(data.publications);
        }catch(err){
            console.log(err);
        }
    }

    const getSold = async () => {
        try{
            const { data } = await axios(`https://api-c-roman.onrender.com/history/getSold/${dataUser.id}`);
            setPublication(data.sold);
        }catch(err){
            console.log(err);
        }
    }

    const getBought = async () => {
        try{
            const { data } = await axios(`https://api-c-roman.onrender.com/history/getBought/${dataUser.id}`);
            setPublication(data.bought);
        }catch(err){
            console.log(err);
        }
    }

    const loginHandleChange = (e) => {
        const value = e.target.name
        switch(value) {
            case 'btnPublication': 
                setPublications(true);
                setSold(false);
                setBought(false);
                getProducts();
                break;
            case 'btnSold': 
                setSold(true);
                setPublications(false);
                setBought(false);
                getSold();
                break;
            case 'btnBought':
                setBought(true);
                setSold(false);
                setPublications(false);
                getBought();
                break;
        }
    };

    useEffect(() => {
        if(dataUser.id){
        getProducts();
        }
    }, [dataUser.id])
  return (
    <>
        <NavBar></NavBar>
        <div className='front__container'>
            <div className='front'>

            </div>
            <div className='photo__container'>
                <div className='data__user__container'>
                    <div className='photo__c'>
                        <div className='photo'>

                        </div>
                    </div>
                    <div className='tite__user__container'>
                        <h2>{dataUser.name}</h2>
                    </div>
                </div>
            </div>
        </div>
        <div className='button__container'>
            <button className='button__options' name='btnPublication' style={ publications ? { color: '#38a4b7' } : {}} onClick={loginHandleChange}>Publicaciones</button>
            <button className='button__options'name='btnSold' style={ sold ? { color: '#38a4b7' } : {}} onClick={loginHandleChange}>Vendidos</button>
            <button className='button__options' name='btnBought' style={ bought ? { color: '#38a4b7' } : {}} onClick={loginHandleChange}>Comprados</button>
        </div>
        {
            publications ? 
            <>
                <div className='container__card' style={ publication.length === 0 ? { borderRadius: '30px 30px 0px 0px', height: '200px' } : { borderRadius: '30px 30px 0px 0px' }}>
                <div style={{width: '100%', display: 'flex', justifyContent: 'center', padding: '20px 0px 0px 0px', color: '#f2f3f3'}}>
                     <h2>Ofertas Publicadas</h2>
                </div>
                {
                    publication.length === 0 ?
                    <>
                        <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#f2f3f3'}}>
                            <h4>No hay nada por aqui</h4>
                        </div>
                    </> :
                    <>
                        <div   div className='content__section' style={{borderRadius: '10px 10px 10px 10px'}}>
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
                                                modal={true}
                                            ></CardProduct>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </>
                }
                </div>
            </> 
            : sold ?
            <>
                <div className='container__card' style={ publication.length === 0 ? { borderRadius: '30px 30px 0px 0px', height: '200px' } : { borderRadius: '30px 30px 0px 0px' }}>
                <div style={{width: '100%', display: 'flex', justifyContent: 'center', padding: '20px 0px', color: '#f2f3f3'}}>
                     <h2>Ofertas Vendidas</h2>
                </div>
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
                                publication.map(({ _id, user, publication, quantity }, i) => {
                                    return(
                                        <div key={i} style={{display: 'flex', justifyContent: 'center'}}>
                                            <CardProduct
                                                _id={i}
                                                user={user?.name}
                                                image={publication?.image}
                                                title={publication?.title}
                                                price={publication?.price}
                                                quantity={quantity}
                                                modal={true}
                                            ></CardProduct>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </>
                }
                </div>
            </>
            : bought ? 
            <>
                <div className='container__card' style={ publication.length === 0 ? { borderRadius: '30px 30px 0px 0px', height: '200px' } : { borderRadius: '30px 30px 0px 0px' }}>
                <div style={{width: '100%', display: 'flex', justifyContent: 'center', padding: '20px 0px', color: '#f2f3f3'}}>
                     <h2>Ofertas Compradas</h2>
                </div>
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
                                publication.map(({ _id, user, publication, quantity }, i) => {
                                    return(
                                        <div key={i} style={{display: 'flex', justifyContent: 'center'}}>
                                            <CardProduct
                                                _id={i}
                                                user={user?.name}
                                                image={publication?.image}
                                                title={publication?.title}
                                                price={publication?.price}
                                                quantity={quantity}
                                                modal={true}
                                            ></CardProduct>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    
                    </>
                }
                </div>
            </>
            :
            <>
            </>

        }
    </>
  )

}
