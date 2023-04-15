import express from 'express';

import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../swagger.json' assert {type: 'json'};

import cors from 'cors'
import bodyParser from 'body-parser'
import userCreateController from "./Controllers/user/userCreateController.js";
import sorteioController from "./Controllers/sorteio/sorteioController.js";

const app = express();

app.use(express.json());
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());


app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.use('/user/', userCreateController);
app.use('/amigo-secreto/', sorteioController);

export default app;