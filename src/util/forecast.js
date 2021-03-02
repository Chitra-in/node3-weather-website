const request=require('request')


const forecast=(latitude, longitude,callback)=>{
    const url ='http://api.weatherstack.com/current?access_key=bd56203d2ddf1a69b957d76ff308ce5f&query='+latitude+','+longitude+'&units=f'
   // console.log(url)
    
    request({url,json:true},(error,{body}) =>{
        //const =response
      //  console.log(temperature,feelslike,weather_descriptions)
        if(error){
            callback('Cannot connect to server ',undefined)
        }else if(error){
            callback('Location is not found. Try again',undefined)
        }else{
            callback(undefined,'The current temperature is   '+ body.current.temperature +'. It actually feels like : '+body.current.feelslike+'  Weather forecast : '+body.current.weather_descriptions[0])
        }
    })
}

module.exports = forecast