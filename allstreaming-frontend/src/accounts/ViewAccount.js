import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import IconStatus from '../layout/IconStatus';
import { BiArrowBack } from "react-icons/bi";


export default function ViewAccount() {

    const [account, setAccount] = useState({
        status: '',
        type: {
            id: 0
        }
    });

    const { id } = useParams();

    useEffect(() => {
        loadAccount();
    });

    const loadAccount = async () => {
        const result = await axios.get(`http://localhost:8080/account/get/${id}`);
        setAccount(result.data);
    }


    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center'> View Account</h2>

                    <div className="card">
                        <div className="card-header">
                        Account Details 
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"> ID {id} </li>
                            <li className="list-group-item">  {account.status} <IconStatus statusForIcon={account.status}/> </li>
                            <li className="list-group-item"> {account.type.service} </li>
                        </ul>
                    </div>

                    <Link className='btn btn-danger my-2' to={"/"}> Back <BiArrowBack/> </Link>

                </div>
            </div>
        </div>

    )
}
