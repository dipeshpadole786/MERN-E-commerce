const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./Models/User");
const itemRouter = require("./Router/item");
const adminRouter = require("./Router/admin");
const userRouter = require("./Router/user");
const generalRouter = require("./Router/general");

const app = express();
const port = 3000;

const connectDB = async () => {
    try {

        await mongoose.connect(process.env.ATL);

        console.log("✅ MongoDB connected");

    } catch (err) {
        console.error("❌ Mongo error:", err.message);
        process.exit(1);
    }
};
connectDB();
// Middleware
app.use(cors({
    origin: "https://dipesh-ecommece.onrender.com/", // adjust to your frontend port
    credentials: true, // allow cookies to be sent
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Session middleware (fix is here)
const store = MongoStore.create({
    mongoUrl: process.env.ATL,
    crypto: {
        secret: process.env.S,
    },
    touchAfter: 24 * 3600,
})

app.use(session({
    store: store,
    secret: process.env.S,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
    }
}));



// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// MongoDB connection


app.use("/item", itemRouter);
app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/", generalRouter);

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
