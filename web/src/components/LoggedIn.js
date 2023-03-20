import "./Navbar.css";

import { Link } from 'react-router-dom';

import { useDispatch } from "react-redux";

import { logoutUser } from "../features/user/userSlice";


export const LoggedIn = () => {

   const dispatch = useDispatch();

   return (

      <div className="navbar__logged-in">
         <Link
            to='/recipes'
            className="navbar__logged-in--links one"
         >MY RECIPES</Link>
         <div className='navbar__logged-in--circles'></div>
         <Link
            to='/users/edit'
            className="navbar__logged-in--links two"
         >MY PROFILE</ Link>
         <div className='navbar__logged-in--circles'></div>
         <Link
            to='/users'
            className="navbar__logged-in--links three"
            onClick={() => dispatch(logoutUser())}
         >LOG OUT</Link>
      </div>

   );

};
