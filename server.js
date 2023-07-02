import express from 'express'

import * as path from "path";

import * as url from 'url';

import selenium from './utils/selenium.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const port = 3000;

const app = express()

app.use(express.static(path.join(__dirname, 'client', 'build')))

app.use(express.json())

app.use(express.urlencoded({ extended : true}))

const login = 'http://36.66.236.83/elogbook-samarinda/'

const dashboard = 'http://36.66.236.83/elogbook-samarinda/index.php/aktivitas'

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})

app.post('/', (req, res) => {

    const nip = req.body.name
    const pass = req.body.pass
    const month = req.body.month
    const shiftScedule = req.body.shift
    console.log(nip, pass, month, shiftScedule)
    // yang belum finished login, dashboard, fillFormatDate, editShift
    selenium(login, nip, pass, dashboard, month, shiftScedule).then(() => console.log('Process finished'))

    res.status(201)
        .send('<h1>Selenium akan segera berjalan</h1>')

})

app.listen(port, () => console.log('server running on http://localhost:' + port))
