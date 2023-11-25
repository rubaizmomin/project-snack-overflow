import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';
// require('dotenv').config();
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();

import {errorHandler} from './middleware/error.mjs';

// import routes
import {authRoutes} from './routes/authRoutes.mjs';

// DATABASE CONNECTION
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(() => console.log('DB Connected'))
.catch(err => console.log('DB Connection Error: ', err));

// MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// app.use(express.json())
// app.use(express.urlencoded({extended: true}));

// ROUTES MIDDLEWARE
app.use('/api', authRoutes);

// ERROR HANDLER
app.use(errorHandler);

//PORT
const port = process.env.PORT|| 9000;

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
