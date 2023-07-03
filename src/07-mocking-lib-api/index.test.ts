import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  const baseURL = 'https://jsonplaceholder.typicode.com';
  const mockedData = 'TEST DATA';
  const relativePath = 'todos/1';
  const getImplementation = async () => ({ data: mockedData });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    (axios.create as jest.Mock).mockReturnValue({
      get: getImplementation,
    });
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(relativePath);

    expect(axios.create).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const spy = jest.fn(getImplementation);
    (axios.create as jest.Mock).mockReturnValue({
      get: spy,
    });

    await throttledGetDataFromApi(relativePath);
    jest.runAllTimers();

    expect(spy).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const data = await throttledGetDataFromApi(relativePath);

    expect(data).toEqual(mockedData);
  });
});
