import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../components/CSS/login.css'
import logo from '../assets/img/KNLLogoS.png'
import imgFond from '../assets/img/logimg.jpg';
import { AuthContext } from '../Index';

export const LoginPage = () => {
    const navigate = useNavigate();

    const { loggedIn ,setLoggedIn, setDataUser } = useContext(AuthContext);

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const loginHandleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const login = async (e) => {
        try {
            e.preventDefault();
            console.log(loggedIn);
            const { data } = await axios.post('https://api-c-roman.onrender.com/user/login', form);
            if (data.token) {
                setLoggedIn(true);
                localStorage.setItem('token', data.token);
                //Se guardan los datos en el LocalStorage
                localStorage.setItem(
                    'userData',
                    JSON.stringify({
                        id: data.userLogged.id,
                        name: data.userLogged.name,
                        email: data.userLogged.email,
                        phone: data.userLogged.phone,
                        role: data.userLogged.role
                    })
                );
                Swal.fire({
                    icon: 'success',
                    title: data.message
                    });
                    navigate('/');
                }else{
                    Swal.fire({
                    icon: 'info',
                    title: data.message
                    });
                }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className='contt'>
                <div className='containerLog' style={{ maxWidth: '850px' }}>
                    <input type='checkbox' id='flip' />
                    <div className='cover' style={{ left: '50%' }}>
                        <div className='front' style={{ background: 'black' }}>
                            <div className='text'>
                                <div className='imgs'>
                                    <img  src={logo}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='forms'>
                        <div className='form-content'>
                            <div className='login-form'>
                                <div className='title__login' style={{ }}>
                                    Login
                                </div>
                                <br />
                                <form action='#'>
                                    <div className='input-boxes'>
                                        <div className='input-box'>
                                            <i className='fas fa-envelope'></i>
                                            <input type='email' placeholder='Email' name='email' onChange={loginHandleChange} required />
                                        </div>
                                        <div className='input-box'>
                                            <i className='fas fa-lock'></i>
                                            <input type='password' placeholder='Password' name='password' onChange={loginHandleChange} required />
                                        </div>
                                        <div className='button input-box'>
                                            <input onClick={(e) => login(e)} type='button' value='Login' />
                                        </div>
                                        <div className='text sign-up-text'>
                                            Don't have an account? <label onClick={() => navigate('/register')}>Sign up</label>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};