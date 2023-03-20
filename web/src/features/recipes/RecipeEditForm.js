import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { getRecipes } from "./recipesSlice";

import { getUser } from "../user/userSlice";

import { fetchUpdateRecipe } from "./recipesSlice";

import { storeFile } from "../../fetch/fetchRecipes";


export const RecipeEditForm = ({ recipeID }) => {

   const recipe = useSelector(getRecipes)
      .filter(recipe => recipe._id === recipeID)
      .reduce((acc, curr) => curr, {});

   const [data, setData] = useState(recipe);

   const user = useSelector(getUser);

   const navigate = useNavigate();

   const dispatch = useDispatch();

   const dataChange = e => {
      setData(prevState => prevState = {
         ...prevState,
         [e.target.name]: [e.target.name] !== ("preparation_time" || "number_persons") ? e.target.value : +e.target.value
      });
   };

   const uploadFile = async (e, token) => {
      try {
         e.preventDefault();
         let fileURI = await storeFile(e, token);
         return setData(prevState => prevState = { ...prevState, image_url: fileURI });
      } catch (err) {
         console.log(err.message);
         return err;
      }
   };

   const handleClick = (e) => {
      e.preventDefault();
      dispatch(fetchUpdateRecipe({ data, recipeID: recipe?._id }));
      return navigate('/recipes');
   };

   return (

      <div className="create-recipe">
         <div className="create-recipe__left-box">
            <span>Recipe Image</span>
            <img src={`/../../../uploads/${data?.image_url}`} alt="recipe pic" />
            <label className="file-upload"> UPLOAD
               <input
                  name="image_url"
                  type="file"
                  accept="image/*"
                  onChange={e => uploadFile(e, user?.user?.token)}
               />
            </label>
         </div>
         <div className="create-recipe__middle-box">
            <div>
               <label>
                  <span>Recipe Title</span>

                  <input
                     className="create-recipe__middle-box--title"
                     type="text"
                     name="title"
                     value={data.title}
                     onChange={dataChange}
                  />
               </label>
            </div>
            <div className="create-recipe__middle-box--inner-middle">
               <label className="category" htmlFor="category" >
                  <span>Category</span><br />

                  <select
                     name="category"
                     defaultValue={data.category}
                     onChange={dataChange}
                     id="category"
                  >
                     <option value=''></option>
                     <option value="breakfast">Breakfast</option>
                     <option value="brunch">Brunch</option>
                     <option value="lunch">Lunch</option>
                     <option value="dinner">Dinner</option>
                  </select>
               </label>
               <label>
                  <span>Preparation Time</span>
                  <input
                     className="preparation-time"
                     type="text"
                     name="preparation_time"
                     value={data.preparation_time}
                     onChange={dataChange}
                  />
               </label>
               <label >
                  <span>No. People</span>
                  <input
                     className="persons-number"
                     type="text"
                     name="number_persons"
                     value={data.number_persons}
                     onChange={dataChange}
                  />
               </label>
            </div>
            <label className="create-recipe__middle-box--short-description">
               <span>Short Description</span>
               <textarea
                  name="short_description"
                  value={data.short_description}
                  onChange={dataChange}
               />
            </label>
            <button id="button" onClick={handleClick}>Save</button>
         </div>
         <div className="create-recipe__right-box">
            <label>
               <span>Recipe</span>
               <textarea
                  name="long_description"
                  value={data.long_description}
                  onChange={dataChange}
               />
            </label>
         </div>
      </div>

   );
};
