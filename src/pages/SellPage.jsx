import React, { useEffect, useState, useRef, useContext } from 'react'
import { NavBar } from '../components/HomePage/NavBar'
import '../components/CSS/sellPage.css'
import axios from 'axios'
import { AuthContext } from '../Index'
import { CardProductPreview } from '../components/HomePage/CardProductPreview'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export const SellPage = () => {

  const { dataUser, loggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const fileImage = useRef(null);
  const [img, setImg] = useState('https://andeguat.org.gt/wp-content/uploads/2015/02/default-placeholder.png');

  const addPublication = async() => {
    try{
      const { data } = await axios.post('https://api-c-roman.onrender.com/publication/createPublication', form, {
        headers: {
          'Content-Type': 'multipart/form-data'
      }
      });
      Swal.fire({
        icon: 'success',
        title: data.message
      });
      navigate('/');
    }catch(err){
      Swal.fire({
        icon: 'error',
        title: err.response.data.message,
      });
    }
  }

  const imagePreview = (e) => {
    const file = fileImage.current;
    console.log('hola');
    if(e.target.files[0]){
      const reader = new FileReader();
      reader.onload = function (e){
        setImg(e.target.result);
      }
      reader.readAsDataURL(e.target.files[0]);
    }
    console.log(img);

  }

  const [form, setForm] = useState({
    image: null,
    title: '',
    price: '',
    quantity: '',
    description: '',
    user: dataUser.id
  });

  const infoPreview = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    console.log(form);
  }

  useEffect( () => {

  } )

  return (
    <>
        <NavBar></NavBar>
        <div className='sell__container'>
            <div className='data'>
              <div>
                <h2>Vende tu celular</h2>
              </div>
              <form className='form' encType='multipart/form-data'>
                <div className='upload__File'>
                  <input ref={fileImage} className='' style={{ borderColor: '#263340' }} type='file' accept='.jpg, .jpej, .png' id='inputImage' placeholder='Enter your Image' name='image' onChangeCapture={imagePreview}
                        onChange={(e) => {
                        setForm({
                        ...form,
                        image: e.target.files[0]
                      });
                    }}
                  />
                  <label htmlFor="inputImage" className='lbl-upload'>
                    <div className='upload_container'>
                      <div className='text_upload'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-plus" viewBox="0 0 16 16">
                          <path d="M8.5 6a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V10a.5.5 0 0 0 1 0V8.5H10a.5.5 0 0 0 0-1H8.5z"/>
                          <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1"/>
                        </svg>
                      </div>
                      <div className='text__upload'>
                        <span><b>Subir foto</b></span><br />
                      </div>
                      <div className='text__upload'>
                        <span>click aquí para seleccionar tu foto</span>
                      </div>
                    </div>
                  </label>
                </div>
                <div className='title__required__data'>
                  <h3>Obligatorio</h3>
                  <p>Proporciona una descripcion que se lo más detallada posible</p>
                </div>
                  <div className='input__title input__data'>
                    <input type="text" maxLength={50} id='title' name='title' autoComplete='off' onChange={infoPreview} required/>
                    <label htmlFor="title" className='lbl-data'>
                      <span className='text__span'>Titulo</span>
                    </label>
                  </div>
                  <div className='input__price input__data'>
                    <input type="number" id='price' min={1} name='price' autoComplete='off' onChange={infoPreview} required/>
                    <label htmlFor="price" className='lbl-data'>
                      <span className='text__span'>Precio</span>
                    </label>
                  </div>
                  <div className='input__quantity input__data'>
                    <input type="number" min={1} inputMode='numeric' id='quantity' name='quantity' autoComplete='off' onChange={infoPreview} required/>
                    <label htmlFor="quantuty" className='lbl-data'>
                      <span className='text__span'>Cantidad</span>
                    </label>
                  </div>
                  <div className='title__required__data'>
                    <h3>Mas detalles</h3>
                    <p>Incluye mas detalles para atraer mas interes</p>
                  </div>
                  <div className='text__Area input__data'>
                    <textarea name="" id="description" cols="30" rows="4" required></textarea>
                    <label htmlFor="description" className='lbl-data lbl-textArea'>
                      <span className='text__span'>Descripcion</span>
                    </label>
                  </div>
              </form>
              <button onClick={addPublication} className='btn__addPublication'>agregar</button>
            </div>
            <div className='preview'>
              <div className='preview__container'>
                <h2>Vista previa</h2>
              <div className='container__card container__card__preview' style={{height: '90%', width: '100%'}}>
                <div  className='content__section content__section__preview'>
                  <CardProductPreview image2={img} title={form.title} price={form.price} quantity={form.quantity}></CardProductPreview>
                </div>
              </div>
              </div>
            </div>
        </div>
    </>
  )
}
