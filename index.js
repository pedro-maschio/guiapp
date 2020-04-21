const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./database/database');
const Article = require('./articles/Article');
const Category = require('./categories/Category');

const app = express();

const categoriesController = require('./categories/categoriesController');
const articlesController = require('./articles/articlesController');

// View engine and static files
app.set('view engine', 'ejs');
app.use(express.static('public'));
// Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// Database
connection.authenticate().then(() => {
    console.log('Connected to mysql database');
}).catch((erro) => {
    console.log('Error while connecting to database');
    console.log(erro);
});


app.use('/', categoriesController);
app.use('/', articlesController);

app.get('/', (req, res) => {
    Article.findAll({
        include: [{model:Category}],
        order: [['createdAt', 'DESC']]
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render('index', {articles: articles, categories: categories});
        });
    });
    
});

app.get('/article/:slug', (req, res) => {
    var slug = req.params.slug;

    Article.findOne({
        where: {
            slug: slug
        }
    }).then((article) => {
        if(article != undefined) {
            Category.findAll().then(categories => {
                res.render('article', {article: article, categories: categories});
            });
        } else {
            res.redirect('/');
        }
    }).catch((error) => {
        console.log(error);
        res.redirect('/');
    });
});

app.get('/category/:slug', (req, res) => {
    var slug = req.params.slug;

    Category.findOne({
        where: {
            slug: slug
        }, 
        include: [{model:Article}]
    }).then((category) => {
        if(category != undefined) {
            Category.findAll().then(categories => {
                res.render('index', {articles: category.articles, categories: categories});
                console.log(category.articles);
            });
            
        } else {
            res.redirect('/');
        }
    }).catch(error => {
        console.log("Problem while searching for category");
        console.log(error);
        res.redirect('/');
    });
});




app.listen(8081, () => {
    console.log("Servidor iniciado!");
});