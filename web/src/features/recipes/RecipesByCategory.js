import "./Home.css";

import { useEffect } from "react";

import { useParams } from "react-router-dom";

import { RecipesBody } from "./RecipesBody";

import { useDispatch, useSelector } from "react-redux";

import { fetchRecipes, getRecipes } from "./recipesSlice";


export const RecipesByCategory = () => {

   const { category } = useParams();

   const dispatch = useDispatch();

   const recipesStore = useSelector(getRecipes);

   let recipes;

   if (recipesStore.length !== 0) {
      recipes = recipesStore.filter(recipe => recipe.category === category);
   }

   useEffect(() => {
      dispatch(fetchRecipes());
   }, [dispatch]);


   return (
      <div className="container">
         <div className="container__title-box">
            <h2 className="container__title-box--title">{category}</h2>
            <div className="container__title-box--line"></div>
         </div>

         {recipes && <div className="container__recipes">
            {recipes &&
               recipes.map(recipe => (
                  <RecipesBody
                     key={recipe._id}
                     recipe={recipe}
                  />
               ))}
         </div>}
      </div>
   );
};
