const express = require('express');
const router = express.Router();
const Category = require('./Categorie');
const slugify = require('slugify');


router.get('/admin/categories/new', (req, res) => {
    res.render('admin/categories/new');
});

router.post('/admin/categories/save', (req, res) => {
    var title = req.body.title;
    if(title != undefined) {
        Category.create({
            title: title,
            slug: slugify(title, {
                lower: true
            })
        }).then(() =>  {
            res.redirect('/admin/categories');
        });

    } else {
        res.redirect('/admin/categories/new');
    }
});

router.get('/admin/categories', (req, res) => {
    Category.findAll().then((categories) => {
        res.render('admin/categories/index', {categories: categories});
    });

    
});

router.post('/admin/categories/delete', (req, res) => {
    var id = req.body.id;

    if(id != undefined && !isNaN(id)) {
        Category.destroy({
            where: {
                id: id
            }
        }).then(() => {
            res.redirect('/admin/categories');
        }); 
    } else {
        res.redirect('/admin/categories');
    }
}); 


module.exports = router;