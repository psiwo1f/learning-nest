import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserDetails } from 'src/user/user-details.interface';
import { UserService } from './../user/user.service';
import { ExistingUserDto } from '../user/dto/existing-user.dto';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 12)
    }

    async register(dto: Readonly<CreateUserDto>): Promise<UserDetails | string | null> {
        const {name, email, password} = dto;
        const existingUser = await this.userService.findEmail(email)
        if(existingUser) return 'Email already taken!'
        const hashedPassword = await this.hashPassword(password)
        const newUser = await this.userService.create(name, email, hashedPassword)
        return this.userService._getUserDetails(newUser)
    }

    async isPasswordMatch(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword)
    }

    async validateUser(email: string, password: string): Promise<UserDetails | null> {
        const user = await this.userService.findEmail(email)
        const doesUserExist = !!user

        if(!doesUserExist) return null
        const doesPasswordMatch = await this.isPasswordMatch(password, user.password)

        // not a v.good check, a any unresolved promise would also be truthy even if it's actually expecting a false
        if(!doesPasswordMatch) return null
        return this.userService._getUserDetails(user)
    }

    async login(dto: ExistingUserDto): Promise<{token: string} | null> {
        const {email, password} = dto
        const user = await this.validateUser(email, password)
        // console.log('-------', user)
        if(!user) return null

        const jwt = await this.jwtService.signAsync({user})

        return {token: jwt}
    }

}
