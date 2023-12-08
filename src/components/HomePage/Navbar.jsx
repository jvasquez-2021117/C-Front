import React, { useEffect, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Index'
import Swal from 'sweetalert2';
import '../CSS/homePage.css'


export const NavBar = () => {

    const { dataUser, handleLogout, loggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const navbar__toogle_btn = useRef(null)
    const navbar__mobile_menu = useRef(null);

    const toggleMenu = () => {
        const mobileMenu = navbar__mobile_menu.current
        mobileMenu.style.display =
            mobileMenu.style.display === 'none' || mobileMenu.style.display === ''
            ? "flex" : "none"
    }

    const hiderMenuResize = () => {
        const mobileMenu = navbar__mobile_menu.current
        mobileMenu.style.display = 'none'
    }

    const logOut = () => {
      Swal.fire({
          title: 'Do you want to log out?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
      }).then((result) => {
          if (result.isConfirmed) {
              Swal.fire(
                  'Closed session',
                  '',
                  'success',
              );
              localStorage.clear();
              handleLogout();
              navigate('/');
          }
      });
  }


    useEffect(() => {
        hiderMenuResize();
        window.addEventListener('resize', hiderMenuResize);
    
    return() => {
        window.removeEventListener('resize', hiderMenuResize);
    }

      }, []);

  return (
    <>
      <header className='header'>
        <nav className='navbar'>
          <a href="#" className='navbar__logo'>
            <img src="https://w7.pngwing.com/pngs/18/941/png-transparent-black-and-white-circle-angle-letter-c-angle-text-photography.png" alt="" />
          </a>
          <div className='navbar__var'>
            <ul className='nav__list'>
              <li className='nav__link'>
                <a href="#">¿Cómo funciona?</a>
              </li>
              <li className='nav__link'>
                <a href="">¿Quiénes somos?</a>
              </li>
              <li className='nav__link'>
                <a href="">Ayuda</a>
              </li>
              <li className='nav__link'>
                <a href='' onClick={()=> navigate('/')}>Inicio</a>
              </li>
            </ul>
            {
              loggedIn === false ? 
              <>
                <a href="" className='button-primary'><button onClick={()=> navigate('/login')}>Iniciar sesion</button></a>
                <a href="" className='button button-secondary'onClick={() => navigate('/register')}><button>Registrarse</button></a>
              </>
              : <>
                <div className='btn__profile' onClick={() => navigate('/profile')}></div>
                <a href="#" className='button button-secondary'><button onClick={logOut}>Cerrar Sesion</button></a>
              </>
            }
            <button onClick={toggleMenu} ref={navbar__toogle_btn} className='navbar__toogle-btn'>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
            </svg>
            </button>
            <div ref={navbar__mobile_menu} className='navbar__mobile-menu'>
                <ul className='nav__list-mobile'>
                  <li className='nav__link-mobile'>
                        <a href="" onClick={()=> navigate('/')}>Inicio</a>
                    </li>
                    <li className='nav__link-mobile'>
                        <a href="">¿Como funciona?</a>
                    </li>
                    <li className='nav__link-mobile'>
                        <a href="">¿Quiénes somos?</a>
                    </li>
                    <li className='nav__link-mobile'>
                        <a href="">Ayuda</a>
                    </li>
                </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}
