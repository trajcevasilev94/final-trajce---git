import "./CreateRecipes.css";

import { Link } from "react-router-dom";

import { RecipeCreateForm } from "./RecipeCreateForm";


export const CreateRecipes = () => {

   return (
      <div className="container">
         <div className="container__title-box">
            <h2 className="container__title-box--title">My Recipes</h2>
            <div className="container__title-box--line"></div>
            <div className="container__button">
               <Link className="container__link" to="/recipes">
                  <img src="/icons/icon_back_white.svg" alt="back icon" />
               </Link>
            </div>
         </div>
         <RecipeCreateForm />
      </div>
   );

};
