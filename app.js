const express = require('express')

const app = express()

// app.all('/',(req,res)=>{

//     res.send(`<h1>My Home Page<h1>`)

// })
app.use(express.static('public'))
app.get('/',(req,res) =>{
 console.log(req)
    res.send(`<h1>My Home Page----GET<h1>`)

})
app.get('/two',(req,res) =>{
    console.log(req)
       res.send(`<h1>My Home Page----GETtwo<h1>`)
   
   })
app.post('/',(req,res) =>{
    res.send(`<h1>My Home Page----PoST<h1>`)
})
app.delete('/',(req,res) =>{
    res.send(`<h1>My Home Page----DelETE<h1>`)
})
// app.put('/',(req,res) =>{
//     res.send(`<h1>My Home Page----PUT<h1>`)
// })

app.listen(3000)
console.log("listning on 3000")