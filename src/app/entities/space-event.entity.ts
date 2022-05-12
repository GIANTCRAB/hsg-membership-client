import { UserEntity } from './user.entity';

export interface SpaceEventEntity {
  id: string;
  title: string;
  description: string;
  is_valid: boolean;
  is_approved: boolean;
  created_at: Date;
  updated_at: Date;
  event_start_date: Date;
  event_end_date: Date;
  organizer: UserEntity | null;
  host: UserEntity | null;
  photo: object | null;
}
