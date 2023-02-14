const express = require('express');
const Recipe = require('../models/recipe');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const {isLoggedIn} = require('../middleware');

const categories = ['Breakfast', 'Lunch', 'Salads', 'Desserts'];

router.get('/new', isLoggedIn, catchAsync(async (req, res)=>{
    res.render('./recipes/new', {categories})
}));

router.post('/new', isLoggedIn, catchAsync(async (req, res)=>{
    const {title, category, ingredients, description, image} = req.body;
    const recipe = new Recipe({title, category, description, ingredients, description, image, author: req.user._id});
    await recipe.save();
    req.flash('success', 'You add a new Recipe!')
    res.redirect('/recipes/new')
}));

//for pagination
 function getAll(page = 1, category) {
    const pageSize = 10;
    const skip = (page -1) * pageSize;
    return Recipe.find({category: category}).sort({_id:1}).skip(skip).limit(pageSize);
};

router.get('/breakfast/:num', catchAsync(async(req, res)=>{
    let page = parseInt(req.params.num);
    let numNext, numPrev;
    if(page === 1){
        numNext = page + 1;
        numPrev = 1;
    } else if(page === 3){
        numNext = 3;
        numPrev = page - 1;
    } else{
        numNext = page + 1;
        numPrev = page - 1;
    }
 
    let recipes = await getAll(page, 'Breakfast');
    res.render('./recipes/breakfast', {recipes, page, numNext, numPrev})
}));

router.get('/lunch/:num', catchAsync(async(req, res)=>{
    let page = parseInt(req.params.num);
    let numNext;
    let numPrev;

    if(page === 1){
        numNext = page + 1;
        numPrev = 1;
    } else if(page === 3){
        numNext = 3;
        numPrev = page - 1;
    } else{
        numNext = page + 1;
        numPrev = page - 1;
    }
    let recipes = await getAll(page, 'Lunch');
    res.render('./recipes/lunch', {recipes, page, numNext, numPrev})
}));


router.get('/salads/:num', catchAsync(async(req, res)=>{
    let page = parseInt(req.params.num);
    let numNext;
    let numPrev;
    if(page === 1){
        numNext = page + 1;
        numPrev = 1;
    } else if(page === 3){
        numNext = 3;
        numPrev = page - 1;
    } else{
        numNext = page + 1;
        numPrev = page - 1;
    }
    let recipes = await getAll(page, 'Salads');
     res.render('./recipes/salads', {recipes, page, numNext, numPrev})
}));


router.get('/desserts/:num', catchAsync(async(req, res)=>{
    let page = parseInt(req.params.num);
    let numNext;
    let numPrev;

    if(page === 1){
        numNext = page + 1;
        numPrev = 1;
    } else if(page === 3){
        numNext = 3;
        numPrev = page - 1;
    } else{
        numNext = page + 1;
        numPrev = page - 1;
    }
    let recipes = await getAll(page, 'Desserts');
    res.render('./recipes/desserts', {recipes, page, numNext, numPrev})
}));

router.get('/:id', catchAsync(async(req, res)=>{
    let recipe = await Recipe.findById(req.params.id).populate({
        path:'reviews',
        populate:{
        path:'author'
        }
        }).populate({
            path:'author'});  

    res.render('./recipes/show', {recipe})
}));

//likes GET
router.get('/:id/likes', catchAsync(async(req, res)=>{
    const recipe = await Recipe.findByIdAndUpdate(req.params.id);
    res.render('./recipes/likes', {recipe})
}));

//like a recipe
router.put('/:id', catchAsync(async (req, res) => {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id);
if(!recipe.likes.includes(req.user._id)){
    await recipe.updateOne({ $push: { likes: req.user._id } });  
}
}));

router.delete('/:id', catchAsync(async (req, res) => {
    await Recipe.deleteOne({author: req.user}); 
    req.flash('success',' You delete a this recipe successfully');
    res.redirect('/');
}));

router.get('/:id/edit', isLoggedIn, catchAsync(async(req, res)=>{
    const recipe = await Recipe.findByIdAndUpdate(req.params.id).populate({
        path: 'ingredients'
    });
    res.render('./recipes/edit', {recipe, categories})
}));

router.post('/:id/edit', isLoggedIn, catchAsync(async(req, res)=>{
    const recipe = await Recipe.findByIdAndUpdate(req.params.id,  {...req.body});
    await recipe.save();
    req.flash('success',' You edit this recipe successfully');
    res.redirect(`/recipes/${recipe._id}`)
}));

module.exports = router;