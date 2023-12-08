import React, {useState, useEffect} from 'react'
import { NavBar } from '../../components/HomePage/NavBar'
import '../../components/CSS/usersView.css'
import { TableClient } from '../../components/Tables/TableClient'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'

export const UsersView = () => {

    const [clients, setClients] = useState([{}]);;
    const [tableClients, setTableClients] = useState([{}]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const getClients = async () => {
        try{
            const { data } = await axios.get('https://api-c-roman.onrender.com/user/getUsers');
            setClients(data.users);
            setTableClients(data.users);
        }catch(e){
            console.log(e);
        }
    }

    const handleChangeSearch = (e) => {
        setSearch(e.target.value)
        filtrar(e.target.value)
    }

    const filtrar = (searchTerm) => {
        var resultSearch = tableClients.filter((elemento) => {
            if (elemento.name.toString().toLowerCase().includes(searchTerm.toLowerCase()))
                return elemento
        })
        setClients(resultSearch)
    }

    useEffect(() => getClients, []);

  return (
    <>
        <NavBar></NavBar>
        <div className='view__container'>
            <div className='navbar-expand-lg navbar-light'>
                    <div className='container-fluid'>
                        <div className='collapse navbar-collapse justify-content-center' id='navbarCenteredExample' >
                            <h1 className='text-black' style={{ fontSize: '2.5rem' }}>VIEW CLIENTS</h1>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="row d-flex justify-content-center ">
                        <div className="a1">
                            <div className="search-box">
                                <div className="row1">
                                    <input type="text" id='inputSearch' placeholder='Search by name' value={search} onChange={handleChangeSearch} />
                                    <button>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search bi-solid" viewBox="0 0 16 25">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <section className='intro'>
                    <div>
                        <div className='mask d-flex align-items-center'>
                            <div className='container'>
                                <div className='row justify-content-center'>
                                    <div className='col-10'>
                                        <div className='card box-shadow'>
                                            <div className='card-body p-0'>
                                                <div className='table-responsive table-scroll tableUsers' data-mdb-perfect-scrollbar='true'>
                                                    <table className='table table-striped'>
                                                        <thead style={{ backgroundColor: '#8c7c62' }}>
                                                            <tr>
                                                                <th scope='col' className='text-white t__table'>ID</th>
                                                                <th scope='col' className='text-white t__table'>Name</th>
                                                                <th scope='col' className='text-white t__table'>Phone</th>
                                                                <th scope='col' className='text-white t__table'>Email</th>
                                                                <th scope='col' className='text-white t__table'>Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        
                                                            {
                                                                clients.map(({ _id, name, phone, email }, index) => {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <TableClient
                                                                                id={_id}
                                                                                name={name}
                                                                                phone={phone}
                                                                                email={email}
                                                                            ></TableClient>
                                                                            <td className='text-center align-middle'>
                                                                                <div className='btn-group align-top'>
                                                                                    <div className='btn btn-sm btn-danger btn-outline-secondary badge'>
                                                                                        <button onClick={() => navigate(`/admin/history/${email}/${_id}`)} className='btn badge' type='button'>
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock-history bi2" viewBox="0 0 16 16">
                                                                                            <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"/>
                                                                                            <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"/>
                                                                                            <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>
                                                                                            </svg>
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >
        </div>
    </>
  )
}
