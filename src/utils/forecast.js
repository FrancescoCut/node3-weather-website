const request = require('postman-request');

const forecast = (lat, long, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=99d4dcb955209c62939db55e7faa3e5a&query='+ lat + ',' + long;
    //request({url: url, ...},(error,response))
    request({url,json:true},(error,{body})=>{
        if (error){
            callback('Non riesco a conntermi al server',undefined);
        //qui erano tutti response.body.proprietà, posso sostituire con body.proprietà
        }else if (body.error){
            callback(body.error.info,undefined);
        }else{
            callback(undefined,
                'Temperatura attuale:' + body.current.temperature +'. Rischio precipitazione:' + body.current.precip +'%.')
        }
   })
}

module.exports=forecast;
