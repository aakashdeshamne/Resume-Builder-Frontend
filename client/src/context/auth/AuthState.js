import React , { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';
import { 
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
 } from '../types';

 const AuthState = props => {
     
    const initialState = {
        token : localStorage.getItem('token'),
        isAuthenticated : null ,
        loading : true ,
        error : null ,
        user : null
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    //Load User

    const loadUser = async () => {

        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }

        try {
            const res = await axios.get('/api/auth');

            dispatch({ 
                type : USER_LOADED , 
                payLoad : res.data 
            });
        } catch (err) {
            dispatch({
                type : AUTH_ERROR
            });
        }
    }

    //Register User

    const register = async formData =>{

        const config = {
            headers : {
                'Content-Type':'application/json'
            }
        }

        try {
            const res = await axios.post('/api/users', formData , config);

            dispatch({
                type : REGISTER_SUCCESS,
                payLoad : res.data
            });

            loadUser();
        } catch (err) {
            dispatch({
                type :REGISTER_FAIL,
                payLoad : err.response.data.msg
            });
        }
    }

    //Login User

    const login = async formData => {

        const config = {
            headers : {
                'Content-Type' : 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/auth', formData ,config);

            dispatch({
                type : LOGIN_SUCCESS,
                payLoad : res.data
            });

            loadUser();
        } catch (err) {
            dispatch({
                type : LOGIN_FAIL,
                payLoad : err.response.data.msg
            });
        }
    }

    //Logout

    const logout = () => dispatch({ type: LOGOUT });

    //Clear Errors

    const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated : state.isAuthenticated,
                loading : state.loading,
                error : state.error,
                user : state.user,
                register,
                clearErrors,
                loadUser,
                login,
                logout
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
 }

 export default AuthState;