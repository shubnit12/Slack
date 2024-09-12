const express = require('express')
const sendToDB = require('./sendToDB')
const app = express()
app.use(express.json())
const dbURL = "https://alerttoexcel-default-rtdb.firebaseio.com/"

app.get('/',(req,res) =>{
 console.log(req)
    res.send(`<h1>My Home Page----GET<h1>`)

})

app.post('/',async (req,res) =>{
    console.log(req.body)
    console.log(req.body.token)
    console.log()
    let URLXX = dbURL + req.body.event_id +'.json'

    try{
        console.log("sending data to db")
        await sendToDB(URLXX , req.body)
        console.log("sending data to db")
        console.log("data sent to db")


    }catch(error){
        console.error('Error while send to DB',error)
         res.status(500).send('Error Logging the message to DB')
    }
    res.status(200).send('Message Logged to DB')

    
})


app.listen(3000)
console.log("listning on 3000")