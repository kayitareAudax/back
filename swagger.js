const swaggerAutoGen=require("swagger-autogen")();
const ouputFile='./swagger_output.json';
const endpointsFiles = ['./routes/index.js'];
const doc = {
    info: {
      version: '1.0.0',
      title: 'M-keep apis',
      description: 'M-keep backend apis documentation',
    },
    host: `localhost:5000`,
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
      api_key: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
}  
swaggerAutoGen(ouputFile,endpointsFiles,doc);
