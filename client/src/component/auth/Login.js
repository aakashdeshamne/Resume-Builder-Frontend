import React , { useState, useContext , useEffect } from 'react';

import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Login = (props) => {

    const authContext = useContext(AuthContext);

    const alertContext = useContext(AlertContext);

    const { setAlert } = alertContext;

    const { login , error , clearErrors , isAuthenticated } = authContext;

    useEffect(() => {

        if (isAuthenticated) {
            props.history.push('/');
        }

        if (error === 'Invalid User ') {
            setAlert(error ,'danger');
            clearErrors();
        }

        //eslint-disable-next-line
    }, [error , isAuthenticated , props.history]);

    const [user , setUser] = useState({
        email : '',
        password : ''
    });

    const { email , password } = user;

    const onChange = e => setUser({ ...user , [e.target.name] : e.target.value });

    const onSubmit = e => {

        e.preventDefault();
        if (email === '' || password === '') {
            setAlert('Please fill the fields to proceed', 'warning');
        } else {
            login({
                email,
                password
            });
        }
    }

    return (
        <div className='form-container'>
            <h1>
                Account <span className='text-primary'>Login</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='email'>Email :</label>
                    <input type='email' name='email' value={email} onChange={onChange}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password :</label>
                    <input type='password' name='password' value={password} onChange={onChange}/>
                </div>
                <button type='submit' className='btn btn-dark btn-block'>Login</button>
            </form>
        </div>
    )
}

export default Login;