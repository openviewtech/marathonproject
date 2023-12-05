// src/controllers/authController.ts
import { Request, Response } from 'express';
import { verifyToken } from '../models/tokenModel';
import User from '../db/user.model';
import { connectToDatabase, disconnectFromDatabase } from '../db';

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication operations
 */

/**
 * @swagger
 * path:
 *  /auth/login:
 *    post:
 *      summary: Authenticate user and get a JWT token
 *      tags: [Authentication]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                  example: user
 *                password:
 *                  type: string
 *                  example: password
 *      responses:
 *        '200':
 *          description: Successful login, returns a JWT token
 *          content:
 *            application/json:
 *              example:
 *                token: your-generated-token
 *        '401':
 *          description: Invalid credentials
 *        '500':
 *          description: Internal Server Error
 */

export const loginPage = (req: Request, res: Response) => {
  res.sendFile('login.html', { root: './src/views' });
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Connect to the database
  await connectToDatabase();

  try {
    // Find a user with the provided username and password in the MongoDB collection
    const user = await User.findOne({ username, password });

    if (user) {
      // Generate a token upon successful login
      const token = 'your-generated-token'; // Replace with actual token generation logic


      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    // Disconnect from the database after the operation
    await disconnectFromDatabase();
  }
};

export const securedPage = async (req: Request, res: Response) => {
  // Check for a valid token in the request header
  const token = req.headers.authorization;

  if (!token) {
    return res.redirect('/auth/login');
  }

  // Verify the token
  const isValidToken = await verifyToken(token);

  if (isValidToken) {
    // Token is valid, render the secured page
    res.send('<h2>Secured Page</h2>');
  } else {
    // Invalid token, redirect to login
    res.redirect('/auth/login');
  }
};
