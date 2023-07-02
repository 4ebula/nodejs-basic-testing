import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const elements = [1, 2, 3];

  test('should generate linked list from values 1', () => {
    const list = generateLinkedList(elements);
    const listToCompare = generateLinkedList(elements);

    expect(list).toStrictEqual(listToCompare);
  });

  test('should generate linked list from values 2', () => {
    const list = generateLinkedList(elements);

    expect(list).toMatchSnapshot();
  });
});
