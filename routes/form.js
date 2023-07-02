import express from 'express';

import * as path from "path";

import selenium from '../utils/selenium.js'

const router = express.Router()

const login = 'http://36.66.236.83/elogbook-samarinda/'

const dashboard = 'http://36.66.236.83/elogbook-samarinda/index.php/aktivitas'

router.get('/', (req, res) => {
    res.status(200)
        .sendFile(path.join('..', 'client', 'build', 'index.html'))
})

router.post('/', (req, res) => {

    const nip = req.body.name
    const pass = req.body.pass
    const month = parseInt(req.body.month)
    const shiftScedule = req.body.shift

    if (nip && pass && month > 0 && month < 13) {

        selenium(login, nip, pass, dashboard, month, shiftScedule).then(() => console.log('Process finished'))

        res.status(200)
            .json({
                status : "Ok",
                message : "selenium akan segera berjalan",
                fromAuthor : "web ini tidak menyimpan password anda, aman kok"
            })
    } else {
        res.json({
            status : "gagal",
            message : "isi dengan benar, jadwal dinas tanpa spasi"
        })
    }
})

router.use((req, res) => {
    res.redirect('/')
})

export default router;
