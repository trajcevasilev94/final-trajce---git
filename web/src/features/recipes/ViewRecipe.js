import "./ViewRecipe.css";

import { useDispatch } from "react-redux";

import { fetchUpdateRecipe } from "./recipesSlice";

import { useCallback } from "react";


export const ViewRecipe = ({ setView, recipe, user }) => {

   const dispatch = useDispatch();

   const handleClick = useCallback((e) => {
      e.preventDefault();

      if (recipe?.author_id === user?.uid) {
         dispatch(fetchUpdateRecipe({
            data: { ...recipe, likes: recipe.likes + 1 },
            recipeID: recipe._id
         }));
      }

   }, [dispatch, recipe, user?.uid]);


   return (
      <>
         {recipe && <article className="view-recipe">
            <div className="view-recipe__title-box">
               <h1>{recipe.title}</h1>
               <img
                  src="/icons/icon_close.svg"
                  alt="Close icon"
                  onClick={() => setView(prevState => !prevState)}
               />
            </div>
            <div className="view-recipe__container-box">
               <div className="view-recipe__container-box--left-section">
                  <img
                     className="view-recipe__img"
                     src={`../../uploads/${recipe.image_url}`}
                     alt="recipe"
                  />
                  <div className="view-recipe__title-category">
                     <h2>Best served for</h2>
                     <div className="view-recipe__category">
                        <p>{recipe.category}</p>
                     </div>
                  </div>
                  <p className="view-recipe__short-description">{recipe.short_description.substring(0, 330)}</p>
                  <div className="view-recipe__icons">
                     <div className="view-recipe__icons--container">
                        <img src="/icons/icon_time.svg" alt="clock icon" />
                        <h3>{recipe.preparation_time} min</h3>
                     </div>
                     <div className="view-recipe__icons--container">
                        <img src="/icons/icon_plate.svg" alt="plate icon" />
                        <h3>{recipe.number_persons} persons</h3>
                     </div>
                     <div className="view-recipe__icons--container">

                        {!user?.isLoggedIn &&
                           <img
                              className="star-icon"
                              src="/icons/icon_star.svg"
                              alt="star pic"
                           />}

                        {user?.isLoggedIn &&
                           <img
                              className="star-icon" alt="star pic"
                              src="/icons/icon_star.svg"
                              onClick={handleClick}
                           />}

                        <h3>{recipe.likes}</h3>
                     </div>
                  </div>
               </div>
               <div className="view-recipe__right-section">
                  <h2>Recipe Details</h2>
                  <p className="view-recipe__details">{recipe.long_description}</p>

               </div>
            </div>
         </article>}
      </>
   );

};
