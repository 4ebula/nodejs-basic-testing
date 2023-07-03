import { test } from '@jest/globals';
import { simpleCalculator, Action } from './index';

enum Messages {
  Add = 'add two numbers',
  Subtract = 'subtract two numbers',
  Multiply = 'multiply two numbers',
  Divide = 'divide two numbers',
  Exponentiate = 'exponentiate two numbers',
  InvalidAction = 'return null for invalid action',
  InvalidArgs = 'return null for invalid arguments',
}

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3, message: Messages.Add },
  {
    a: 3,
    b: 2,
    action: Action.Subtract,
    expected: 1,
    message: Messages.Subtract,
  },
  {
    a: 3,
    b: 2,
    action: Action.Multiply,
    expected: 6,
    message: Messages.Multiply,
  },
  { a: 8, b: 2, action: Action.Divide, expected: 4, message: Messages.Divide },
  {
    a: 3,
    b: 2,
    action: Action.Exponentiate,
    expected: 9,
    message: Messages.Exponentiate,
  },
  {
    a: 3,
    b: null,
    action: Action.Exponentiate,
    expected: null,
    message: Messages.InvalidArgs,
  },
  { a: 3, b: 2, action: null, expected: null, message: Messages.InvalidAction },
];

describe('simpleCalculator', () => {
  test.each(testCases)('should $message', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});
