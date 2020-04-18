import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import User from '../models/User';

interface RequestDTO {
  email: string;
  password: string;
}

interface ResponseDTO {
  user: User;
}

class AuthenticateUserService {
  public async execute({ email, password }: RequestDTO): Promise<ResponseDTO> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw Error('Login failed: Invalid username or password');
    }

    const checkPassword = await compare(password, user.password);

    if (!checkPassword) {
      throw Error('Login failed: Invalid username or password');
    }

    return { user };
  }
}

export default AuthenticateUserService;
