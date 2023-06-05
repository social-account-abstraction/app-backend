// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable camelcase */
import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

import { HelloWorld, HelloWorld__factory } from '@/@generated/eth-contracts';

@Injectable()
export class EthWrapperService {
  private readonly provider: ethers.JsonRpcProvider;
  private readonly helloWorld: HelloWorld;
  private readonly wallet: ethers.Wallet;

  constructor() {
    this.provider = new ethers.JsonRpcProvider('http://localhost:8545');
    this.wallet = new ethers.Wallet(
      '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80', // first account from hardhat
      this.provider,
    );
    this.helloWorld = HelloWorld__factory.connect(
      '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
      this.wallet,
    );
  }
  async setHelloWorldValue(value: string) {
    await this.helloWorld.setValue(value);
  }

  async getHelloWorldValue() {
    return await this.helloWorld.value();
  }
}
