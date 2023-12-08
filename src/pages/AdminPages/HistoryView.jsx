import React, {useState, useEffect} from 'react'
import { NavBar } from '../../components/HomePage/NavBar'
import '../../components/CSS/usersView.css'
import axios from 'axios'
import { TableHistory } from '../../components/Tables/TableHistory'
import { useParams } from 'react-router-dom'
import { ViewPublication } from '../../components/Modals/ViewPublication'

export const HistoryView = () => {

    const [history, setHistory] = useState([{}]);;
    const [tableHistory, setTableHistory] = useState([{}]);
    const [search, setSearch] = useState("");
    const params = useParams();
    const { id, name } = params;
    const [showModalPublication, setShowModalPublication] = useState();
    const [dataPublication, setDataPublication] = useState({});
    const [userEmail, setUserEmail] = useState('');

    const handleOpenModalPublication = (image, user, email, title, price, quantity) => {
        setShowModalPublication(true);
        let datos = {
            image: image,
            user: user,
            email: email,
            title: title,
            price: price,
            quantity: quantity
        }
        setDataPublication(datos);
    }

    const handleCloseModalPublication = () => {
        setShowModalPublication(false);
    }

    const getHistory = async () => {
        try{
            const { data } = await axios.get(`https://api-c-roman.onrender.com/history/getByUser/${id}`);
            setHistory(data.history);
            setTableHistory(data.history);
            setUserEmail(data.history[0].user.email);
        }catch(e){
            console.log(e);
        }
    }

    const handleChangeSearch = (e) => {
        setSearch(e.target.value)
        filtrar(e.target.value)
    }

    const filtrar = (searchTerm) => {
        var resultSearch = tableHistory.filter((elemento) => {
            if (elemento.action.toString().toLowerCase().includes(searchTerm.toLowerCase()))
                return elemento
        })
        setHistory(resultSearch)
    }

    useEffect(() => getHistory, []);

  return (
    <>
        <NavBar></NavBar>
        <div className='view__container'>
            <div className='navbar-expand-lg navbar-light'>
                    <div className='container-fluid'>
                        <div className='collapse navbar-collapse justify-content-center' id='navbarCenteredExample' >
                            <h1 className='text-black' style={{ fontSize: '2.5rem' }}>Record of {name}</h1>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="row d-flex justify-content-center ">
                        <div className="a1">
                            <div className="search-box">
                                <div className="row1">
                                    <input type="text" id='inputSearch' placeholder='Search by action' value={search} onChange={handleChangeSearch} />
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
                                                                <th scope='col' className='text-white t__table'>action</th>
                                                                <th scope='col' className='text-white t__table'>Publication</th>
                                                                <th scope='col' className='text-white t__table'>View</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        
                                                            {
                                                                history.map(({ _id, user, action, publication }, index) => {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <TableHistory
                                                                                id={_id}
                                                                                action={action}
                                                                                publication={publication?._id}
                                                                            ></TableHistory>
                                                                            <td>
                                                                                <button className='btn badge btn-danger' onClick={() => handleOpenModalPublication(publication?.image, user?.name, user?.email, publication?.title, publication?.price, publication?.quantity)}>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                                                                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                                                                                </svg>
                                                                                </button>
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
        <ViewPublication
            isOpen={showModalPublication}
            onClose={handleCloseModalPublication}
            image={dataPublication.image}
            title={dataPublication.title}
            price={dataPublication.price}
            quantity={dataPublication.quantity}
            modal={true}
            email={dataPublication.email}
            user={dataPublication.user}
        ></ViewPublication>
    </>
  )
}
