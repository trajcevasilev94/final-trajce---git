import { useCallback, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getUser } from "../user/userSlice";

import { fetchUpdateRecipe } from "./recipesSlice";

import { ViewRecipe } from "./ViewRecipe";


export const RecipesBody = ({ recipe }) => {

   const dispatch = useDispatch();

   const { user } = useSelector(getUser);

   const [view, setView] = useState(false);

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
      <article className="recipe">
         <img
            className="recipe__image"
            src={`../../uploads/${recipe.image_url}`}
            alt="recipe pic"
         />
         <div className="recipe__description-box">
            <span className="recipe__description-box--title">{recipe.title}</span>
            <p className="recipe__description-box--description">
               {recipe.short_description.substring(0, 200)}...
            </p>
            <div className="recipe__description-box--icons">
               <div>
                  <img src="/icons/icon_time.svg" alt="clock pic" />
                  <h3>{recipe.preparation_time} min</h3>
               </div>
               <div>
                  <img src="/icons/icon_plate.svg" alt="plate pic" />
                  <h3>{recipe.number_persons} persons</h3>
               </div>
               <div>

                  {!user?.isLoggedIn && <img
                     className="star-icon"
                     src="/icons/icon_star.svg"
                     alt="star pic"
                  />}

                  {user?.isLoggedIn && <img
                     className="star-icon" alt="star pic"
                     src="/icons/icon_star.svg"
                     onClick={handleClick}
                  />}

                  <h3>{recipe.likes}</h3>
               </div>
            </div>
         </div>
         <div className="recipe__category">
            <p>{recipe.category}</p>
         </div>
         <div className="recipe__icon" onClick={() => setView(prevState => !prevState)}>
            <img src="/icons/icon_arrows_white.svg" alt="arrowIcon" />
         </div>

         {view &&
            <div className="modal">
               <ViewRecipe
                  recipe={recipe}
                  setView={setView}
                  user={user}
               />
            </div>
         }
      </article>
   );

};
