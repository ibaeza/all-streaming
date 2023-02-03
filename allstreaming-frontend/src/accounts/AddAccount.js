import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { AiOutlineClose } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { BiPlusMedical } from "react-icons/bi";
import Swal from 'sweetalert2';

export default function AddAccount() {

    let navigate = useNavigate();

    const [account, setAccount] = useState({
        status: 'Available',
        type: {
            id: 1
        }
    });

    const [types, setTypes] = useState([]);

    useEffect(() => {
        loadTypes();
    }, [])

    const loadTypes = async () => {
        const result = await axios.get("http://localhost:8080/type/getAll");
        setAccount({
            ...account,
            type: {
                ...account.type,
                id: result.data[0].id
            }
        });
        setTypes(result.data);
    }

    const onInputChange = (e) => {

        setAccount({
            ...account,
            type: {
                ...account.type,
                id: e.target.value
            }
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/account/save", account);
        Swal.fire({
            title: 'Account Created',
            text: 'Account created successfully',
            icon: 'success',
            confirmButtonColor: '#198754',
        })
        navigate("/");
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center'> Create New Account </h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>

                            <label htmlFor="selectOption" className='form-label'>Select an account type for the new account</label>
                            <div className='row'>
                                <div className='col-9'>
                                    <select id="selectOption" defaultValue={12} className="form-select" aria-label="Select for account type" onChange={(e) => onInputChange(e)}>

                                        {
                                            types.map((type) => (
                                                <option value={type.id}>{type.service}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className='col'>
                                    <Link to="/addType" type="button" className="btn btn-outline-dark">New Type  <BiPlusMedical className='ms-1 mb-1' /></Link>
                                </div>
                            </div>

                        </div>

                        <button type="submit" className="btn btn-dark mx-4">Create <BsCheckLg /></button>
                        <Link to="/" type="button" className="btn btn-danger mx-4">Cancel <AiOutlineClose /> </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
