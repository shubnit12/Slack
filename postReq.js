//bruhh
const postData = async() => {
    try{
        const response = await fetch("http://localhost:3000/",{
            method: "GET",
            headers:{
                'Content-Type': 'application/json'
            },
        })
        if(!response.ok){
            throw new Error('bruhh wtf you doing broo ' + response.status)
        }
       
        console.log('server response: ' + response.body())

    }catch(error){
        console.error('Error ', error)
    }

}
postData()
