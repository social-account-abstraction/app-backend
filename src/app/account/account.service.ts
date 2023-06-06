import { Injectable } from '@nestjs/common';

import { Account } from '@/@generated/nestgraphql/account/account.model';
import { AccountGateway } from '@/app/account/account.gateway';
import { UpdateAccountInput } from '@/app/account/types';
import { CryptoService } from '@/common/crypto/crypto.service';
import { PrismaService } from '@/common/prisma/prisma.service';

@Injectable()
export class AccountService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly crypto: CryptoService,
    private readonly accountGateway: AccountGateway,
  ) {}

  public async createAccount(
    email: string,
    password: string,
  ): Promise<Account> {
    const passwordHash = await this.crypto.hash(password);
    return this.prisma.account.create({
      data: {
        email,
        passwordHash,
      },
    });
  }

  async getAccountByEmail(email: string): Promise<Account | null> {
    return this.prisma.account.findUnique({
      where: {
        email,
      },
    });
  }

  async changePassword(email: string, newPassword: string): Promise<Account> {
    const newPasswordHash = await this.crypto.hash(newPassword);
    return this.prisma.account.update({
      where: {
        email,
      },
      data: {
        passwordHash: newPasswordHash,
      },
    });
  }

  async updateAccount(account: Account, input: UpdateAccountInput) {
    await this.accountGateway.sendToAccount(
      account.id,
      'accountUpdated',
      input,
    );
    return this.prisma.account.update({
      where: {
        id: account.id,
      },
      data: input,
    });
  }
}
