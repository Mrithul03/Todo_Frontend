import React, { useState } from 'react'
import './To_do.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

function Login() {
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')

    const navigate = useNavigate()
    const handlesubmit = async (e) => {
        e.preventDefault();
        const values={ username:username,password:password}
        axios.post('http://localhost:5000/login', values,{headers: { "Content-Type": "application/json" }})
            .then(res => {
                localStorage.setItem('token',res.data.token)
                localStorage.setItem('username',res.data.username)
                localStorage.setItem('userId',res.data.userId)
                const username=localStorage.getItem("username")
                console.log(username)
                navigate('/home')
                toast.success("login succesfully successfully")
            })
            

            .catch(err => console.log(err))
    }
    return (
        <div className='to-do-container'>
            <ToastContainer />
            <h1>LOGIN</h1>
            <form onSubmit={handlesubmit}>
                <div>
                    <label>UserName:</label>
                    <input
                        type='text'
                        placeholder='UserName'
                        value={username}
                        onChange={(e) => setusername(e.target.value)}
                    />
                </div>
                <div>
                    <label>password:</label>
                    <input
                        type='password'
                        placeholder='password'
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                    />
                </div>
                <div>
                    <button type='submit'>LOGIN</button>
                </div>

            </form>
        </div>
    )
}

export default Login