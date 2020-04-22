
export function Services(type, userData){
    let details = userData;

    let formBody = [];
    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    //console.log("userDatanew", userData)
    let BaseUrl ='http://staging.php-dev.in:8844/trainingapp/api/users/';

    return new Promise( (resolve, reject) => {
        fetch(BaseUrl+type, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
            body: formBody,
        })
        .then((response) =>  response.json())    //JSON.parse(JSON.stringify(response))
        .then((responseJson) => {
            resolve(responseJson);
            //console.log("Response Data " ,responseJson);
        })
        .catch((error) => {
            //console.log("tyfgu");
            reject(error);
        });
        
    });
}