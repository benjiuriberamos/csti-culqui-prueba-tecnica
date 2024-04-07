import { validateCardNumber } from '../utils/ luhnAlgorithm';

const emailRegex = /^[^\s@]+@[^\s@]+\.(com|es)$/;

export const validateCardData = (cardData: {
  card_number: string;
  cvv: string;
  expiration_month: string;
  expiration_year: string;
  email: string;
}): boolean => {
  const { card_number, cvv, expiration_month, expiration_year, email } = cardData;

  if (!validateCardNumber(card_number)) {
    throw new Error('Invalid card number.');
  }

  if (cvv.length < 3 || cvv.length > 4) {
    throw new Error('Invalid CVV.');
  }

  if (parseInt(expiration_month) < 1 || parseInt(expiration_month) > 12) {
    throw new Error('Invalid expiration month.');
  }

  const currentYear = new Date().getFullYear();
  if (parseInt(expiration_year) < currentYear || parseInt(expiration_year) > currentYear + 5) {
    throw new Error('Invalid expiration year.');
  }

  if (!emailRegex.test(email)) {
    throw new Error('Invalid email address.');
  }

  return true;
};