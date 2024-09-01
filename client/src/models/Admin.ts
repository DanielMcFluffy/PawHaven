export type Admin = {
  admin_id: string;
  superadmin: boolean;
  username: string;
  email: string;
  password: string;
  vet_id?: string;
  created_at: string;
  updated_at?: string;
}