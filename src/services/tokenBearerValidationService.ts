const emailRegex = /^pk_(test|prod)_.*$/;

export const tokenBearerValidation = (tokenBearer:string): boolean => {
  
  if(!tokenBearer) {
    throw new Error('Add token bearer.');
  }

  if(!emailRegex.test(tokenBearer)) {
        throw new Error('Invalid token bearer.');
  }

  return true;
};