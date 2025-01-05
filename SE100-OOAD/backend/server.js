const express = require('express');
const mongoose = require('mongoose')
const authRoute = require('./routes/authRoute')
const roomRoute = require('./routes/roomRoute')
const bookingRoute = require('./routes/bookingRoute')
const userCollectionRoute = require('./routes/userCollectionRoute')
const locationRoute = require('./routes/locationRoute')
const serviceRoute = require('./routes/serviceRoute')
const paymentRoute = require('./routes/paymentRoute')
const reviewRoute = require('./routes/reviewRoute')
const invoiceRoute = require('./routes/invoiceRoute')
const cors = require('cors')
const {errorHandler} = require('./middleware/errorMiddleware')
const cookieParser = require('cookie-parser')

const app = express();
const PORT = process.env.PORT || 3000

//Middleware
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001");
    res.header("Access-Control-Allow-Origin", "http://localhost:3002");
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

//View engine
app.set('view engine', 'ejs')

//Database connection

const mongoURL = "mongodb+srv://thinhnguyenphuc:6RUfHulVdn6qLyO8@thinhnguyenphuc.dxqeq.mongodb.net/TravelSocial?retryWrites=true&w=majority&appName=thinhnguyenphuc";
mongoose.connect(mongoURL)
    .then(console.log("Db is connected"))
    .catch(error => console.log(error));

app.listen(PORT, () => {
    console.log('Server is running on port:', PORT)
})


//Route
//app.get('*', checkUser)
app.use(cors())
app.get('/', (req, res) => res.render('home'))
app.get('/signup', (req, res) => {res.render('signup')})
app.get('/signin', (req, res) => {res.render('signin')})

app.use(authRoute)
app.use(locationRoute)
app.use(roomRoute)
app.use(bookingRoute)
app.use(userCollectionRoute)
app.use(serviceRoute)
app.use(paymentRoute)
app.use(reviewRoute)
app.use(invoiceRoute)

app.use(errorHandler)