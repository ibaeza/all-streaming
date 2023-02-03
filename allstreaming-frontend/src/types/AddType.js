import axios from 'axios';
import React, { useState} from 'react'
import { Link, useNavigate } from "react-router-dom"
import { AiOutlineClose } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import Swal from 'sweetalert2';

export default function AddType() {

    let navigate = useNavigate();

    const [type, setType] = useState({
        service: ""
    });

    const onInputChange = (e) => {
        setType({...type, [e.target.name]: e.target.value});
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/type/save", type);
        Swal.fire({
            title: 'Account Type Created',
            text: 'Account Type created successfully',
            icon: 'success',
            confirmButtonColor: '#198754',
        })
        navigate("/");
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center'> Create New Type Account </h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>

                            <label htmlFor="typeAccount" className='form-label'>New type</label>
                            <input type={"text"} className="form-control" id='typeAccount' name='service' placeholder='Enter a new account type' onChange={(e)=>onInputChange(e)} ></input>

                        </div>

                        <button type="submit" className="btn btn-dark mx-4">Create <BsCheckLg /></button>
                        <Link to="/" type="button" className="btn btn-danger mx-4">Cancel <AiOutlineClose /></Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
