// src/app.ts
import express, { Application } from 'express';
import authRoutes from './routes/authRoutes';
import externalApiRoutes from './routes/externalApiRoutes';
import { connectToDatabase } from './db';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app: Application = express();
const port = 3000;

// Middleware for parsing JSON requests
app.use(express.json());

// Connect to the database on application startup
connectToDatabase();

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
      description: 'Description of your API',
    },
    servers: [{ url: `http://localhost:${port}` }],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // Path to the API files
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Use routes
app.use('/auth/login', authRoutes);
app.use('/external-api/send', externalApiRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
