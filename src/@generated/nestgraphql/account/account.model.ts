import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';
import { AccountSession } from '../account-session/account-session.model';
import { AccountCount } from './account-count.output';

@ObjectType()
export class Account {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date;

    @Field(() => String, {nullable:false})
    email!: string;

    @HideField()
    passwordHash!: string;

    @Field(() => String, {nullable:true})
    avatarUrl!: string | null;

    @Field(() => [AccountSession], {nullable:true})
    sessions?: Array<AccountSession>;

    @Field(() => AccountCount, {nullable:false})
    _count?: AccountCount;
}
