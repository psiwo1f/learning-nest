import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@ApiBearerAuth()
@ApiTags('bookmarks')
@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
	constructor(private bookmarkService: BookmarkService) {}
	@ApiOperation ({ summary: 'Get all bookmarks' })
	// @ApiResponse({ status: 403, description: 'Forbidden.' })
	@Get()
	getBookmarks(@GetUser('id') userId: number) {
		return this.bookmarkService.getBookmarks(userId)
	}

	@ApiOperation ({ summary: 'Get a bookmark' })
	@Get(':id')
	getBookmarkById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookmarkId: number) {
		return this.bookmarkService.getBookmarkById(userId, bookmarkId)
	}

	@ApiOperation ({ summary: 'Create a bookmark' })
	@Post()
	createBookmark(@GetUser('id') userId: number, @Body() dto: CreateBookmarkDto) {
		return this.bookmarkService.createBookmark(userId, dto)
	}

	@ApiOperation ({ summary: 'Edit a bookmark' })
	@Patch(':id')
	editBookmarkById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookmarkId: number, @Body() dto: EditBookmarkDto) {
		return this.bookmarkService.editBookmarkById(userId, bookmarkId, dto)
	}

	@ApiOperation ({ summary: 'Delete a bookmark' })
	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete(':id')
	deleteBookmarkById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookmarkId: number) {
		return this.bookmarkService.deleteBookmarkById(userId, bookmarkId)
	}
}
