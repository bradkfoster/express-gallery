const express = require('express');
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser');
const galleryRoute = require('./routes/gallery');
const path = require('path');
const methodOverride = require('method-override');




const PORT = process.env.PORT || 8080;
const app = express();
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './public')));
app.engine('.hbs', handlebars({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');

app.use('/gallery', galleryRoute);




app.listen(PORT, ()=>{
console.log(`server is listening on ${PORT}`)
})