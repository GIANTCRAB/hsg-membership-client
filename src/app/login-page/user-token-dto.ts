import { UserEntity } from '../entities/user.entity';
import { LoginTokenEntity } from '../entities/login-token.entity';

export interface UserTokenDto {
  user: UserEntity;
  login_token: LoginTokenEntity;
}
