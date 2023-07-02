import express from 'express'

import index from './routes/form.js'

import path from 'path'


const port = 3000;

const app = express()

app.use(express.static(path.join('client', 'build')))

app.use(express.json())

app.use(express.urlencoded({ extended : true}))

app.use(index)

app.listen(port, () => console.log('server running on http://localhost:' + port))
