const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const MongoStore = require('connect-mongo')(session);
const authRouter = require('./routes/authRoutes');
const cardRouter = require('./routes/cardRoutes');
const listRouter = require('./routes/listRoutes');
const boardRouter = require('./routes/boardRoutes');
const userRouter = require('./routes/userRoutes');
const User = require("./models/user");
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://MERN:E3tRMPTsm8RtI4aq@cluster0.xf0pzj9.mongodb.net/mernDB?retryWrites=true&w=majority')
    .then(() => {
        console.log("Connected to Database");
    })
    .catch((err) => {
        console.log("Error", err)
    });

app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true
}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

// Sessions
app.use(
    session({
        secret: 'cheesecake',
        store: new MongoStore({ mongooseConnection: mongoose.connection}),
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, 
            httpOnly: true,
            sameSite: 'lax'
        }
    })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Backend Routes
app.use("/auth", authRouter);
app.use("/cards", cardRouter);
app.use("/lists", listRouter);
app.use("/boards", boardRouter);
app.use("/user", userRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`); 
});