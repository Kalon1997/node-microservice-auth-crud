require('dotenv').config({ path: __dirname + '/configs/.env' });
const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const session = require('express-session');
const mongodbStore = require('connect-mongodb-session')(session);


const connection = require('./configs/db')
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')


const PORT = process.env.BACKENDPORT | 3080
const app = express()


const corsConfig = {
    credentials: true,
    origin: true,
};

const sessionsConfig = {
    secret : process.env.SESSION_SECRET_BACKEND_AUTHORIZATION,
    saveUninitialized : false,
    resave: true,
    store : new mongodbStore({
        uri : process.env.MONGODBCONNECTIONURI, 
        collection: 'sessions',
        expires : 60 * 60 * 1000
    }),
}


app.use(cors(corsConfig));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session(sessionsConfig))
//after session


app.use(userRoutes)
app.use(postRoutes)



connection()
app.listen(PORT, () => console.log(`Running on ${PORT}`))












































// app.post('/register', async (req, res) => 
// {
//     try {

//     const servicethereornot = await axios.get(`http://localhost:5000/find/userservice/1.0.0`)

//     const rr = await axios({
//         method: 'post',
//         url: `http://[${servicethereornot.data.ip}]:${servicethereornot.data.port}/register`  //`http://[::1]:1048/register`//`http://[::ffff:127.0.0.1]:31644/register`  // 127.0.0.1

//        // url: `http://${servicethereornot.ip}:${servicethereornot.port}/register`
//     })
//     res.status(200).json(rr)
//     // res.json({m : servicethereornot.data, u: rr})



//     } catch (error) {
//         res.status(500).json({m : error})
//     }

// })



// app.post('/login', async (req, res) => 
// {
//     try {

//     const servicethereornot = await axios.get(`http://localhost:5000/find/userservice/1.0.0`)

//     const rr = await axios({
//         method: 'post',
//         url: `http://[${servicethereornot.data.ip}]:${servicethereornot.data.port}/login`

//        // url: `http://${servicethereornot.ip}:${servicethereornot.port}/register`
//     })
    
//     res.status(200).json({m : servicethereornot.data, u: rr})



//     } catch (error) {
//         res.status(500).json({m : error})
//     }

// })



// app.get('/me', async (req, res) => 
// {
//     try {

//     const servicethereornot = await axios.get(`http://localhost:5000/find/userservice/1.0.0`)

//     const rr = await axios({
//         method: 'get',
//         url: `http://[${servicethereornot.data.ip}]:${servicethereornot.data.port}/me`

//        // url: `http://${servicethereornot.ip}:${servicethereornot.port}/register`
//     })
    
//     res.status(200).json(rr)



//     } catch (error) {
//         res.json({m : error})
//     }

// })