import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 8, b: 6, action: Action.Add })).toEqual(14);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 8, b: 6, action: Action.Subtract });
    expect(result).toEqual(2);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 8, b: 6, action: Action.Multiply });
    expect(result).toEqual(48);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 12, b: 6, action: Action.Divide });
    expect(result).toEqual(2);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 2,
      b: 5,
      action: Action.Exponentiate,
    });
    expect(result).toEqual(32);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 2, b: 6, action: null });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    let result = simpleCalculator({ a: null, b: 6, action: Action.Add });
    expect(result).toBeNull();

    result = simpleCalculator({ a: 2, b: null, action: Action.Add });
    expect(result).toBeNull();
  });
});
