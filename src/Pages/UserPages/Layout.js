import React from 'react'
import {Outlet, Link} from 'react-router-dom';

export default function Layout(){
    return(
        <>
            <nav>
                <ul>
                    <li>
                        <Link to='/login'>Login</Link>
                    </li>
                </ul>
            </nav>
            <Outlet/>
        </>
    )
}