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

router.get('/admin/articles/edit/:id', (req, res) => {
    var id = req.params.id;

    Article.findByPk(id).then(article => {
        if(article != undefined) {
            Category.findAll().then(categories => {
                res.render('admin/articles/edit', {categories: categories, article: article});
            })
        } else {
            res.redirect('/');
        }
    }).catch((error) => {
        console.log(error);
        res.redirect('/');
    });
});

router.post('/admin/articles/update', (req, res) => {
    var id = req.body.id;
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

    Article.update({
        id: id,
        title: title,
        body: body,
        category: category,
        slug: slugify(title, {
            lower: true
        })}, 
        {
            where: {
                id: id
            }
        }).then(() => {
        res.redirect('/admin/articles');
    })
}); 

router.get('/articles/page/:num', (req, res) => {
    var page = req.params.num;
    var elPerPage = 6;
    var offset;

    if(isNaN(page) || page == 1 || page == 0)
        offset = 0;
    else 
        offset = (parseInt(page)-1)*elPerPage;
   
    Article.findAndCountAll({
        limit: elPerPage,
        offset: offset,
        order: [['createdAt', 'DESC']]
    }).then(articles => {
        var next = true;

        if(offset+elPerPage >= articles.count)
            next = false;

        var result = {
            next: next,
            articles: articles, 

        }
        console.log(result);
        Category.findAll().then(categories => {
            res.render('admin/articles/page', {page: page, result : result, categories : categories});
        });
        
    });

});



module.exports = router;