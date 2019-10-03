var router = require('express').Router();
var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');
// var User = mongoose.model('User');
// var auth = require('../../auth');
var city = mongoose.model("City");
var room = mongoose.model("Room");

// Preload product objects on routes with ':product'
router.param('hotel', function (req, res, next, slug) {
  Hotel.findOne({ slug: slug })
    .then(function (hotel) {
      if (!hotel) { return res.sendStatus(404); }

      req.hotel = hotel;

      return next();
    }).catch(next);
});

// router.get('/feed', auth.required, function (req, res, next) {
//   var limit = 20;
//   var offset = 0;

//   if (typeof req.query.limit !== 'undefined') {
//     limit = req.query.limit;
//   }

//   if (typeof req.query.offset !== 'undefined') {
//     offset = req.query.offset;
//   }

//   User.findById(req.payload.id).then(function (user) {
//     if (!user) { return res.sendStatus(401); }

//     Promise.all([
//       Product.find()
//         .limit(Number(limit))
//         .skip(Number(offset))
//         .exec(),
//       Product.count()
//     ]).then(function (results) {
//       var products = results[0];
//       var productsCount = results[1];

//       return res.json({
//         products: products.map(function (product) {
//           return product.toJSONFor(user);
//         }),
//         productsCount: productsCount
//       });
//     }).catch(next);
//   });
// });




// * POST WILL ONLY BE AVAILABLE TO ADMINS
router.post('/', function (req, res, next) {

    console.log(req.body);
    city.findOne({"slug": req.body.hotel.city}).then(function(city){
      console.log(city);
      if (!city) {
        req.body.hotel.city = null;
      }
      var hotel = new Hotel(req.body.hotel);

      hotel.city = city._id;

      return hotel.save().then(function () {

        return res.json({ hotel: hotel.toJSONFor() });
      });

    }).catch(next);

    
    // console.log(hotel);

    
  // }).catch(next);
  
});




// * return a product
// router.get('/:hotel', function (req, res, next) {
//   Promise.all([

//     req.payload ? User.findById(req.payload.id) : null,
//     req.hotel.populate('author').execPopulate()

//   ]).then(function (results) {

//     var user = results[0];
//     return res.json({ product: req.product.toJSONFor(user) });

//   }).catch(next);
// });

// update product
/* UPDATE WILL ONLY BE AVAILABLE TO ADMINS
router.put('/:product', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if(req.product.author._id.toString() === req.payload.id.toString()){
      if(typeof req.body.product.title !== 'undefined'){
        req.product.title = req.body.product.title;
      }

      if(typeof req.body.product.description !== 'undefined'){
        req.product.description = req.body.product.description;
      }

      if(typeof req.body.product.body !== 'undefined'){
        req.product.body = req.body.product.body;
      }

      if(typeof req.body.product.tagList !== 'undefined'){
        req.product.tagList = req.body.product.tagList
      }

      req.product.save().then(function(product){
        return res.json({product: product.toJSONFor(user)});
      }).catch(next);
    } else {
      return res.sendStatus(403);
    }
  });
});
*/
// delete product
/*DELETE WILL ONLY BE AVAILABLE TO ADMINS
router.delete('/:product', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    if(req.product.author._id.toString() === req.payload.id.toString()){
      return req.product.remove().then(function(){
        return res.sendStatus(204);
      });
    } else {
      return res.sendStatus(403);
    }
  }).catch(next);
});
*/
module.exports = router;
