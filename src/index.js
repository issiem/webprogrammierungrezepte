
const express = require('express');
const app = express();

let recipes = require('../recipes.json');
let idCount = recipes.length;


app.use(express.static('./public'));
app.use(express.json());

// get all recipies
app.get('/recipes', (req, res) => {
  res.status(200).json(recipes);
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
    res.status(404).send();
    return;
  }

  // override the recipes with the filtered array
  recipes = afterReduction;
  res.status(202).json(recipes);
});

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
app.listen(3000);