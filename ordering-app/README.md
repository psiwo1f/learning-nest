<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


# Ordering App
A microservices based NestJs app with RabbitMQ, Mongo & Docker


## Tools
- mongoose
- joi
- RabbitMQ

## Steps
- create a nest app
```
$ nest new ordering-app
$ cd ordering-app
```

- convert to a mono-repo to hold different microservices
- create first & primary app **orders**
```
$ nest generate app orders
```

- delete the **ordering-app** and make orders as root app
- create two more apps **billing** and **auth**
```
$ nest g app billing
$ nest g app auth
```

- to run dev
```
$ yarn start:dev
```

- to run a different app
```
$ yarn start:dev <app-name>
```

- to share code between different microservices, we will create a common library
$ nest g library common

- add db files and config

- create schemas

- create docker-compose
replica set to use database transaction functionality

- after setting up docker-compose and Dockerfile
$ docker-compose up --build -V


## Notes
- course from [YouTube](https://www.youtube.com/watch?v=yuVVKB0EaOQ)
- about acknowledgement at 56:00