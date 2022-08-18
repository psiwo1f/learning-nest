import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(dto: AuthDto) {
    try {
      // generate passowrd hash
      const hash = await argon.hash(dto.password);
      // save user to db
      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });
      // return saved user
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          // P2002: prisma code for duplicate error
          throw new ForbiddenException('Email is taken');
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    // find user
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    // if not found throw error
    if (!user) {
      throw new ForbiddenException('Email does not exist');
    }

    // if found compare password
    const pwMatch = await argon.verify(user.hash, dto.password);

    if (!pwMatch) {
      throw new ForbiddenException('Password is inccorect');
    }

    return this.signToken(user.id, user.email);
  }

  async signToken(userId: number, email: string): Promise<{access_token: string}> {
    const payload = { sub: userId, email };
	const secret = this.config.get('JWT_SECRET')
	const token = await this.jwt.signAsync(payload, { expiresIn: '15m', secret});
    return {access_token: token}
  }
}
