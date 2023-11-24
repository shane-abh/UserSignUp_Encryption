console.log("Welcome from User Encrption Demo");

import express from 'express';
import router from './routes/routes.js';
import bodyParser from 'body-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { uri } from './models/model.js';
import {} from 'dotenv/config';

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

const session_store = new MongoStore({
    mongoUrl: uri,
    dbName: "signup_encrption",
    collectionName: "Encryption_session"
})


app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    session_store
}))


app.listen(process.env.PORT_NO, ()=> {
    console.log('Server is listening at port 7080');
})


// Code for session cookies
// app.get("/test1", (req,res)=> {
//     req.session.usr_name = "Shane";
//     req.session.usr_email = "s@gmail.com";
    
//     delete req.session.usr_name;
//     delete req.session.usr_email;
//     console.log(req.session);
//     res.send('Test 1');
// })


app.use('/',router);