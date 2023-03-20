import "./EditUser.css";

import { useCallback, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { fetchUpdateUser, getUser } from "./userSlice";

import { fetchUser } from "../../fetch/fetchUsers";

import { storeFile } from "../../fetch/fetchRecipes";


export const EditUser = () => {

   const { user } = useSelector(getUser);

   const dispatch = useDispatch();

   const [data, setData] = useState(null);

   useEffect(() => {
      (async () => {
         try {
            let output = await fetchUser(user?.token);
            return setData(prevState => prevState = output);
         } catch (err) {
            console.log(err.message);
            return err;
         }
      })();
   }, [user?.token]);

   const uploadFile = async (e) => {
      try {
         e.preventDefault();
         let filename = await storeFile(e, user?.token);
         return setData(prevState => prevState = { ...prevState, image_url: filename });
      } catch (err) {
         console.log(err.message);
         return err;
      }
   };

   const dataChange = (e) => {
      setData(prevState => {
         return {
            ...prevState,
            [e.target.name]: ['birthday'] ? new Date(e.target.value) : e.target.value
         };
      });
   };

   const handleSubmit = useCallback((e) => {
      e.preventDefault();
      console.log(data);
      dispatch(fetchUpdateUser(data));
   }, [data, dispatch]);


   return (

      <div className="container">
         <div className="container__title-box">
            <h2 className="container__title-box--title">My Profile</h2>
            <div className="container__title-box--line"></div>
         </div>

         {data && <div className="edit-user">
            <div className="edit-user__image-box">
               <img src="/images/profile.png" alt="Avatar Img" />
               <label className="file-upload"> CHANGE AVATAR
                  <input
                     name="image_url"
                     type="file"
                     accept="image/*"
                     onChange={uploadFile}
                  />
               </label>
            </div>
            <div className="container__input-box">
               <form
                  className="form__inputs"
                  onSubmit={handleSubmit}
               >
                  <label>
                     <span>First Name</span>
                     <input
                        type="text"
                        name="first_name"
                        value={data.first_name}
                        onChange={dataChange}
                     />
                  </label>
                  <label>
                     <span>Last Name</span>
                     <input
                        type="text"
                        name="last_name"
                        value={data.last_name}
                        onChange={dataChange}
                     />
                  </label>
                  <label>
                     <span>Email</span>
                     <input
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={dataChange}
                     />
                  </label>
                  <label>
                     <span>Birthday</span>
                     <input
                        type="date"
                        name="birthday"
                        value={data.birthday}
                        onChange={dataChange}
                     />
                  </label>
                  <label className="last__two">
                     <span >Password</span>
                     <input
                        type="password"
                        name="password"
                        onChange={dataChange}
                     />
                  </label>
                  <label className="last__two">
                     <span>Repeat password</span>
                     <input
                        type="password"
                        name="password2"
                        onChange={dataChange}
                     />
                  </label>
                  <button id="button">Save</button>
               </form>
            </div>
         </div>}
      </div>

   );

};
