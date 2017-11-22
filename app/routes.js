/**
 * Created by cj on 11/6/17.
 */
'use strict'; 

const router = module.exports =  require('express').Router();

router.get('/', (req,res,next) => {
    client.list_events().then(data => {
        return res.render('index', {
            data
        });
    })

})

router.get('/events/:id', (req,res,next) => {
    client.get_event({
        id: req.params.id
    }).then(data => {
        return res.render('profile', {
            data
        });
    })

})