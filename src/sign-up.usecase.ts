import { IUserRepository } from './user.repository';
import { User } from './user';
import { v4 as uuid } from 'uuid';
import { Logger } from './logger';
import {BadRequestException} from "@nestjs/common";

export class SignUpUseCaseInput {
  constructor(
    public readonly email: string | null | undefined,
    public readonly password: string | null | undefined,
  ) {}
}

export class SignUpUseCase {
  private logger: Logger = new Logger();
  constructor(private readonly userRepository: IUserRepository) {}

  private readonly passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*?]).{8,}$/;
  private readonly emailRegex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  async execute(input: SignUpUseCaseInput): Promise<string> {
    const { email, password } = input;
    const isValidPassword = this.passwordRegex.test(password);
    const isValidEmail = this.emailRegex.test(email);

    if (!isValidEmail || !isValidPassword) {
      throw new BadRequestException('Invalid email or Password');
    }

    const id = uuid();
    const user = new User(email, password, id);

    await this.userRepository.create(user);

    return 'Successfully Sign In Account';
  }
}
