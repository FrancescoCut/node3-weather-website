const request = require('postman-request');

const geocode = (adress, callback) =>{
    const url = 'http://api.positionstack.com/v1/forward?access_key=8e98331438aa058a589d8fdb51620d51&query='+ adress +'&limit=1'
    //request({url: url, ...}), (error, response)
    request({url, json: true},(error,{body})=>{
        if (error){
            callback('Non riesco a connettermi al server', undefined)
        //sostiusco tutti i response.body con body.
        }else if(body.error||body.data.length === 0){
            callback('Inserisci una località corretta', undefined)
        }else{
            callback(undefined,{
                lat: body.data[0].latitude,
                long: body.data[0].longitude,
                location: body.data[0].label
            })
        }
   })
}

module.exports = geocode;
