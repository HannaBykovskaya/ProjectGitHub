const express  = require('express');
const router = express.Router({mergeParams: true});
const catchAsync  = require('../utils/catchAsync');
const ExpressError  = require('../utils/ExpressError');
const Recipe = require('../models/recipe');
const Review = require('../models/review');

const {isLoggedIn}  = require('../middleware.js');

const multer = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({storage});

router.post('/', isLoggedIn, upload.array('image'), catchAsync(async(req, res)=>{
    const recipe = await Recipe.findById(req.params.id);
    const review = new Review(req.body.review);
    review.images =  req.files.map(f =>({url: f.path, filename: f.filename }));
    review.author = req.user._id;
    recipe.reviews.push(review);
    await review.save();
    await recipe.save();
   console.log(review)
    req.flash('success', 'You Created a new Review!') 
    res.redirect(`/recipes/${recipe._id}`)
}));


router.delete('/:reviewId', isLoggedIn, catchAsync(async(req, res)=>{
    const { id, reviewId } = req.params; 
    const recipe = await Recipe.findByIdAndUpdate(id, {$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId)
    req.flash('success', 'Review is deleted!') 
    res.redirect(`/recipes/${recipe._id}`)
}));

module.exports = router;