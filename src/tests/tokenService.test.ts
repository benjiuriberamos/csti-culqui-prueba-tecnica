import { describe, expect, test } from "@jest/globals";
import { createToken, verifyToken }  from "../services/tokenService";
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

describe('Token Service crear token', () => {
  test('La funcion create token no rotorna un null', () => {
    const cardData = {
      card_number: "4111111111111111",
      cvv: "101",
      expiration_month: "10",
      expiration_year: "2025",
      email: "benji@gmail.com"
    }
    expect(() => createToken(cardData)).not.toBeNull();
  });

  test('La funcion create token no retorna un undefined', () => {
    const cardData = {
      card_number: "4111111111111111",
      cvv: "101",
      expiration_month: "10",
      expiration_year: "2025",
      email: "benji@gmail.com"
    }
    expect(() => createToken(cardData)).not.toBeDefined();
  });
});

