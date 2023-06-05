import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { AccountSessionCreateNestedManyWithoutAccountInput } from '../account-session/account-session-create-nested-many-without-account.input';

@InputType()
export class AccountCreateInput {

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;

    @Field(() => String, {nullable:false})
    email!: string;

    @Field(() => String, {nullable:false})
    passwordHash!: string;

    @Field(() => String, {nullable:true})
    avatarUrl?: string;

    @Field(() => AccountSessionCreateNestedManyWithoutAccountInput, {nullable:true})
    sessions?: AccountSessionCreateNestedManyWithoutAccountInput;
}
