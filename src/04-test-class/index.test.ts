import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';
import lodash from 'lodash';

jest.unmock('lodash');

describe('BankAccount', () => {
  let account: BankAccount;
  const initialAmount = 100;

  beforeEach(() => {
    account = getBankAccount(initialAmount);
  });

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toEqual(initialAmount);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const withdraw = () => account.withdraw(initialAmount + 100);

    expect(withdraw).toThrow(InsufficientFundsError);
    expect(withdraw).toThrow(
      `Insufficient funds: cannot withdraw more than ${initialAmount}`,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const secondAccount = getBankAccount(0);
    const transfer = () => account.transfer(initialAmount + 100, secondAccount);

    expect(transfer).toThrow(InsufficientFundsError);
    expect(transfer).toThrow(
      `Insufficient funds: cannot withdraw more than ${initialAmount}`,
    );
    expect(secondAccount.getBalance()).toEqual(0);
  });

  test('should throw error when transferring to the same account', () => {
    const transfer = () => account.transfer(initialAmount + 100, account);

    expect(transfer).toThrow(TransferFailedError);
    expect(transfer).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    account.deposit(100);

    expect(account.getBalance()).toEqual(initialAmount + 100);
  });

  test('should withdraw money', () => {
    account.withdraw(initialAmount);

    expect(account.getBalance()).toEqual(0);
  });

  test('should transfer money', () => {
    const secondAccount = getBankAccount(0);
    account.transfer(initialAmount, secondAccount);

    expect(account.getBalance()).toEqual(0);
    expect(secondAccount.getBalance()).toEqual(initialAmount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    lodash.random = jest.fn(() => 1);
    const fetched = await account.fetchBalance();

    expect(typeof fetched).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const newAmount = 50;
    jest
      .spyOn(account, 'fetchBalance')
      .mockImplementation(async () => newAmount);

    await account.synchronizeBalance();
    expect(account.getBalance()).toEqual(newAmount);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const failedSync = async () => await account.synchronizeBalance();
    jest.spyOn(account, 'fetchBalance').mockImplementation(async () => null);

    await expect(failedSync).rejects.toThrow(SynchronizationFailedError);
    await expect(failedSync).rejects.toThrow('Synchronization failed');
  });
});
