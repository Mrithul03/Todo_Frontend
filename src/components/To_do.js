import React, { useState } from 'react'
import './To_do.css'
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useEffect } from 'react';

function To_do() {
    const API_BASE_URL = "http://localhost:5000/todos";
    console.log(API_BASE_URL)

    const [taskname, settaskname] = useState('')
    const [tasks, settasks] = useState([])
    const [status, setstatus] = useState('')

    const token = localStorage.getItem('token')
    const username = localStorage.getItem('username')
    const userid=localStorage.getItem('userId')

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    alert("User not authenticated, please log in");
                    return;
                }

                const response = await axios.get(API_BASE_URL, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                settasks(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);


    const validationSchema = Yup.object().shape({
        taskname: Yup.string()
            .min(4, "Task name must be at least 10 characters")
            .required("Task name is required"),
        status: Yup.string()
            .oneOf(["Completed", "incomplete"], "Select the status")
            .required("Status is required"),
    })
    const [message, setmessage] = useState({})

    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            if (await validationSchema.isValid({ taskname, status })) {
                const newtask = { title: taskname, status };
                if (!token) {
                    alert("user not authenticated,please log in")
                    return;
                }
                axios.post(API_BASE_URL, newtask, { headers: { Authorization: `Bearer ${token}` } })
                    .then(response => {
                        settasks([...tasks, response.data]);

                        toast.success("Task added successfully!");
                        settaskname("");
                        setstatus("");
                        setmessage({});
                    })
                    .catch(error => console.error("Error adding task:", error));
            } else {
                await validationSchema.validate({ taskname, status }, { abortEarly: false });
            }
        } catch (err) {
            const newErrors = {};
            err.inner.forEach(error => {
                newErrors[error.path] = error.message;
            });
            setmessage(newErrors);
            console.log(newErrors)
        }
    };

    const handledelete = (id) => {
        axios.delete(`${API_BASE_URL}/${id}`)
            .then(() => {
                settasks(tasks.filter(t => t.id !== id));
                toast.error("DELETED");
            })
            .catch(error => console.error("Error deleting task:", error));
    };

    const handleEdit = (id) => {
        let tem = [...tasks]
        for (var i = 0; i < tem.length; i++) {
            if (tem[i].id == id) {
                settaskname(tem[i].title)
                setstatus(tem[i].status)
                setid(tem[i].id)
            }
        }
    }
    const [id, setid] = useState(false)
    const handleUpdate = (id) => {
        if (!id) {
            toast.error("No task selected for update");
            return;
        }
        axios.patch(`${API_BASE_URL}/${id}`, { title: taskname, status })
            .then(response => {
                settasks(tasks.map(t => (t.id === id ? response.data : t)));
                toast.success("EDITED");
                setid('');
                settaskname("");
                setstatus("");
            })
            .catch(error => console.error("Error updating task:", error));
    };

    const handlestatusupdate = (status, id) => {
        axios.put(`${API_BASE_URL}/${id}`, { status })
            .then(() => {
                settasks(tasks.map(t => (t.id === id ? { ...t, status } : t)));
                toast("STATUS_UPDATED");
            })
            .catch(error => console.error("Error updating status:", error));
    };


    return (
        <div className='to-do-container'>
            <h1>TO-DO-LIST OF {username} {userid}</h1>
            <ToastContainer />
            <form onSubmit={handlesubmit} >
                <div className='input-container'>
                    <label id='label' htmlFor='task-input'>Task:</label>
                    <input
                        id='task-input'
                        className='input_btn'
                        type='text'
                        placeholder='Enter your task'
                        value={taskname}
                        onChange={(e) => settaskname(e.target.value, id)} />
                    {message.taskname && <div id="error">{message.taskname}</div>}
                </div>
                <div className='input-container'>
                    <label>Status:</label>
                    <select className='input_btn' value={(status)} onChange={(e) => setstatus(e.target.value)}>
                        <option value='Completed'>Completed</option>
                        <option value='incomplete'>Incomplete</option>
                    </select>
                    {message.status && <span id='error'> {message.status}</span>}
                    {id ? <button id='btn' onClick={() => handleUpdate(id)}>UPDATE</button> : <button id='btn' type='submit' value='submit'>Submit</button>}
                </div>
            </form>

            <table className='table'>
                <tbody>
                    <tr>
                        <td>ID</td>
                        <td>TASK</td>
                        <td>STATUS</td>
                    </tr>
                    {tasks.map((t) => (

                        <tr>
                            <td>{t.id}</td>
                            <td>{t.title}</td>
                            <td><select value={(t.status)} onChange={(e) => handlestatusupdate(e.target.value, t.id)}>
                                <option value='Completed'>Completed</option>
                                <option value='incomplete'>Incomplete</option>
                            </select></td>
                            <td><button className='edit-btn' onClick={() => handledelete(t.id)} >DELETE</button></td>
                            <td><button className='delete-btn' onClick={() => handleEdit(t.id)} >EDIT</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default To_do