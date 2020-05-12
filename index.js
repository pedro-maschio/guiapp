const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./database/database');
const Article = require('./articles/Article');
const Category = require('./categories/Category');
const User = require('./user/User');
const session = require('express-session');

const app = express();

const categoriesController = require('./categories/categoriesController');
const articlesController = require('./articles/articlesController');
const userController = require('./user/usersController');

// View engine and static files
app.set('view engine', 'ejs');
app.use(express.static('public'));
// Sessions
app.use(session({
    secret: "kjf%klef934kldj2123",
    cookie: {maxAge: 30000000}
}));

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
app.use('/', userController);

app.get('/session', (req, res) => {
    req.session.treinamento = "Formacao node js";
    req.session.ano = 2019;
    req.session.email = "pedromaschio.ptm@gmail.com";
    req.session.user = {
        username: "pedro",
        password: "teste"
    }
    res.send("gerado");
});

app.get('/leitura', (req, res) => {
    res.json({ano: req.session.ano, usuario: req.session.user});
});

app.get('/', (req, res) => {
    Article.findAll({
        include: [{model:Category}],
        order: [['createdAt', 'DESC']],
        limit: 4
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