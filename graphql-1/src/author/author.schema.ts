import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Book } from '../book/book.schema';

@ObjectType()
export class Author {
    @Field(() => ID)    // <-- GraphQL type
    id: string          // <-- Typescript type

    @Field()
    name: string

    @Field(() => [Book])
    books: Book[]
}