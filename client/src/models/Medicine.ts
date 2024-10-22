export type Medicine = {
  medicine_id: string;
  created_at: string;
  updated_at?: string;
} 
& MedicineName 
& Partial<Record<MedicineDetails, string>>

export type MedicineName = {
  medicine: {
    name: string;
    pronounciation: string;
    type: string;
  }
}
export type MedicineDetails = 
| 'Uses/Indications'
| 'Pharmacology/Actions'
| 'Pharmacokinetics'
| 'Contraindications/Precautions/Warnings'
| 'Adverse Effects'
| 'Reproductive/Nursing Safety'
| 'Overdosage/Acute Toxicity'