import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Book } from './book.schema';
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

    @ResolveField(() => Author)
    async author(@Parent() book: Book) {
        return this.authorService.findById(book.author)
    }
}
