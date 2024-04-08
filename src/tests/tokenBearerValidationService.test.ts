import { describe, expect, test } from "@jest/globals";
import { tokenBearerValidation }  from "../services/tokenBearerValidationService";

describe('Token bearer', () => {
  test('El token pk_prod_asdfasdf2341234 es valido', () => {
    expect(tokenBearerValidation('pk_prod_asdfasdf2341234')).toBe(true);
  });

  test('El token pk_test_asdfasdf2341243 es valido', () => {
    expect(tokenBearerValidation('pk_test_asdfasdf2341243')).toBe(true);
  });

  test('El token pk_somet_asdfasdf2341243 es valido', () => {
    expect(() => {
      tokenBearerValidation('pk_somet_asdfasdf2341243')
    }).toThrow('Invalid token bearer.');
  });
});