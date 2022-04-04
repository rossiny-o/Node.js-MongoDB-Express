const express = require('express');
const Favorite = require('../models/favorite');
const authenticate = require('../authenticate');
const favoriteRouter = express.Router();
const cors = require('./cors');
const favorite = require('../models/favorite');


favoriteRouter.route('/')
.options(cors.corsWithOptions, (res,req)=> res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (req,res,next) => {
    Favorite.find({user:req.user._id})
    .populate('User')
    .populate('Campsite')
    .then(favorite => {
        res.statusCode = 200;
        res.setHeader('Content Type', 'application/json');
        res.json(favorite);
    })
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({user: req.user._id})
    if (req.user._id){
        favorite.campsites.push(req.body)
    } else {
        Favorite.create(req.body)
        favorite.save()
        .then(favorite => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favorite);
        })
    }

})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {

})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOneAndDelete(favorite)
    if (favorite) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite);
    } else{
        res.setHeader('Content-type', 'text/plain')
        res.end('You do not have any favorites to delete.')
    }
})

favoriteRouter.route('/:campsiteId')
.options(cors.corsWithOptions, (res,req)=> res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (req,res,next) => {
    Favorite.find({user:req.user._id})
    .populate('User')
    .populate('Campsite')
     .then(favorite => {
        res.statusCode = 200;
        res.setHeader('Content Type', 'application/json');
        res.json(favorite);
    })
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne()
    favorite.campsites.push(req.params.campsiteId0)
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {

})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne()
    favorite.campsites.filter(req.params.campsiteId)
    favorite.save()
    .then(favorite => {
        res.statusCode = 200;
        res.setHeader('Content Type', 'application/json');
        res.json(favorite);
    })
    if (!favorite){
        res.setHeader('Content-type', 'text/plain')
        res.end('You do not have any favorites to delete.')
    }
})

module.exports = favoriteRouter;