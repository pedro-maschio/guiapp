const express = require('express');
const router = express.Router();
const Category = require('../categories/Category');
const Article = require('./Article');
const slugify = require('slugify');


router.get('/admin/articles/new', (req, res) => {
    Category.findAll().then((categories) => {
        res.render('admin/articles/new', {categories: categories});
    });
    
});

router.post('/admin/articles/save', (req, res) => {
    var category = req.body.category;
    var title = req.body.title;
    var body = req.body.body;

    Article.create({
        title: title,
        slug: slugify(title, {
            lower: true
        }),
        body: body,
        categoryId: category
    }).then(() => {
        res.redirect('/admin/articles')
    });
});

router.get('/admin/articles', (req, res) => {
    Article.findAll({order: [['createdAt', 'DESC']], include: [{model: Category}]}).then((articles) => {
        res.render('admin/articles/index', {articles: articles}); 
    })
    
});

router.post('/admin/articles/delete', (req, res) => {
    var id = req.body.id;

    if(id != undefined && !isNaN(id)) {
        Article.destroy({
            where: {
                id: id
            }
        }).then(() => {
            res.redirect('/admin/articles');
        }); 
    } else {
        res.redirect('/admin/articles');
    }
});



module.exports = router;