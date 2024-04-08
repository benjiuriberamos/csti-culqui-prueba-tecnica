import { describe, expect, test } from "@jest/globals";
import { validateCardData }  from "../services/cardValidationService";

describe('Validation card', () => {
  test('Tarjeta válida', () => {
    expect(() => {validateCardData({
        card_number: "4111111111111111",
        cvv: "101",
        expiration_month: "10",
        expiration_year: "2025",
        email: "benji@gmail.com"
      })
    }).not.toThrow();
  });

  test('Tarjeta inválida', () => {
    expect(() => {
      validateCardData({
      card_number: "41111111111111113",
      cvv: "10111",
      expiration_month: "1000",
      expiration_year: "2025",
      email: "benji@gmail.com"
      })
    }).toThrow();
  });

  test('Tarjeta inválida', () => {
    expect(() => {
      validateCardData({
      card_number: "411111111111111",
      cvv: "111",
      expiration_month: "999",
      expiration_year: "20255",
      email: "benji@gmail.com"
      })
    }).toThrow();
  });
});