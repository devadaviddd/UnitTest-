import { User } from './user';

export interface IUserRepository {
  create(user: User): Promise<void>;
  findByEmail(email: string): Promise<User>;
}
