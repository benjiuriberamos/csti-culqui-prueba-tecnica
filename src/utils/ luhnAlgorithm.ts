export const validateCardNumber = (number: string): boolean => {
    let sum = 0;
    for (let i = 0; i < number.length; i++) {
      let intVal = parseInt(number.charAt(i), 10);
      if (i % 2 === 0) {
        intVal *= 2;
        if (intVal > 9) {
          intVal = 1 + (intVal % 10);
        }
      }
      sum += intVal;
    }
    return sum % 10 === 0;
  };