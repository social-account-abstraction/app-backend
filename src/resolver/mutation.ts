import {Resolvers} from '../generated/graphql_api';

const mutation: Resolvers = {
    Mutation: {
        echo: (parent, args, ctx, info) => {
            console.log(ctx, info);
            return args.text;
        },
        addPost: async (parent, {title, content}, {prisma}, info) => {
            await prisma.post.create({data: {title, content}});
            return true;
        }
    }
};

export default mutation;