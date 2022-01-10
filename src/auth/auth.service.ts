import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

const users = require('../users.json');

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private users:UsersService) {}

  signinLocal(users: any) {
    // retrieve user
    const user = users.findUser((_user) => _user.email === users.email);
    if (!user) throw new UnauthorizedException('Credentials incorrect');
    if (user.password !== users.password)
    throw new UnauthorizedException('Credentials incorrect');
      

    return this.signUser(user.id, user.email, 'user');
  }

  signUser(userId: number, email: string, type: string) {
    return this.jwtService.sign({
      sub: userId,
      email,
      type: type,
    });
  }
}