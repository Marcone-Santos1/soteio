import swaggerAutogen  from 'swagger-autogen';

const doc = {
    info: {
        title: 'Sorteio - amigo secreto'
    },
    host: 'https://sorteio-deploy-api.onrender.com'
}

const outputFile = './swagger.json';
const endpointsFiles = ['./src/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);