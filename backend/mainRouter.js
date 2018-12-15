var settings = require('./settings');
var router = require('express').Router();

router.get('/implementations/all', function (req, res, next) {
    res.json(settings.getAll());
});

router.get('/implementations/:implName/file', function (req, res, next) {
    try {
        res.send(settings.getImplFile(req.params.implName, req.query.path));
    } catch (e) {
        console.log('Fatal', e.message);
        res.status(500).send(e.toString());
    }
});

module.exports = router;
