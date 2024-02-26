import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import fs from 'fs';
// Routing imports
import { router as locationRouter } from './routes/location-router.js';
import { router as userRouter } from './routes/user-router.js';

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
app.use('/api/users', cors(corsOptions), userRouter);

// Swagger
let swOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Test Api",
            version: "0.1.0",
            description:
                "A simple CRUD API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html"
            },
            contact: {
                name: "",
                url: "",
                email: "",
            },
        },
        servers: [
            {
                url: 'http://localhost:1234',
                description: 'Development server',
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(swOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true,
    swaggerOptions: {
        validatorUrl: null
    }
})); //swaggerUi.setup(swaggerDocument, swOptions)
app.use('/json-doc', (req, res) => {
    let file = fs.readFileSync('./swagger.json', 'utf8');
    res.send(file);
});
export default app;

let port = process.env.APPPORT || 1234;
app.listen(port, () => {
    console.log(`Port listening ${port}`)
});