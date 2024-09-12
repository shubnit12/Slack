const express = require('express')

const app = express()
app.use(express.json())

app.get('/',(req,res) =>{
 console.log(req)
    res.send(`<h1>My Home Page----GET<h1>`)

})

app.post('/',(req,res) =>{
    console.log(req.body)
    res.status(200).send({challange: req.body.challenge})
})


app.listen(3000)
console.log("listning on 3000")