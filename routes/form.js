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
    const month = req.body.month
    const shiftScedule = req.body.shift
    // yang belum finished login, dashboard, fillFormatDate, editShift
    selenium(login, nip, pass, dashboard, month, shiftScedule).then(() => console.log('Process finished'))

    res.status(200)
        .send('<h1>Selenium akan segera berjalan</h1>')

})

export default router;
