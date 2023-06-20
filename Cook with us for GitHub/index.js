if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const ejsMate = require('ejs-mate');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverRide =  require('method-override');

const User = require('./models/user');
const Recipe = require('./models/recipe');

const ExpressError = require('./utils/ExpressError');
const userRoutes = require('./routes/user');
const recipeRoutes = require('./routes/recipes');
const reviewsRoutes = require('./routes/review');
const adminRoutes = require('./routes/admin');

const passport = require('passport');
const LocalStrategy = require('passport-local');

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

app.use('/admin', adminRoutes);

app.use(express.urlencoded({extended: true}));
app.use(methodOverRide('_method'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/YourCollection')
.then(()=>{
    console.log("Connection open!");
})
.catch(err =>{
    console.log("Oh no!Error in MongoDB!");
    console.log(err);
});

const sessionConfig = {
    name: 'yourname',
    secret:'yoursecretword',
    resave:false,
    saveUninitialized: true,
    cookies:{
        httpOnly: true,
        secure:true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: Date.now() + 1000 * 60 * 60 * 24 * 7
    }
};

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next)=>{
    res.locals.currentUser = req.user;
    res.locals.currentPage = req.num;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.use('/user', userRoutes);
app.use('/recipes', recipeRoutes);
app.use('/recipes/:id/reviews', reviewsRoutes);

app.get('/', async(req, res)=>{
    const recipes = await Recipe.find().sort({likes:-1}).limit(10);
    res.render('home', {recipes})
});

app.all('*', (req, res, next)=>{
    next(new ExpressError('Page not found!', 404))
});

app.use((err, req, res, next)=>{
    const {statusCode = 500, message = 'Something went wrong'} = err;
    if(!err.message) err.message = 'There are some errors!'
    res.status(statusCode).render('error', {err});
});

app.listen(8000, ()=>{
    console.log('Listening on port')
});
