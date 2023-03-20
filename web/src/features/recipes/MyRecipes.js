import "./MyRecipes.css";

import { Link } from "react-router-dom";

import { RecipeExcerpt } from "./RecipeExcerpt";

import { useDispatch, useSelector } from "react-redux";

import { getUser } from "../user/userSlice";

import { fetchRecipes, getRecipes } from "./recipesSlice";

import { useEffect } from "react";


export const MyRecipes = () => {

   const recipes = useSelector(getRecipes);

   const dispatch = useDispatch();

   const { user } = useSelector(getUser);

   let myRecipes;

   if (recipes !== 0) {
      myRecipes = recipes.filter(recipe => recipe?.author_id === user?.uid);
   }

   useEffect(() => {
      dispatch(fetchRecipes());
   }, [dispatch]);


   return (
      <div className="container">
         <div className="container__title-box">
            <h2 className="container__title-box--title">My Recipes</h2>
            <div className="container__title-box--line"></div>
            <div className="container__button">
               <Link className="container__link" to="/recipes/create">
                  <img src="/icons/icon_plus_white.svg" alt="add icon" />
               </Link>
            </div>
         </div>
         <div className="container__table">
            <div className="container__table--title-box">
               <div className="inner-left">
                  <div><span>Recipe Title</span></div>
                  <div><span>Category</span></div>
                  <div><span>Created On</span></div>
               </div>
               <div className="inner-right"><span>Delete</span></div>
            </div>

            {myRecipes &&
               myRecipes.map(recipe => (
                  <RecipeExcerpt
                     key={recipe._id}
                     recipe={recipe}
                  />
               ))
            }

         </div>
      </div>
   );

};

