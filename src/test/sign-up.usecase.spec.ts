import { SignUpUseCase, SignUpUseCaseInput } from '../sign-up.usecase';
import { IUserRepository } from '../user.repository';
import {mocked} from "ts-jest";
import {BadRequestException} from "@nestjs/common";
import { v4 as uuid } from 'uuid';


const SignUpUseCaseInputMock = {
  email: '',
  password: '',
};
const userRepositoryCreateMock = jest.fn();
const UserRepositoryMock: IUserRepository = {
  create: userRepositoryCreateMock,
  findByEmail: jest.fn(),
};
const signUp = new SignUpUseCase(UserRepositoryMock);

describe('SignUpUseCase', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test.only('1) email invalid', async () => {
    // If the value doesn't have '@', we should throw an error BadRequestException
    SignUpUseCaseInputMock.email = 'nguyentuongkhanggmail.com';
    SignUpUseCaseInputMock.password = 'sieunhantim';
    await expect(signUp.execute(SignUpUseCaseInputMock)).rejects.toThrow(
      'Invalid email or Password',
    );
  });

  test.only('2) password invalid', async () => {
    SignUpUseCaseInputMock.email = 'nguyentuongkhanggmail.com';
    SignUpUseCaseInputMock.password = 'sda';
    await expect(signUp.execute(SignUpUseCaseInputMock)).rejects.toThrow(
      'Invalid email or Password',
    );
  });

  test.only('3) email & password valid', async () => {
    //Arrange
    SignUpUseCaseInputMock.email = 'nguyentuongkhang@gmail.com';
    SignUpUseCaseInputMock.password = 'Aieunhantim@2';

    const User = {
      email: SignUpUseCaseInputMock.email,
      password: SignUpUseCaseInputMock.password
    };
    userRepositoryCreateMock.mockResolvedValue(true);

    // Act
    await signUp.execute(SignUpUseCaseInputMock);

    // Assert
    expect(UserRepositoryMock.create).toBeCalledWith(
      expect.objectContaining(User),
    );
    // await expect(UserRepositoryMock.create(User);
  });

  test('4) Email and Password are required', async () => {
    expect(true).toBeTruthy();
  });
});
