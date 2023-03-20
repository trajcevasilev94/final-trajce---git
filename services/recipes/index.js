const config = require('../../pkg/config/index');
const express = require('express');
const { expressjwt: jwt } = require('express-jwt');
const recipes = require('./handlers/recipes');
const db = require('../../pkg/db/index');
const api = express();

db.init();

api.use(express.json());

api.get('/api/v1/recipes/category/:category', recipes.getByCategory);

api.use(
   jwt({
      algorithms: ['HS256'],
      secret: config.get('security').jwt_secret
   }).unless({
      path: [
         "/api/v1/recipes/all",
         "/api/v1/recipes/get-recipe/:id",
         "/api/v1/recipes/category/:category",
         "/api/v1/recipes/create"
      ]
   })
);

api.get('/api/v1/recipes/all', recipes.getAll);
api.get('/api/v1/recipes/my', recipes.getMyRecipes);
api.get('/api/v1/recipes/get-recipe/:id', recipes.getRecipe);

api.post('/api/v1/recipes/create', recipes.createRecipe);

api.put('/api/v1/recipes/update-recipe/:id', recipes.update);

api.delete('/api/v1/recipes/recipe/:id', recipes.remove);

api.listen(config.get('services').proxy.recipes, err => {
   if (err) {
      return console.log(err);
   }
   console.log('Service [recipes] successfully started on port', config.get('services').proxy.recipes);
});
