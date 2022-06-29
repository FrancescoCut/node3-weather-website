const path = require('path');
const express =  require ('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, ('../public'));
const viewsPath = path.join(__dirname, ('../templates/views'));
const partialsPath = path.join(__dirname, ('../templates/partials'));

// Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Francesco Cutrone'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'Groot',
        name: 'Marvel'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Pagina di aiuto',
        name: 'Francesco',
        helpText: 'Utili informazioni di aiuto'
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.adress){
        return res.send({
            error: 'You must provide an adress'
        })
    }

    geocode(req.query.adress,(error,{lat,long,location}={})=>{
        if (error){
            return res.send({error})
        }

        forecast(lat,long,(error,dataForecast)=>{
            if (error){
                return res.send({error})
            }
        
            res.send({
                    location,
                    forecast: dataForecast,
                    adress: req.query.adress
            })
        })

    })
})
 


app.get('/help/*', (req,res)=>{
    res.render('page404', {
        title:'404 error page',
        name:'Francesco',
        errorMessage: 'Help page not found'
    })
})

app.get('*', (req,res)=>{
    res.render('page404', {
        title:'404 error page',
        name:'Francesco',
        errorMessage: 'Page not found'
    })
})



app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})