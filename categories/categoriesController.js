const express = require('express');
const router = express.Router();
const Category = require('./Category');
const slugify = require('slugify');
const adminAuth = require('../middlewares/adminAuth');


router.get('/admin/categories/new', adminAuth, (req, res) => {
res.render('admin/categories/new', {user: req.session.user});
});

router.post('/admin/categories/save', adminAuth, (req, res) => {
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

router.get('/admin/categories', adminAuth, (req, res) => {
    Category.findAll({raw: true}).then((categories) => {
        //console.log(categories);
       
        categories.map((category) => {
            // descreasing strings lengths, to not to break the layout
            if(category.title.length > 40) {
                grande = true;
                category.title = category.title.substr(0, 40);
                category.title = category.title.concat("...");
            }
            if(category.slug.length > 40) {
                grande = true;
                category.slug = category.slug.substr(0, 40);
                category.slug = category.slug.concat("...");
            }
            
        }); 
        res.render('admin/categories/index', {categories: categories, user: req.session.user});
    });

    
});

router.post('/admin/categories/delete', adminAuth, (req, res) => {
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

router.get('/admin/categories/edit/:id', adminAuth, (req, res) => {
    var id = req.params.id;
    if(isNaN(id))
        res.redirect('/admin/categories');
    Category.findByPk(id).then(category => {
        if(category == undefined) {
            res.redirect('/admin/categories');
        } else {
            res.render('admin/categories/edit', {category: category, user: req.session.user});
        }
    }).catch(error => {
        console.log("Houve um erro ao buscar");
        console.log(error);
    });
});

router.post('/admin/categories/update', adminAuth, (req, res) => {
    var id = req.body.id;
    var title = req.body.title;

    Category.update({title: title, slug: slugify(title, {
        lower: true
    })}, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/admin/categories');
    }).catch((error) => {
        console.log("Houve um erro ao salvar a categoria");
        console.log(error);
        res.redirect('/admin/categories');
    });
});


module.exports = router;