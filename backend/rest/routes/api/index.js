var router = require('express').Router();

router.use('/', require('./users'));
router.use('/profiles', require('./profiles'));
router.use('/articles', require('./articles'));
router.use('/tags', require('./tags'));
router.use('/contact', require('./contact'));
router.use('/adventures', require('./adventures/adventures'));
router.use('/hotels', require('./hotels/hotels'));
router.use('/cities', require('./travels/cities'));
router.use('/countries', require('./travels/countries'));
router.use('/travels', require('./travels/travels'));
router.use('/restaurants', require('./restaurants/restaurants'));

router.use(function(err, req, res, next){
  if(err.name === 'ValidationError'){
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function(errors, key){
        errors[key] = err.errors[key].message;

        return errors;
      }, {})
    });
  }

  return next(err);
});

module.exports = router;