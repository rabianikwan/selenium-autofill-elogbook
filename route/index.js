const express = require('express');
const router = express.Router();
const rootDir = require('../utils/path');

let jobDescriptions = [
    'Melakukan pengkajian keperawatan dasar pada individu',
    'Melakukan komunikasi terapeutik dalam pemberian asuhan keperawatan',
    'Memberikan oksigenasi sederhana',
    'Melakukan intervensi keperawatan spesifik yang sederhana pada area medikal bedah',
    'Melakukan dokumentasi tindakan keperawatan',
    'Melakukan perawatan luka',
    'Melakukan tindakan keperawatan dalam kondisi gawat darurat / bencana / kritikal'
]

const randomNumber = Math.trunc(Math.random() * 10) + 5;

const workHour = {
    pgDtg : '07.30',
    pgPlg : '14:30',
    srPlg : '21:30',
    mlmDtg : '23:55',
}
const loginurl = 'http://36.66.236.83/elogbook-samarinda/index.php'


router.get('/', (req, res, next) => {
    res.status(200)
        .sendFile(rootDir + '/views/index.html');
})
router.post('/', (req, res, next) => {
    const nip = req.body.nip
    const pass = req.body.pswd
    const month = req.body.bulan
    const shift = req.body.jd
    console.log(nip)
    res.json({
        message : nip
    })
})
module.exports = router;
