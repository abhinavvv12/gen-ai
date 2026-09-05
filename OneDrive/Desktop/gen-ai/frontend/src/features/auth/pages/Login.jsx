import React from 'react'
import { useNavigate, Link } from 'react-router'


const Login = () => {
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault()
    }
    return (
        <main>
            <form onSubmit={submitHandler}>
                <div className="container">
                    <h1>Login</h1>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' placeholder='Enter email address' />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' placeholder='Enter your password' />
                    </div>
                    <button className='button primary-button' >Login</button>
                    <p>Don't have an account? <Link to={'/register'} >Register</Link></p>
                </div>
            </form>
        </main>
    )
}

export default Login
