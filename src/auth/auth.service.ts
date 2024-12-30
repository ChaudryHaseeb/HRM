import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

async validateUser(username: string, password: string): Promise<any> {
    const user = { id: 1, username: 'test', password: 'test' };
    if (user && user.password === password) {
      return { id: user.id, username: user.username };
    }
    return null;
  }
  
  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
