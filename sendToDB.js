const dbURL = "https://alerttoexcel-default-rtdb.firebaseio.com/"
const body = {
    "token": "xxxxxxxxxxxxxxxxxxx",
    "challenge": "yyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
    "type": "zzzzzzzzzzzzzzzzzzzzzzzzzzz"
  }
  module.exports = async function sendToDB(dbURL, data){


const raw = JSON.stringify(data);

const requestOptions = {
  method: "POST",
  body: raw,
  redirect: "follow"
};

await fetch(dbURL , requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

}
// sendToDB(body, dbURL + body.token+'.json')