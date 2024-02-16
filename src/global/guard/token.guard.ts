import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from 'src/api/token/token.service';
import { UserService } from 'src/api/user/user.service';
import { validationData } from '../utils/validation.util';
import { isDifferentUtil } from '../utils/comparsion.util';
import { Itoken } from '../interfaces/itoken/itoken.interface';
import { User } from 'src/api/user/entity/user.entity';

@Injectable()
export default class TokenGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token: string | string[] = request.headers['authorization'];

    if (validationData(token)) {
      throw new UnauthorizedException('토큰이 전송되지 않았습니다.');
    }

    if (Array.isArray(token)) {
      throw new UnauthorizedException('잘못된 토큰입니다.');
    }

    const cuttingToken: string[] = token.split('Bearer');
    if (validationData(cuttingToken[0])) {
      throw new UnauthorizedException('잘못된 토큰입니다.');
    }

    const { iss, sub, userId }: Itoken = await this.tokenService.verifyToken(
      cuttingToken[1],
    );

    if ((isDifferentUtil(iss, 'ducademi'), isDifferentUtil(sub, 'token'))) {
      throw new UnauthorizedException('토큰이 위조되었습니다.');
    }
    const user: User = await this.userService.findByUserId(userId);
    request.user = user;
    return true;
  }
}
