const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'RESTful API for Form login with user authenication',
      description: 'API endpoints for services documented on Swagger',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:8000',
        description: 'local server',
      },
     
    ],
  },

  apis: ['src/routes/routes.js'],
};
const swaggerDocs = swaggerJsdoc(options);
// console.log(swaggerDocs);

function swaggerDocs1(app) {
  
  app.use('/api/v1', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  app.get('/', (req, res) => {
    res.send('Welcome to Node.js');
  });


  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerDocs);
  });
}


module.exports = {options , swaggerDocs1};
