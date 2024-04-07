import { Request, Response, NextFunction } from 'express';
import { createToken, verifyToken } from '../services/tokenService';
import { validateCardData } from '../services/cardValidationService';
import { tokenBearerValidation } from '../services/tokenBearerValidationService';

export const tokenizeCard = async (req: Request, res: Response) => {
  try {
    const cardData = req.body;
    res.status(200).json(cardData);
    validateCardData(cardData);
    const token = await createToken(cardData);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getCardData = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const cardData = await verifyToken(token);
    res.json(cardData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const validateTokenBearer = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ') && tokenBearerValidation(authHeader)) {
    const tokenbearer = authHeader.slice(7);
  } else {
    res.status(500).send('You need a token bearer!')
  }
  next();
}