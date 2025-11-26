const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const MongoStore = require("connect-mongo");
const authRouter = require('./routes/authRoutes');
const cardRouter = require('./routes/cardRoutes');
const listRouter = require('./routes/listRoutes');
const boardRouter = require('./routes/boardRoutes');
const userRouter = require('./routes/userRoutes');
const User = require("./models/user");
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to Database");
    })
    .catch((err) => {
        console.log("Error", err)
    });

app.set('trust proxy', 1);
app.use(cors({
    origin: process.env.UI_PORT, 
    credentials: true
}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(cookieParser());

// Sessions
app.use(
    session({
        secret: 'cheesecake',
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URL,
            collectionName: "sessions",
        }),
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, 
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`); 
});