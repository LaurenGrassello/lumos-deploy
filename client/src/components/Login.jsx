import React, { useState } from 'react'
import axios from "axios"
import { useHistory, Link} from 'react-router-dom'

const Login = () => {
    const [errors, setErrors] = useState()
    const history = useHistory()
    const [user, setUser] = useState({
        email: " ",
        password: " "
    })

    const changeHandler = (e) => {
        e.preventDefault()
        let { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:8000/api/login`, user, { withCredentials: true })
            .then(res => history.push(`/chat`))
            .catch(err => {
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                console.log(errorResponse);
                for (const entry of Object.entries(errorResponse)) {
                    errorArr.push(entry)
                }
                setErrors(errorArr)
            });
    }

    return (
        <div className="container">
        <nav className='nav'>
        <Link className="btn-flat waves-effect"  style={{ textDecoration: 'none', color:'#bc9f06'}} to='/register'>Register New User</Link> 
        | 
        <Link className="btn-flat waves-effect" style={{ textDecoration: 'none', color:'#bc9f06'}} to='/'>Return Home</Link>
        </nav>
        <h2 className='logo'>Lumos Chat</h2>
        <div style={{ marginTop: "4rem" }} className="row">
        <div className="col s8 offset-s2">
            <form onSubmit={submitHandler}>
                <div>
                    <label style={{color: '#bc9f06'}}>Email</label>
                    <input type="text" name="email" value={user.email} onChange={changeHandler} />
                </div>
                {errors && errors.filter(error=>error[0]==='email').map((err, idx)=>(<div key={idx}>{err[1].message}</div>))}
                <div>
                    <label style={{color: '#bc9f06'}}>Password</label>
                    <input type="password" name="password" value={user.password} onChange={changeHandler} />
                </div>
                {errors && errors.filter(error=>error[0]==='password').map((err, idx)=>(<div key={idx}>{err[1].message}</div>))}
                <button className="btn-flat waves-effect" style={{ textDecoration: 'none', color:'#bc9f06'}}> Login </button>
            </form>
            </div>
            </div>
        </div>
    )
}

export default Login