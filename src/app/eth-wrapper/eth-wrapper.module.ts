import { Module } from '@nestjs/common';

import { EthWrapperService } from './eth-wrapper.service';

@Module({
  providers: [EthWrapperService],
})
export class EthWrapperModule {}
