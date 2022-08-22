import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { AuthDto } from '../src/auth/dto/auth.dto';
import { EditUserDto } from 'src/user/dto';
import { CreateBookmarkDto, EditBookmarkDto } from 'src/bookmark/dto';

describe('App e2e', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();
    app = moduleRef.createNestApplication()
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true
      })
    )
    await app.init()
    await app.listen(3333)

    prisma = app.get(PrismaService)
    await prisma.cleanDb()
    pactum.request.setBaseUrl('http://localhost:3333')
  })
  
  afterAll(() => {
    app.close()
  })

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'test1@email.com',
      password: '123',
    }
    describe('Signup', () => {
      it('should throw if email empty', () => {
        return pactum.spec().post('/auth/signup').withBody({password: dto.password}).expectStatus(400)
      })
      it('should throw if password empty', () => {
        return pactum.spec().post('/auth/signup').withBody({email: dto.email}).expectStatus(400)
      })
      it('should signup', () => {
        return pactum.spec().post('/auth/signup').withBody(dto).expectStatus(201)
      })
    })

    it('should throw if email empty', () => {
      return pactum.spec().post('/auth/signin').withBody({password: dto.password}).expectStatus(400)
    })
    it('should throw if password empty', () => {
      return pactum.spec().post('/auth/signin').withBody({email: dto.email}).expectStatus(400)
    })
    describe('Signin', () => {
      it('should signin', () => {
        return pactum.spec().post('/auth/signin').withBody(dto).expectStatus(200).stores('userAT', 'access_token')
      })
    })
  })

  describe('User', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum.spec().get('/users/me').withHeaders({Authorization: 'Bearer $S{userAT}'}).expectStatus(200)
      })
    })

    describe('Edit user', () => {
      it('should edit the user', () => {
        const dto: EditUserDto = {firstName: 'name1F', lastName: 'name1L'}
        return pactum.spec().patch('/users').withHeaders({Authorization: 'Bearer $S{userAT}'}).withBody(dto).expectStatus(200)
      })
    })
  })

  describe('Bookmarks', () => {
    describe('Get empty bookmarks', () => {
      it('should get bookmarks', () => {
        return pactum.spec().get('/bookmarks').withHeaders({Authorization: 'Bearer $S{userAT}'}).expectStatus(200).expectBody([])
      })
    })

    describe('Create bookmark', () => {
      it('should create a bookmark', () => {
        const dto: CreateBookmarkDto = {title: 'My first bookmar',  description: 'Desc of my first bookmark', link: '/bookmarks/bkmrk'}
        return pactum.spec().post('/bookmarks').withHeaders({Authorization: 'Bearer $S{userAT}'}).withBody(dto).expectStatus(201).stores('bookmarkId', 'id')
        // .inspect()
      })
    })
    
    describe('Get bookmarks', () => {
      it('should get bookmarks', () => {
        return pactum.spec().get('/bookmarks').withHeaders({Authorization: 'Bearer $S{userAT}'}).expectStatus(200).expectJsonLength(1)
      })
    })

    describe('Get bookmark by id', () => {
      // test.todo('should get a bookmark by id')
      it('should get a bookmark by id', () => {
        return pactum.spec().get('/bookmarks/{id}').withPathParams('id', '$S{bookmarkId}').withHeaders({Authorization: 'Bearer $S{userAT}'}).expectStatus(200)
      })
    })

    describe('Edit bookmark by id', () => {
      // test.todo('Edit bookmark by id')
      it('should edit a bookmark by id', () => {
        const dto: EditBookmarkDto = {title: 'My first bookmar Edited',  description: 'Desc of my first bookmark edited'}
        return pactum.spec().patch('/bookmarks/{id}').withPathParams('id', '$S{bookmarkId}').withHeaders({Authorization: 'Bearer $S{userAT}'}).withBody(dto).expectStatus(200).expectBodyContains(dto.title).expectBodyContains(dto.description).inspect()
      })
    })

    describe('Delete bookmark by id', () => {
      // test.todo('Delete bookmark by id')
      it('should delete a bookmark by id', () => {
        return pactum.spec().delete('/bookmarks/{id}').withPathParams('id', '$S{bookmarkId}').withHeaders({Authorization: 'Bearer $S{userAT}'}).expectStatus(204)
      })

      it('should get empty bookmarks', () => {
        return pactum.spec().get('/bookmarks').withHeaders({Authorization: 'Bearer $S{userAT}'}).expectStatus(200).expectJsonLength(0)
      })
    })
  })

})