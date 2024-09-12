// const dbURL = "https://alerttoexcel-default-rtdb.firebaseio.com/"
// const body = {
//     "token": "xxxxxxxxxxxxxxxxxxx",
//     "challenge": "yyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
//     "type": "zzzzzzzzzzzzzzzzzzzzzzzzzzz"
//   }
//      let URLXX = dbURL + body.token +'.json'
// async function sendToDB(dbURL, data){
// const raw = JSON.stringify(data);

// const requestOptions = {
//   method: "POST",
//   body: raw,
//   redirect: "follow"
// };

// await fetch(dbURL , requestOptions)
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));

// }
// sendToDB(URLXX, body)

require('dotenv').config();

console.log("experimnt")
let serviceAccount = process.env.EXCELSHEETCREDS
console.log(serviceAccount)
// JSON.parse(process.env.NEW_VAR)