// src/routes/externalApiRoutes.ts
import express from 'express';
import * as externalApiController from '../controllers/externalApiController';

const router = express.Router();

router.get('/send', externalApiController.sendToExternalApi);

export default router;
