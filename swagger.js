import swaggerAutogen  from 'swagger-autogen';
import * as http from "http";

const doc = {
    info: {
        title: 'Sorteio - amigo secreto'
    },
    host: 'sorteio-deploy-api.onrender.com'
}

const outputFile = './swagger.json';
const endpointsFiles = ['./src/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);