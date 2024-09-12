
const express = require('express')
const sendToDB = require('./sendToDB')
const {authenticate, getSheetData, appendSheetData}= require('./googleSheet')
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

    try {
        const auth = await authenticate()
        if(!auth){
           return res.status(500).send('Error while writing to excel ==== Auth error')
        }
        const values = {
            ts: req.body.event_id ,
            text: req.body.event.text
        }
        const updatedCells = await appendSheetData(auth,values)
        res.send(`${updatedCells} cells updated`)
        await getSheetData(auth)

    } catch (error) {
        console.error('Error while writing to excel',error)
         res.status(500).send('Error while writing to excel')
    }

    // res.status(200).send('Message Logged to DB')

    
})


app.listen(3000)
console.log("listning on 3000")