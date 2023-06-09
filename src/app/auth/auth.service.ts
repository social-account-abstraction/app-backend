import { Injectable } from '@nestjs/common';

import { Account } from '@/@generated/nestgraphql/account/account.model';
import { CryptoService } from '@/common/crypto/crypto.service';
import { PrismaService } from '@/common/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private cryptoService: CryptoService,
  ) {}

  async validateAccountPassword(
    email: string,
    password: string,
  ): Promise<Account> {
    const account = await this.prisma.account.findUnique({
      where: {
        email,
      },
    });
    if (account) {
      const isPasswordValid = await this.cryptoService.hashVerify(
        password,
        account.passwordHash,
      );

      if (isPasswordValid) {
        return account;
      } else {
        throw new Error('Invalid password');
      }
    } else {
      throw new Error('Account not found');
    }
  }
}
