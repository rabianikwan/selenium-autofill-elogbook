import express from 'express'

import index from './routes/form.js'

import path from "path"
import {fileURLToPath} from "url";

const port = 3030;

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, './client', 'build')))

app.use(express.json())

app.use(express.urlencoded({ extended : true}))

app.use(index)

app.listen(port, () => console.log('server running on http://localhost:' + port))
