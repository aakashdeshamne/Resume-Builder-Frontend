import React , { Fragment , useContext } from 'react';
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';
import EventContext from '../../context/event/eventContext';


const Navbar = ({ title , icon }) => {

    const authContext = useContext(AuthContext);

    const eventContext = useContext(EventContext);

    const { isAuthenticated , logout , user } = authContext;

    const { clearEvents } = eventContext;

    const onLogout = () => {
        logout();
        clearEvents();
    }

    const authLinks = (
        <Fragment>
            <li>Hello { user && user.name }</li>
            <li>
                <a onClick={onLogout} href="#!">
                    <i className="fas fa-sign-out-alt"></i> <span className='hide-sm'>Logout</span>
                </a>
            </li>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <li>
                <NavLink to='/register'>Sign Up</NavLink>
            </li>
            <li>
                <NavLink to='/login'>Sign In</NavLink>
            </li>
        </Fragment>
    );

    return (
        <div className="navbar bg-primary">
            <h1><i className={icon}/> {title} </h1>
            <ul>
                { isAuthenticated ? authLinks : guestLinks }
            </ul>
        </div>
    )
}

Navbar.propTypes = {
    title : PropTypes.string.isRequired,
    icon : PropTypes.string,
}

Navbar.defaultProps = {
    title : 'Event Planner',
    icon : 'fas fa-calendar-alt'
}

export default Navbar