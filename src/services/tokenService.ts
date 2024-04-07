import jwt from 'jsonwebtoken';
import { createClient } from 'redis';
import * as dotenv from 'dotenv';
dotenv.config();

const redisClient = createClient({
    url: process.env.DB_URL
});
redisClient.connect();
redisClient.on('error', (err) => console.log('Redis Client Error', err));

const SECRET_KEY = process.env.SECRET_KEY_APP ?? '998fwe1%';

export const createToken = async (cardData: any): Promise<string> => {
    const token = jwt.sign({ cardData }, SECRET_KEY, { expiresIn: '1m' });
    const { cvv, ...dataToStore } = cardData;

    await redisClient.setEx(token, 60, JSON.stringify(dataToStore));
    redisClient.quit();

    return token;
};

export const verifyToken = async (token: string): Promise<any> => {
    try {
        jwt.verify(token, SECRET_KEY);
        const data = await redisClient.get(token);
        redisClient.quit();

        if (!data) throw new Error('Token expired or invalid');

        return JSON.parse(data);
    } catch (error) {
        console.error('Token verification failed:', error);
        throw error;
    }
};
