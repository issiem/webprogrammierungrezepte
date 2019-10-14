	
const express = require('express');
const app = express();

const recipes = require('./recipes.json');

let idCount = recipes.length;

app.use(express.static('public'));
app.use(express.json());
  
app.get('/recipes', (req, res) => {
  res.json(recipes);
});

app.post('/recipes', (req, res) => {
  const recipe = req.body;
  recipe.id = ++idCount;

  recipes.push(recipe);

  res.status(201).json(recipe);
});

app.delete('/recipes/:id', (req, res) => {
  recipes.delete(req.body);
res.status(201).json(req.body);
});
  
app.listen(3000);