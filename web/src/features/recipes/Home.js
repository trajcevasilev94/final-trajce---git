import "./Home.css";

import { RecipesBody } from "./RecipesBody";

import { useDispatch, useSelector } from "react-redux";

import { fetchRecipes, getRecipes } from "./recipesSlice";

import { useEffect } from "react";


export const Home = () => {

   const recipes = useSelector(getRecipes);

   let recipesByNewestDate;

   let recipesByMostLikes;

   const dispatch = useDispatch();

   console.log(recipes);
   if (recipes.length !== 0) {
      recipesByNewestDate = recipes
         .map(recipe => recipe = { ...recipe, created_on: Date.parse(recipe.created_on) })
         .splice(0, 3);

      recipesByMostLikes = recipes
         .map(recipe => recipe)
         .sort((a, b) => b.likes - a.likes)
         .splice(0, 6);
   }

   useEffect(() => {
      dispatch(fetchRecipes());
   }, [dispatch]);


   return (
      <div className="home">
         <div className="container">
            <div className="container__title-box">
               <h2 className="container__title-box--title">Fresh & new</h2>
               <div className="container__title-box--line"></div>
            </div>


            {recipes.length !== 0 &&
               <div className="container__recipes">
                  {recipesByNewestDate.map(recipe => (
                     <RecipesBody
                        key={recipe?._id}
                        recipe={recipe}
                     />
                  ))}
               </div>
            }

            {recipes.length !== 0 &&
               <div className="container__title-box">
                  <h2 className="container__title-box--title">Most Popular Recipes</h2>
                  <div className="container__title-box--line"></div>
               </div>
            }

            {recipes.length !== 0 &&
               <div className="container__recipes">
                  {recipesByMostLikes.map(recipe => (
                     <RecipesBody
                        key={recipe?._id}
                        recipe={recipe}
                     />
                  ))}
               </div>
            }

         </div>
      </div>
   );
};
