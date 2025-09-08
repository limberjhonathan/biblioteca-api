import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    // Garantir que o secret nunca seja undefined
    const jwtSecret = configService.get<string>('JWT_SECRET') || 'segredo123';

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: { sub: number; role: string }) {
    // Retorna dados que estarão disponíveis em req.user
    
    return { userId: payload.sub, role: payload.role };
  }
}
