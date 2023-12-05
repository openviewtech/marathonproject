// src/controllers/externalApiController.ts
import axios from 'axios';
import { Request, Response } from 'express';

/**
 * @swagger
 * tags:
 *   name: ExternalAPI
 *   description: ExternalAPI operations
 */

/**
 * @swagger
 * path:
 *  /external-api/validate:
 *    post:
 *      summary: Validate Ruc and Type
 *      tags: [Validation]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                param1:
 *                  type: string
 *                  example: tipo
 *                param2:
 *                  type: number
 *                  example: ruc
 *      responses:
 *        '200':
 *          description: Successful request from external API
 *          content:
 *            application/json:
 *              example:
 *                validation: ruc and tipo generated
 *        '401':
 *          description: Invalid parameters
 *        '500':
 *          description: Internal Server Error
 */

export const sendToExternalApi = async (req: Request, res: Response) => {
  const param1 = req.query.param1 as string;
  const param2 = req.query.param2 as string;

  // Validate or process parameters as needed

  try {
    // Make an HTTP request to the external API
    /*
    const externalApiResponse = await axios.post('http://wsruc.com/Ruc2WS_JSON.php?tipo=&amp;ruc=20600892470&amp;token=cXdlcnR5bGFtYXJja19zYUBob3RtYWlsLmNvbXF3ZXJ0eQ==', {
      params: { param1, param2 },
    });
    */

    const externalApiResponse = await axios.get('http://wsruc.com/Ruc2WS_JSON.php?tipo='+param1+'&amp;ruc='+param2+'&amp;token=cXdlcnR5bGFtYXJja19zYUBob3RtYWlsLmNvbXF3ZXJ0eQ==');

    // Respond with the external API's response
    res.json(externalApiResponse.data);
  } catch (error) {

    if (error instanceof Error) {
        console.error('Error sending parameters to external API:', error.message);
      } else {
        console.log('Unexpected error', error);
      }
  }
};
