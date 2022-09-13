import { Injectable } from '@nestjs/common';
import books from '../data/books';
import { Book, CreateBookInput } from './book.schema';

@Injectable()
export class BookService {

    books: Partial<Book>[]
    constructor() {
        this.books = books
    }
    async find() {
        return this.books
    }

    async findById(id) {
        // below can be improved, no need of filter
        const books = this.books.filter(b => b.id === id)
        if(books.length) {
            return books[0]
        }
        return null
    }

    async findByAuthorId(authId) {
        return this.books.filter(b => b.author === authId)
    }

    async createBook(book: CreateBookInput) {
        this.books = [book, ...this.books]
        return book
    }


}
