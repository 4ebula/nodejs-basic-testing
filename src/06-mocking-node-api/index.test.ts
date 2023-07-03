import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'node:path';
import fs from 'node:fs';
import fsPromises from 'node:fs/promises';

describe('doStuffByTimeout', () => {
  const cb = jest.fn();
  const timeout = 1000;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    doStuffByTimeout(cb, timeout);

    expect(setTimeout).toHaveBeenCalledWith(cb, timeout);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(cb, timeout);

    expect(cb).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout);

    expect(cb).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  const cb = jest.fn();
  const interval = 1000;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setInterval');
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    doStuffByInterval(cb, interval);

    expect(setInterval).toHaveBeenCalledWith(cb, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByTimeout(cb, interval);

    expect(cb).not.toHaveBeenCalled();

    jest.advanceTimersByTime(interval);
    expect(cb).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(interval);
    expect(cb).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'custom-path';
    const joinSpy = jest.spyOn(path, 'join');

    readFileAsynchronously(pathToFile);

    expect(joinSpy).toHaveBeenCalledWith(expect.anything(), pathToFile);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockImplementation(() => false);

    const result = await readFileAsynchronously('');

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const content = 'CONTENT';
    const existsSyncSpy = jest
      .spyOn(fs, 'existsSync')
      .mockImplementation(() => true);
    const readFile = jest
      .spyOn(fsPromises, 'readFile')
      .mockResolvedValue(Buffer.from(content));

    const result = await readFileAsynchronously('');

    expect(existsSyncSpy).toHaveBeenCalled();
    expect(readFile).toHaveBeenCalled();
    expect(result).toEqual(content);
  });
});
