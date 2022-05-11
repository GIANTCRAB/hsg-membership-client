import { UserEntity } from './user.entity';

export interface LoginTokenEntity {
  id: string;
  value: string;
  created_at: Date | undefined;
  expires_at: Date;
  user: UserEntity | undefined;
}
