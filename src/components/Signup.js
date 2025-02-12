import React, { useState } from 'react'
import './To_do.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

function Signup() {
    const [username, setusername] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const navigate = useNavigate()
    const handlesubmit = async (e) => {
        e.preventDefault();
        const values = { username, email, password }
        console.log(values)
        axios.post('http://localhost:5000/signup', values)
            .then(res => {
                navigate('/login')
                toast.success("signup successfully")
            })

            .catch(err => console.log(err))
    }

    const login = () => {
        navigate('/login')
    }

    return (
        <div className='to-do-container'>
            <ToastContainer />
            <h1>SIGN_UP</h1>
            <form onSubmit={handlesubmit}>
                <div>
                    <label class='label'>UserName:</label>
                    <input
                        className='input_btn'
                        type='text'
                        placeholder='UserName'
                        value={username}
                        onChange={(e) => setusername(e.target.value)}
                    />
                </div>
                <div>
                    <label class='label'>Email:</label>
                    <input
                        className='input_btn'
                        type='Email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                    />
                </div>
                <div>
                    <label class='label'>Password:</label>
                    <input
                        className='input_btn'
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                    />
                </div>
                <div>
                    <button id='btn' type='submit'>SIGNUP</button>
                    <button id='btn' onClick={login}>LOGIN</button>

                </div>


            </form>
        </div>
    )
}

export default Signup