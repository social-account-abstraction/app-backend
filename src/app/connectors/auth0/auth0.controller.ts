// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable sonarjs/no-duplicate-string */
import * as console from 'node:console';

import {
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as qrCode from 'qrcode';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

import { Auth0Service } from '@/app/connectors/auth0/auth0.service';
import { CryptoService } from '@/common/crypto/crypto.service';

@Controller('auth0')
export class Auth0Controller {
  constructor(
    private readonly auth0Service: Auth0Service,
    private readonly cryptoService: CryptoService,
  ) {}

  @Get()
  async getHello(
    @Query('code') code: string,
    @Query('state') state: string,
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<void> {
    try {
      if (!code) {
        throw new NotFoundException();
      }

      if (!state) {
        throw new NotFoundException();
      }

      const redirectUri = `${request.protocol}://${request.get('Host')}${
        request.originalUrl
      }`;

      const { accessToken } = await this.auth0Service.getTokens(
        code,
        redirectUri,
      );

      const userInfo = await this.auth0Service.getUserInfo(accessToken);
      const NODE_URL = 'http://195.189.96.157:8845';
      const provider = new Web3.providers.HttpProvider(NODE_URL);

      const web3 = new Web3(provider);

      const ABI = [
        {
          inputs: [
            {
              internalType: 'contract IEntryPoint',
              name: 'anEntryPoint',
              type: 'address',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'constructor',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address',
              name: 'previousAdmin',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'address',
              name: 'newAdmin',
              type: 'address',
            },
          ],
          name: 'AdminChanged',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'beacon',
              type: 'address',
            },
          ],
          name: 'BeaconUpgraded',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'alertAgent',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'string',
              name: 'reasson',
              type: 'string',
            },
          ],
          name: 'Frozen',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'uint8',
              name: 'version',
              type: 'uint8',
            },
          ],
          name: 'Initialized',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address[]',
              name: 'newAlertAgents',
              type: 'address[]',
            },
          ],
          name: 'NewAlertAgents',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'bytes32[]',
              name: 'newSocialRecoveryAgents',
              type: 'bytes32[]',
            },
          ],
          name: 'NewSocialRecoveryAgents',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'newOwner',
              type: 'address',
            },
          ],
          name: 'OwnerTransferred',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'contract IEntryPoint',
              name: 'entryPoint',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
          ],
          name: 'SocialRecoveryAccountInitialized',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'implementation',
              type: 'address',
            },
          ],
          name: 'Upgraded',
          type: 'event',
        },
        {
          inputs: [],
          name: 'addDeposit',
          outputs: [],
          stateMutability: 'payable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          name: 'alertAgents',
          outputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'entryPoint',
          outputs: [
            {
              internalType: 'contract IEntryPoint',
              name: '',
              type: 'address',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'dest',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'value',
              type: 'uint256',
            },
            {
              internalType: 'bytes',
              name: 'func',
              type: 'bytes',
            },
          ],
          name: 'execute',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address[]',
              name: 'dest',
              type: 'address[]',
            },
            {
              internalType: 'bytes[]',
              name: 'func',
              type: 'bytes[]',
            },
          ],
          name: 'executeBatch',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'string',
              name: 'reason',
              type: 'string',
            },
          ],
          name: 'freeze',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'frozen',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'getDeposit',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'getNonce',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'bytes32[]',
              name: 'newSocialRecoveryAgents',
              type: 'bytes32[]',
            },
            {
              internalType: 'address[]',
              name: 'newAlertAgents',
              type: 'address[]',
            },
          ],
          name: 'initSocialRecovery',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'anOwner',
              type: 'address',
            },
          ],
          name: 'initialize',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
            {
              internalType: 'uint256[]',
              name: '',
              type: 'uint256[]',
            },
            {
              internalType: 'uint256[]',
              name: '',
              type: 'uint256[]',
            },
            {
              internalType: 'bytes',
              name: '',
              type: 'bytes',
            },
          ],
          name: 'onERC1155BatchReceived',
          outputs: [
            {
              internalType: 'bytes4',
              name: '',
              type: 'bytes4',
            },
          ],
          stateMutability: 'pure',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
            {
              internalType: 'bytes',
              name: '',
              type: 'bytes',
            },
          ],
          name: 'onERC1155Received',
          outputs: [
            {
              internalType: 'bytes4',
              name: '',
              type: 'bytes4',
            },
          ],
          stateMutability: 'pure',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
            {
              internalType: 'bytes',
              name: '',
              type: 'bytes',
            },
          ],
          name: 'onERC721Received',
          outputs: [
            {
              internalType: 'bytes4',
              name: '',
              type: 'bytes4',
            },
          ],
          stateMutability: 'pure',
          type: 'function',
        },
        {
          inputs: [],
          name: 'owner',
          outputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'proxiableUUID',
          outputs: [
            {
              internalType: 'bytes32',
              name: '',
              type: 'bytes32',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          name: 'socialRecoveryAgents',
          outputs: [
            {
              internalType: 'bytes32',
              name: '',
              type: 'bytes32',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'bytes4',
              name: 'interfaceId',
              type: 'bytes4',
            },
          ],
          name: 'supportsInterface',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
            {
              internalType: 'bytes',
              name: '',
              type: 'bytes',
            },
            {
              internalType: 'bytes',
              name: '',
              type: 'bytes',
            },
          ],
          name: 'tokensReceived',
          outputs: [],
          stateMutability: 'pure',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'bytes32[]',
              name: 'oneTimeSocialRecoveryAgentsKeys',
              type: 'bytes32[]',
            },
            {
              internalType: 'bytes32[]',
              name: 'newSocialRecoveryAgents',
              type: 'bytes32[]',
            },
            {
              internalType: 'bytes32',
              name: 'salt',
              type: 'bytes32',
            },
            {
              internalType: 'address[]',
              name: 'newAlertAgents',
              type: 'address[]',
            },
            {
              internalType: 'address',
              name: 'newOwner',
              type: 'address',
            },
          ],
          name: 'unfreeze',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'newImplementation',
              type: 'address',
            },
          ],
          name: 'upgradeTo',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'newImplementation',
              type: 'address',
            },
            {
              internalType: 'bytes',
              name: 'data',
              type: 'bytes',
            },
          ],
          name: 'upgradeToAndCall',
          outputs: [],
          stateMutability: 'payable',
          type: 'function',
        },
        {
          inputs: [
            {
              components: [
                {
                  internalType: 'address',
                  name: 'sender',
                  type: 'address',
                },
                {
                  internalType: 'uint256',
                  name: 'nonce',
                  type: 'uint256',
                },
                {
                  internalType: 'bytes',
                  name: 'initCode',
                  type: 'bytes',
                },
                {
                  internalType: 'bytes',
                  name: 'callData',
                  type: 'bytes',
                },
                {
                  internalType: 'uint256',
                  name: 'callGasLimit',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'verificationGasLimit',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'preVerificationGas',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'maxFeePerGas',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'maxPriorityFeePerGas',
                  type: 'uint256',
                },
                {
                  internalType: 'bytes',
                  name: 'paymasterAndData',
                  type: 'bytes',
                },
                {
                  internalType: 'bytes',
                  name: 'signature',
                  type: 'bytes',
                },
              ],
              internalType: 'struct UserOperation',
              name: 'userOp',
              type: 'tuple',
            },
            {
              internalType: 'bytes32',
              name: 'userOpHash',
              type: 'bytes32',
            },
            {
              internalType: 'uint256',
              name: 'missingAccountFunds',
              type: 'uint256',
            },
          ],
          name: 'validateUserOp',
          outputs: [
            {
              internalType: 'uint256',
              name: 'validationData',
              type: 'uint256',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address payable',
              name: 'withdrawAddress',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'amount',
              type: 'uint256',
            },
          ],
          name: 'withdrawDepositTo',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          stateMutability: 'payable',
          type: 'receive',
        },
      ] as AbiItem[];
      const contract = new web3.eth.Contract(ABI, state);
      const events = await contract.getPastEvents('NewSocialRecoveryAgents', {
        fromBlock: 0,
        toBlock: 'latest',
      });

      if (events.length === 0) {
        throw new NotFoundException();
      }

      const eventsCount = events.length;

      console.log(state, events, eventsCount, userInfo);

      const hashedUserInfo = await this.cryptoService.hash(
        state + eventsCount.toString() + JSON.stringify(userInfo),
      );

      const qrCodeImage = await qrCode.toBuffer(hashedUserInfo);
      response.set('Content-Type', 'image/png');
      response.send(qrCodeImage);
    } catch (error) {
      console.log(error);
      throw error instanceof NotFoundException
        ? new NotFoundException()
        : new InternalServerErrorException();
    }
  }
}
