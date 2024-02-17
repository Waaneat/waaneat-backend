const express = require("express");
const app = express();
const session = require("express-session");
const cors = require("cors");
const routes = require("./routes/index");
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const connectDb = require("./database/connect");
const helmet = require('helmet');
const cookieParser = require("cookie-parser");




//middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(
    session({
        secret: process.env.SESSION,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // Modifiez ceci en fonction de votre environnement
    })
);
app.use(routes);
app.use(helmet());


connectDb().then(()=>{
    app.listen(PORT,async ()=>{
        // await Commande.update(
        //     {etat: "commande termine",idUserVendeur:2},
        //    { where: {id: 1}}
        // );
        console.log(`server is running at PORT :${PORT}`);
        
    })
})
