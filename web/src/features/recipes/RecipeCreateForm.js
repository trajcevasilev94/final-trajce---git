import { useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { fetchCreateRecipe } from "./recipesSlice";

import { getUser } from "../user/userSlice";

import { storeFile } from "../../fetch/fetchRecipes";


export const RecipeCreateForm = () => {

   const title = useRef('');
   const category = useRef('');
   const preparation_time = useRef('');
   const number_persons = useRef('');
   const short_description = useRef('');
   const long_description = useRef('');

   const [filename, setFilename] = useState();

   const { user } = useSelector(getUser);

   const dispatch = useDispatch();

   const navigate = useNavigate();

   const uploadFile = async (e, token) => {
      try {
         e.preventDefault();
         let fileURI = await storeFile(e, token);
         return setFilename(prevState => prevState = fileURI);
      } catch (err) {
         console.log(err.message);
         return err;
      }
   };

   const handleSubmit = e => {
      e.preventDefault();
      const data = {
         image_url: filename,
         title: title.current.value,
         category: category.current.value,
         preparation_time: +preparation_time.current.value,
         number_persons: +number_persons.current.value,
         short_description: short_description.current.value,
         long_description: long_description.current.value
      };
      dispatch(fetchCreateRecipe(data));
      navigate('/recipes');
   };

   return (

      <form className="create-recipe" onSubmit={handleSubmit}>
         <div className="create-recipe__left-box">
            <span>Recipe Image</span>
            {filename &&
               <img src={`/../../../uploads/${filename}`} alt="recipe pic" />}
            {!filename &&
               <img src="/images/recipe.jpg" alt="recipe pic" />}
            <label className="file-upload"> UPLOAD
               <input
                  name="image_url"
                  type="file"
                  accept="image/*"
                  onChange={(e) => uploadFile(e, user?.token)}
               />
            </label>
         </div>
         <div className="create-recipe__middle-box">
            <div>
               <label>
                  <span>Recipe Title</span>
                  <input className="create-recipe__middle-box--title" type="text" name="title" ref={title} />
               </label>
            </div>
            <div className="create-recipe__middle-box--inner-middle">
               <label htmlFor="category" className="category">
                  <span>Category</span><br />
                  <select name="category" ref={category} id="category" >
                     <option defaultValue=''></option>
                     <option value="breakfast">Breakfast</option>
                     <option value="brunch">Brunch</option>
                     <option value="lunch">Lunch</option>
                     <option value="dinner">Dinner</option>
                  </select>
               </label>
               <label className="preparation-time">
                  <span>Preparation Time</span>
                  <input type="number" name="preparation_time" ref={preparation_time} />
               </label>
               <label className="persons-number">
                  <span>No. People</span>
                  <input
                     type="number"
                     name="number_persons"
                     ref={number_persons}
                  />
               </label>
            </div>
            <label className="create-recipe__middle-box--short-description">
               <span>Short Description</span>
               <textarea name="short_description" ref={short_description} />
            </label>
            <button id="button">Save</button>
         </div>
         <div className="create-recipe__right-box">
            <label>
               <span>Recipe</span>
               <textarea name="long_description" ref={long_description} />
            </label>
         </div>
      </form>

   );
};
