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

export default (state , action) => {

    switch (action.type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token' , action.payLoad.token);
            return{
                ...state,
                ...action.payLoad,
                isAuthenticated : true,
                loading : false
            };
            
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token : null,
                isAuthenticated : false,
                loading : false,
                user : null,
                error : action.payLoad
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error : null
            };

        case USER_LOADED:
            return{
                ...state,
                isAuthenticated :true,
                loading : false,
                user : action.payLoad
            };
        default:
            return state;
    }
 }