const express = require('express');
const router = express.Router();
const rootDir = require('../utils/path');
const selenium = require('../utils/selenium')

router.get('/', (req, res, next) => {
    res.status(200)
        .sendFile(rootDir + '/views/index.html');
})
router.post('/', (req, res, next) => {
    const nip = req.body.nip
    const pass = req.body.pswd
    const month = req.body.bulan
    const shift = req.body.jd
    selenium().then(() => console.log('selenium sedang berjalan'))
    res.json({
        message : nip
    })
})
module.exports = router;
