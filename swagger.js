import swaggerAutogen  from 'swagger-autogen';
import * as http from "http";

const doc = {
    info: {
        title: 'Sorteio - amigo secreto'
    },
    host: 'sorteio-deploy-api.onrender.com',
    schema: [
        "http",
        "https"
    ]
}

const outputFile = './swagger.json';
const endpointsFiles = ['./src/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);