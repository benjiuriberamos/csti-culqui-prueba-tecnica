import { Request, Response, NextFunction } from 'express';
import { createToken, verifyToken } from '../services/tokenService';
import { validateCardData } from '../services/cardValidationService';
import { tokenBearerValidation } from '../services/tokenBearerValidationService';

export const tokenizeCard = async (req: Request, res: Response) => {
  try {
    let cardData = req.body;
    const tokenpk = req.headers.authorization;
    cardData['tokenpk'] = tokenpk;

    validateCardData(cardData);
    const token = await createToken(cardData);
    res.status(200).json({ token });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getCardData = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const tokenBearer = req.headers.authorization;
    const cardData = await verifyToken(token);

    if(cardData.tokenpk !== tokenBearer) {
      res.status(400).send(`Token invalido ${cardData.tokenpk} - ${tokenBearer}`);
    }

    const { tokenpk, ...data } = cardData; 
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const validateTokenBearer = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ') || !tokenBearerValidation(authHeader.slice(7))) {
    res.status(500).send('You need a token bearer!')
  }
  next();
}