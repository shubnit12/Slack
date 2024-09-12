const express = require('express')
const admin = require('firebase-admin')
const app = express()
app.use(express.json())

const serviceAccount = require('./keys/alerttoexcel-firebase-adminsdk-as4d4-cab3c2d204.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://alerttoexcel-default-rtdb.firebaseio.com/"
})

app.get('/',(req,res) =>{
 console.log(req)
    res.send(`<h1>My Home Page----GET<h1>`)

})

app.post('/',async (req,res) =>{
    console.log(req.body)
    try{
        await admin.database().ref('messsages').push(message)
        res.status(200).send('Message Logged to DB')
    }catch(error){
        console.error('Error while send to DB',error)
        res.status(500).send('Error Logging the message to DB')

    }
    
})


app.listen(3000)
console.log("listning on 3000")