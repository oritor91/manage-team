
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(phone: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(phone);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
