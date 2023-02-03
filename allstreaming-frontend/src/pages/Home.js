import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import IconStatus from '../layout/IconStatus';
import { BsTrashFill, BsFillEyeFill, BsPencilFill } from "react-icons/bs";
import Swal from 'sweetalert2';
import '../styles/style.css';

export default function Home() {

    const [accounts, setAccounts] = useState([]);
    const [types, setTypes] = useState([]);

    //FILTRO
    const [searchStatus, setSearchStatus] = useState("");
    const [searchType, setSearchType] = useState("");

    const loadAccounts = async () => {
        const result = await axios.get("http://localhost:8080/account/getAll");
        setAccounts(result.data);
    }

    const loadTypes = async () => {
        const result = await axios.get("http://localhost:8080/type/getAll");
        setTypes(result.data);
    }

    const deleteAccount = async (id) => {
        await axios.delete(`http://localhost:8080/account/delete/${id}`)
        loadAccounts();
    }

    const deleteAccountAlert = (id_acc) => {
        Swal.fire({
            title: 'Delete',
            text: `Are you sure to delete the account with id ${id_acc}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#198754',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.value) {
                Swal.fire({
                    icon: 'success',
                    title: 'Account deleted successfully',
                    showConfirmButton: false,
                    timer: 1000
                  })
                deleteAccount(id_acc);
            }
        })
    }

const searcherStatus = (e) => {
    console.log("Cambiando filtro de status " + e.target.value)
    setSearchStatus(e.target.value);
}

const searcherType = (e) => {
    setSearchType(e.target.value);
}

//FILTRO
let results = [];

if (!searchStatus && !searchType) {
    results = accounts;

} else {
    results = accounts.filter((acc) =>
        acc.status.toLowerCase().includes(searchStatus.toLocaleLowerCase()) && acc.type.service.toLowerCase().includes(searchType.toLocaleLowerCase())
    )
}
//---------

//PAGINACION
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;
const totalPages = Math.ceil(results.length / itemsPerPage);
const pages = [];
for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
}

const handlePrevClick = () => {
    setCurrentPage(currentPage - 1);
};

const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
};

const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const displayedItems = results.slice(startIndex, endIndex);

//---------

useEffect(() => {
    loadAccounts();
    loadTypes();
}, [])

return (

    <div className='container'>

        <h3 className="text-start mt-3 titulo">Filtros</h3>
        <div className="input-group mt-2">
            <span className="input-group-text" id="basic-addon1"><FaSearch className='me-2 '></FaSearch> Status </span>
            <select id="selectOption" defaultValue={""} className="form-select" aria-label="select an status" onChange={searcherStatus} value={searchStatus}>
                <option value={""} >No filter</option>
                <option value={"Available"}>Available</option>
                <option value={"Used"}>Used</option>
                <option value={"Blocked"}>Blocked</option>

            </select>
        </div>

        <div className="input-group mt-2">
            <span className="input-group-text" id="basic-addon1"><FaSearch className='me-2 white'></FaSearch> Type </span>
            <select id="selectOption" defaultValue={""} className="form-select" aria-label="select an type" onChange={searcherType} value={searchType}>
                <option value={""}>No filter</option>
                {
                    types.map((type, index) => (

                        <option key={index} value={type.service}>{type.service}</option>
                    ))
                }

            </select>
        </div>

        <h3 className="text-start mt-3 mb-0 titulo">Datos</h3>
        <nav >
            <ul className="pagination justify-content-center mb-0">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button className={`buttons page-link ${currentPage === 1 ? "disabled-button" : "not-current"}`} onClick={handlePrevClick}><span aria-hidden="true">&laquo;</span></button>
                </li>
                {pages.map(page => (
                    <li className={"page-item"}>
                        <button className={`buttons page-link ${currentPage === page ? "current-page" : "not-current"}`} onClick={() => setCurrentPage(page)}>{page}</button>
                    </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                    <button className={`buttons page-link ${currentPage === totalPages ? "disabled-button" : "not-current"}`} onClick={handleNextClick}><span aria-hidden="true">&raquo;</span></button>
                </li>
            </ul>
        </nav>

        {/* DATOS */}
        <div className='py-2'>
            <table className="table border shadow table-hover">
                <thead className="table-dark ">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ID</th>
                        <th scope="col">Status</th>
                        <th scope="col">Type</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        displayedItems.map((account, index) => (
                            <tr key={index}>
                                <th scope="row">{(index + 1) + ((currentPage - 1) * 10)}</th>
                                <td> {account.id}</td>
                                <td> {account.status} <IconStatus statusForIcon={account.status} /> </td>
                                <td>{account.type.service}</td>
                                <td>
                                    <Link to={`/viewAccount/${account.id}`} type="button" className="btn btn-success mx-2">View <BsFillEyeFill /> </Link>
                                    <Link to={`/editAccount/${account.id}`} type="button" className="btn btn-warning mx-2">Edit <BsPencilFill /> </Link>
                                    <button onClick={() => deleteAccountAlert(account.id)} type="button" className="btn btn-danger mx-2">
                                        Delete <BsTrashFill />
                                    </button>
                                </td>
                            </tr>
                        ))
                    }



                </tbody>
            </table>
        </div>

    </div>
)
}            
