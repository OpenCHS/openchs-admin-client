var express = require('express');
var settings = require('./settings');
var actions = require('./actions');
var router = express.Router();

router.get('/implementations/all', function (req, res, next) {
    res.json(settings.getAll());
});

router.post('/implementations/do', function (req, res, next) {
    actions.do(req.body).then((data) => {
        const message = data && data.response && data.response.data;
        console.log('Okay', message);
        res.send(message || 'Okay');
    }).catch((data) => {
        const message = data && data.response && data.response.data;
        console.log('Fatal', message);
        // throw new message;
        next(new Error(message));
    });
});

router.get('/implementations/:implName/file', function (req, res, next) {
    try {
        const file = settings.getImplFile(req.params.implName, req.query.path);
        res.send(file);
    } catch (e) {
        console.log('Fatal', e.message);
        next(e);
    }
});

module.exports = router;
