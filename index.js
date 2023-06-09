const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views' + '/index.html')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
