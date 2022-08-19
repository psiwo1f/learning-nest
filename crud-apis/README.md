<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


## Simple CRUD APIs

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Some commands

```
// creating modules using CLI
$ nest g module <module-name>

// creating services/providers using CLI
$ nest g service <service-name>

$ npx prisma init
$ npx prisma migrate dev
$ npx prisma studio

```

## Tools
 - postgres (RDBMS)
 - prisma (ORM)
 - argon (hashing)
 - jest
 - pactum (e2e testing)


 ## Notes
 - created a hook to run before another command e.g.

 ```
 // package.json
 "pretest:e2e": "yarn db:test:restart",
 ```

 - from prisma use `$transaction` to run queries in order. See `cleanDb()` method in prisma.service.ts