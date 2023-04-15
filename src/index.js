import express from 'express';

import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../swagger.json' assert {type: 'json'};

import cors from 'cors'
import bodyParser from 'body-parser'
import userCreateController from "./Controllers/create/userCreateController.js";
import sorteioController from "./Controllers/sorteio/sorteioController.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.use('/user/', userCreateController);
app.use('/amigo-secreto/', sorteioController);

export default app;