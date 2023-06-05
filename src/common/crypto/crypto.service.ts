import * as crypto from 'node:crypto';

import { Injectable } from '@nestjs/common';

export enum RandomStringType {
  ACCESS_TOKEN = 'at_',
}

@Injectable()
export class CryptoService {
  public async hash(data: string, salt: string): Promise<string> {
    // return sha256(data + salt);
    const cryptoHash = crypto.createHash('sha256');
    cryptoHash.update(data + salt);
    return cryptoHash.digest('hex');
  }

  public async hashVerify(
    data: string,
    salt: string,
    hash: string,
  ): Promise<boolean> {
    const result = await this.hash(data, salt);
    return result === hash;
  }

  public async generateRandomString(
    prefix: RandomStringType,
    // eslint-disable-next-line no-magic-numbers
    length = 48,
    lengthIncludePrefix = true,
  ): Promise<string> {
    const BYTES_PER_CHAR = 2;
    const lengthInBytes = length / BYTES_PER_CHAR;
    return new Promise((resolve, reject) => {
      crypto.randomBytes(lengthInBytes, (error, buffer) => {
        if (error) {
          reject(error);
        } else if (lengthIncludePrefix) {
          const result = prefix + buffer.toString('hex');
          resolve(result.slice(0, length));
        } else {
          resolve(prefix + buffer.toString('hex'));
        }
      });
    });
  }
}
