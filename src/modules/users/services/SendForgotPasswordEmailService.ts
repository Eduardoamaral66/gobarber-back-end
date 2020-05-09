import { injectable, inject } from 'tsyringe';

import IUsersRepositories from '@modules/users/repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import IUserTokensRepositories from '@modules/users/repositories/IUserTokensRepository';

interface IRequest {
  email: string;
}

@injectable()
export default class SendForgotPasswordEmail {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepositories,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensProvider')
    private usetTokensRepository: IUserTokensRepositories,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    await this.usetTokensRepository.generate(user.id);

    this.mailProvider.sendMail(email, 'Senha');
  }
}
