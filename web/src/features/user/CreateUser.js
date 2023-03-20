import "./CreateUser.css";

import { useCallback, useRef } from "react";

import { useNavigate } from "react-router-dom";

import { createUser } from "../../fetch/fetchUsers";


export const CreateUser = () => {

   const email = useRef();

   const first_name = useRef();

   const last_name = useRef();

   const birthday = useRef();

   const password = useRef();

   const password2 = useRef();

   const navigate = useNavigate();

   const handleSubmit = useCallback(e => {
      e.preventDefault();
      createUser({
         email: email.current.value,
         first_name: first_name.current.value,
         last_name: last_name.current.value,
         birthday: new Date(birthday.current.value),
         password: password.current.value,
         password2: password2.current.value
      });
      return navigate('/users');
   }, [navigate]);

   return (

      <div className="container">
         <div className="container__title-box">
            <h2 className="container__title-box--title">Create Account</h2>
            <div className="container__title-box--line"></div>
         </div>
         <div className="container__create-user">
            <div className="container__create-user--description-box">
               <h1><span>Create your</span> <br /> account</h1>
               <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis minima suscipit dolorem maiores aliquam possimus recusandae saepe quibusdam atque fugit nihil tempora quisquam ipsam repellendus veritatis animi, ratione, delectus pariatur.
               </p>
            </div>
            <div className="container__create-user--input-box">
               <form className="create-user__inputs" onSubmit={handleSubmit}>
                  <label>
                     <span>First Name</span>
                     <input
                        type="text"
                        name="first_name"
                        ref={first_name}
                     />
                  </label>
                  <label>
                     <span>Last Name</span>
                     <input
                        type="text"
                        name="last_name"
                        ref={last_name}
                     />
                  </label>
                  <label>
                     <span>Email</span>
                     <input
                        type="email"
                        name="email"
                        ref={email}
                     />
                  </label>
                  <label>
                     <span>Birthday</span>
                     <input
                        type="date"
                        name="birthday"
                        ref={birthday}
                     />
                  </label>
                  <label>
                     <span>Password</span>
                     <input
                        type="password"
                        name="password"
                        ref={password}
                     />
                  </label>
                  <label>
                     <span>Retype password</span>
                     <input
                        type="password"
                        name="password2"
                        ref={password2}
                     />
                  </label>
                  <button id="button" className="create-user__inputs--button">Create Account</button>
               </form>
            </div>
         </div>
      </div >

   );

};
