const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode=require('./util/geocode')
const forecast= require('./util/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define Path for Express Configuration
const publicDirectorypath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Set up handle bar engines and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//set up static directory  
app.use(express.static(publicDirectorypath))

app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather',
        name : 'Chitra Sekar'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name : 'Chitra S'  
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
      title: 'Help Page',
      name: 'Chitra S',
      Msg :'The following message willbe displayed for help'  
    })
})


app.get('/weather',(req,res)=>{
    
        if(!req.query.search){
             return res.send({error: 'Please provide the place.......' })
        }
        geocode(req.query.search, (error, {latitude,longitude,place_name}={})=>{
            if(error){
                return res.send({error})
            }
            forecast(latitude,longitude,(error,data1)=>{
                if(error){
                   return res.send({error})
                }
                    res.send({
                    forecast : data1,
                    place_name,
                    address: req.query.search })   
             })
        
         })
    
})


app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})


app.get('/help/*',(req,res)=>{
    res.render('error',{
        title: '404',
        name: 'Chitra S',
        errorMsg: "Help article not found"
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title: 'ERROR',
        name: 'Chitra S',
        errorMsg: "Page not found"
    })
})

//these codes are only for running it in local machine
// app.listen(3000 ,()=>{
//     console.log('Server is up on port 3000')
// })


//thse codes are to run in the heroku
app.listen(port ,()=>{
    console.log('Server is up on port' + port)
})