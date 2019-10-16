// this backend is based on express-framework
const express = require('express');
const app = express();

// where to found recipes.json for data retention
let recipes = require('../recipes.json');
// total number of recipes, needed by create and delete methods
let idCount = recipes.length;

// make index.html and other public ressources accessible
app.use(express.static('./public'));
app.use(express.json());

// get all recipies
app.get('/recipes', (req, res) => {
  res.status(200).json(recipes);
});

// get specific recipe
app.get('/recipes/:id', (req, res) => {
  // make sure its a number, because a url parameter is always a string
  const id = Number(req.params.id);
  // filter out if it has the same id
  recipe = recipes.find(x => x.id == id);
  res.status(200).json(recipe);
});


// create a new recipe
app.post('/recipes', (req, res) => {
  const recipe = req.body;
  recipe.id = ++idCount;

  recipes.push(recipe);

  res.status(201).json(recipe);
});

// remove a recipe
app.delete('/recipes/:id', (req, res) => {
  // make sure its a number, because a url parameter is always a string
  const id = Number(req.params.id);
  // filter out if it has the same id
  const afterReduction = recipes.filter(x => x.id !== id);

  // the length is not equal if a recipe was removed
  if (afterReduction.length === recipes.length) {
    res.status(404).json(recipes);
    return;
  }

  // override the recipes with the filtered array
  recipes = afterReduction;
  res.status(202).json(recipes);
});

// this method is created by Franziska and Annika and not tested yet.
app.put('/recipes/:id', (req, res) => {
  const editedRecipe = req.body
  let id = req.param.id;

  let recipeObj = recipes[id];
  if (recipeObj === undefined || recipeObj === null) {
    res.status(404).json({ "error": "Recipe not found" });
  } else {
    recipeObj.id = editedRecipe.id;
    recipeObj.title = editedRecipe.titel;
    recipeObj.ingredients = editedRecipe.ingredients;
    recipeObj.instruction = editedRecipe.instruction;
    recipeObj.author = editedRecipe.author;

    recipes.splice(id, 1, recipeObj);

    console.log(recipes);
    res.status(200).json(recipes);

  }
});
// you can access this webserver on port 3000
app.listen(3000);