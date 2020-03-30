const express = require('express');
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
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/node-react-starter`,
                                            {useUnifiedTopology:true, useNewUrlParser:true, useFindAndModify:false});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

//Sessions
app.use(
  session({
  secret: 'cheesecake', //Random string to make the hash
  store: new MongoStore({ mongooseConnection: mongoose.connection}),
  resave: false,
  saveUninitialized:false
  })
)

//Passport
app.use(passport.initialize());
app.use(passport.session()); // calls serializeUser and deserializeUser
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Backend Routes
app.use("/auth", authRouter);
app.use("/cards", cardRouter);
app.use("/lists", listRouter);
app.use("/boards", boardRouter);
app.use("/user", userRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
  
    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});