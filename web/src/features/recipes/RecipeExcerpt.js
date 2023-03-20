import "./RecipeExcerpt.css";

import { format } from "date-fns";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { fetchDeleteRecipe } from "./recipesSlice";

import { useCallback } from "react";


export const RecipeExcerpt = ({ recipe }) => {

   const navigate = useNavigate();

   const dispatch = useDispatch();

   const handleDelete = useCallback(() => {
      dispatch(fetchDeleteRecipe({ recipeID: recipe?._id }));
      return navigate('/recipes');
   }, [dispatch, navigate, recipe?._id]);


   return (

      <div className="recipe-excerpt">
         <div
            className="recipe-excerpt__inner-left"
            onClick={() => navigate(`/recipes/${recipe._id}`)}
         >
            <div className="recipe-excerpt__inner-left--title">{recipe.title}</div>
            <div className="recipe-excerpt__inner-left--category">{recipe.category}</div>
            <div className="recipe-excerpt__inner-left--date">
               {format(new Date(recipe.created_on), 'dd.MM.yyyy')}
            </div>
         </div>
         <div className="recipe-excerpt__inner-right" onClick={handleDelete}>
            <img src="/icons/icon_trashcan.svg" alt="remove icon" />
         </div>
      </div>

   );
};
