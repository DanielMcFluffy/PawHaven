export type Case = {
  case_id: string;
  diagnosis: string;
  status: 'In-Progress' | 'Completed' | 'Incomplete';
  start_date: string;
  treatment_plan: string;
  prescription: Record<string, unknown>;
  end_date: string;
  notes: string;
  pet_id?: string;
  vet_id?: string;
  created_at: string;
  updated_at?: string;
}