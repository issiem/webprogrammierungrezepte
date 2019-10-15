
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
    res.status(404).json(recipes);
    return;
  }

  // override the recipes with the filtered array
  recipes = afterReduction;
  res.status(202).json(recipes);
});


app.listen(3000);