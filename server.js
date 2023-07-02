const express = require('express')
const app = express()
const port = 4400
const rootDir = require('./utils/path')


app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static('public'))

app.use("/", (req, res) => {
  res.status(200)
      .sendFile(rootDir + '/views/index.html')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
