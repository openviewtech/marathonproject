// src/models/tokenModel.ts
import jwt from 'jsonwebtoken';

const secretKey = 'secret-key'; // Replace with secret key

export const verifyToken = (token: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err) => {
      if (err) {
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
};
