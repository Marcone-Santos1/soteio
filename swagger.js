import swaggerAutogen  from 'swagger-autogen';

const outputFile = './swagger.json';
const endpointsFiles = ['./src/index.js'];

swaggerAutogen(outputFile, endpointsFiles);