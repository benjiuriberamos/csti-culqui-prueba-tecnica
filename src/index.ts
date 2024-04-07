import express, { Request, Response, NextFunction} from 'express';
import * as tokenController from './controllers/tokenController';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.SERVER_PORT;

app.use(express.json());
app.use(tokenController.validateTokenBearer);

app.post('/tokenize', tokenController.tokenizeCard);
app.get('/cardData/:token', tokenController.getCardData);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});