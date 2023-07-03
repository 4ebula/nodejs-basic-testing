import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = 'test';
    const result = resolveValue(value);
    await expect(result).resolves.toEqual(value);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const errorMessage = 'Something went wrong';
    const err = () => throwError(errorMessage);
    expect(err).toThrow(errorMessage);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(throwError).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(throwCustomError).toThrow(MyAwesomeError);
    expect(throwCustomError).toThrow('This is my awesome custom error!');
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    const result = rejectCustomError();
    await expect(result).rejects.toBeInstanceOf(MyAwesomeError);
    await expect(result).rejects.toEqual(
      Error('This is my awesome custom error!'),
    );
  });
});
