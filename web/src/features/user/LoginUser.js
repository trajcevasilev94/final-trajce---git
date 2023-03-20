import "./LoginUser.css";

import { useRef } from "react";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { fetchLoginUser } from "./userSlice";


export const Login = () => {

   const dispatch = useDispatch();

   const navigate = useNavigate();

   const email = useRef();

   const password = useRef();

   const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(fetchLoginUser({
         email: email.current.value,
         password: password.current.value
      }));
      return navigate('/');
   };

   return (

      <div className='container'>
         <div className="container__title-box">
            <h2 className="container__title-box--title">Log In</h2>
            <div className="container__title-box--line"></div>
         </div>
         <div className="container__login-box">
            <div className='container__login-box--description'>
               <h1><span>Welcome to</span> Baby's</h1>
               <p>All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
            </div>
            <form className='container__login-box--inputs' onSubmit={handleSubmit}>
               <label>
                  <span>Email:</span>
                  <input type="email" name="email" ref={email} />
               </label >
               <label>
                  <span>Password:</span>
                  <input type="password" name="password" ref={password} />
               </label>
               <button id="button">LOG IN</button>
            </form>
         </div>
      </div>

   );

};
