import React from 'react'
import { Link } from "react-router-dom"
import { BiPlusMedical } from "react-icons/bi";

export default function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link to={"/"} className="navbar-brand">All Streaming</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div>
                        <Link to="/addType" type="button" className="btn btn-outline-warning me-3">Create Type <BiPlusMedical className='ms-1 mb-1'/> </Link>
                        <Link to="/addAccount" type="button" className="btn btn-outline-light">Create Account <BiPlusMedical className='ms-1 mb-1'/></Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}
