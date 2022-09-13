import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Book, CreateBookInput, FindBookInput } from './book.schema';
import { BookService } from './book.service';
import { Author } from '../author/author.schema';
import { AuthorService } from '../author/author.service';

@Resolver(() => Book)
export class BookResolver {
    constructor(private bookService: BookService, private authorService: AuthorService) {}

    @Query(() => [Book]) // what the query will return
    async books() { // <-- books is query name
        return this.bookService.find() // resolve the query
    }

    @Query(() => Book)
    async book(@Args('input') {id}: FindBookInput) {
        return this.bookService.findById(id)
    }

    @ResolveField(() => Author)
    async author(@Parent() book: Book) {
        return this.authorService.findById(book.author)
    }

    @Mutation(() => Book)
    async createBook(@Args('input') book:CreateBookInput) { // named argument e.g. input is preffered
        return this.bookService.createBook(book)
    }
}
