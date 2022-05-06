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
  organizer: object | null;
  host: object | null;
  photo: object | null;
}
