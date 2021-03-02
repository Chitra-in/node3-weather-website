const request=require('request')

const geoCode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?limit=1&access_token=pk.eyJ1Ijoia2lkZHlndXlzIiwiYSI6ImNrbGRrdm41eDFxcTUyb2xicjJ1YmlzYmcifQ.WhW6RL87I4tM9obOZqjN3Q'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to location services',undefined)
        }else if(body.features.length===0){
            callback('Location not found',undefined)
        }else{
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                place_name : body.features[0].place_name
            })
        }
   
    })
}

module.exports= geoCode

