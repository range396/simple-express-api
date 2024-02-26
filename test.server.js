import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
// Routing imports
import { router as locationRouter } from './routes/location-router.js';

// import swaggerDocument from './swagger.json' assert { type: 'json' };
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
// app.use(express.json());

let corsOptions = {
    origin: '*',
    optionsSuccessStatus: 204,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ['Content-Type']
};

//DB
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Routing
app.use('/api/locations', cors(corsOptions), locationRouter);

let port = 4321;
app.listen(port, () => {
    console.log(`Port listening ${port}`)
});


export default app;