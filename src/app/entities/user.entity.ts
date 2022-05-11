export interface UserEntity {
  id: string;
  email: string | undefined;
  first_name: string;
  last_name: string;
  is_admin: boolean;
  is_verified: boolean;
  is_member: boolean;
  is_banned: boolean;
  is_public: boolean;
  created_at: Date | undefined;
  updated_at: Date | undefined;
  user_email_verifications: object[] | undefined;
  login_tokens: object[] | undefined;
  organized_space_events: object[] | undefined;
  hosted_space_events: object[] | undefined;
  owned_inventory_items: object[] | undefined;
  donated_inventory_items: object[] | undefined;
  maintained_inventory_items: object[] | undefined;
  created_inventory_items: object[] | undefined;
  photos: object[] | undefined;
}
