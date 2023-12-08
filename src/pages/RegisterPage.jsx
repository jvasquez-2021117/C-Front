import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../components/CSS/login.css'
import logo from '../assets/img/KNLLogoS.png'
import imgFond from '../assets/img/logimg.jpg';

export const RegisterPage = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        phone: '',
        email: '',
        password: ''
    });

    const RegisterHandleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        console.log(form);
    };

    const register = async (e) => {
        try {
            e.preventDefault();
            const { data } = await axios.post('https://api-c-roman.onrender.com/user/register', form);
                Swal.fire({
                    icon: 'success',
                    title: data.message
                });
            navigate('/login');
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: err.response.data.message,
              });
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
                                    Register
                                </div>
                                <br />
                                <form action='#'>
                                    <div className='input-boxes'>
                                        <div className='input-box'>
                                            <i className='fas fa-envelope'></i>
                                            <input type='text' placeholder='Name' name='name' onChange={RegisterHandleChange} required />
                                        </div>
                                        <div className='input-box'>
                                            <i className='fas fa-envelope'></i>
                                            <input type='number' placeholder='Phone' name='phone' onChange={RegisterHandleChange} required />
                                        </div>
                                        <div className='input-box'>
                                            <i className='fas fa-envelope'></i>
                                            <input type='email' placeholder='Email' name='email' onChange={RegisterHandleChange} required />
                                        </div>
                                        <div className='input-box'>
                                            <i className='fas fa-lock'></i>
                                            <input type='password' placeholder='Password' name='password' onChange={RegisterHandleChange} required />
                                        </div>
                                        <div className='button input-box'>
                                            <input onClick={(e) => register(e)} type='button' value='Register' />
                                        </div>
                                        <div className='button input-box' style={{margin: '0'}}>
                                            <input onClick={(e) => navigate('/')} type='button' value='Cancel' />
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