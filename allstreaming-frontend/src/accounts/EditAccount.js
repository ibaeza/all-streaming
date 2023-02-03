import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import IconStatus from '../layout/IconStatus';
import { AiOutlineClose, AiFillSave } from "react-icons/ai";
import Swal from 'sweetalert2';

export default function EditAccount() {
    let navigate = useNavigate();

    const { id } = useParams();

    const [status, setStatus] = useState([]);

    const [account, setAccount] = useState({
        status: '',
        type: {
            id: 0
        }
    });



    const loadAccount = async () => {
        const result = await axios.get(`http://localhost:8080/account/get/${id}`);
        setStatus(result.data.status);
        setAccount(result.data);
    }

    useEffect(() => {
        loadAccount();
    }, [])

    const onInputChange = (e) => {
        setStatus(e.target.value);
        setAccount({
            ...account,
            status: e.target.value
        });
    };


    const onSubmit = async (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Edit',
            text: `Are you sure to edit the account with id ${id}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#198754',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm'
        }).then(async(result) => {
            if (result.value) {
                Swal.fire({
                    icon: 'success',
                    title: 'Account edited successfully',
                    showConfirmButton: false,
                    timer: 1000
                  })
                await axios.put(`http://localhost:8080/account/edit/${id}`, account);
                navigate("/");
            }
        })

    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center'> Edit Account </h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>

                            <div className="card mb-5 mx-5">
                                <div className="card-header">
                                    Account Details
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item"> ID {id} </li>
                                    <li className="list-group-item">  {account.status} <IconStatus statusForIcon={account.status} /> </li>
                                    <li className="list-group-item"> {account.type.service} </li>
                                </ul>
                            </div>



                            <label htmlFor="selectOption" className='form-label'>Select the new status for this account </label>
                            <div className='row'>
                                <div className='col'></div>
                                <div className='col-5'>
                                    <select id="selectOption" defaultValue={"Available"} value={status} className="form-select" aria-label="Select for account type" onChange={(e) => onInputChange(e)}>
                                        <option value={"Available"}>Available</option>
                                        <option value={"Used"}>Used</option>
                                        <option value={"Blocked"}>Blocked</option>
                                    </select>
                                </div><div className='col'></div>
                            </div>


                        </div>

                        <button type="submit" className="btn btn-warning mx-4">Save <AiFillSave /> </button>

                        <Link className='btn btn-danger my-2' to={"/"}> Cancel <AiOutlineClose /> </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
