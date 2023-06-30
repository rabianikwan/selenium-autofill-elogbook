const express = require('express')
const app = express()
const port = 4400
const rootDir = require('./utils/path')
const index = require('./route/index')

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static('public'))

app.use(index)

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
