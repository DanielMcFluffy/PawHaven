import z from 'zod';

export const registerRequestSchema = z.object({
  username: z.string({message: 'Username cannot be blank'}).refine((val) => val.length > 3 , {message: 'Username must be between 3 and 20 characters'}),
  password: z.string({message: 'Password cannot be blank'})
      .min(6, {message: 'Password must be at least 6 characters long'})
      .regex(/[A-Z]/, {message: 'Password must contain at least one uppercase letter'})
      .regex(/[a-z]/, {message: 'Password must contain at least one lowercase letter'})
      .regex(/[0-9]/, {message: 'Password must contain at least one number'})
      .regex(/[^A-Za-z0-9]/, {message: 'Password must contain at least one special character'}),
  email: z.string({message: 'Email is required'})
    .email({message: 'Invalid email'})
})

export const loginRequestSchema = z.object({
  username: z.string({message: 'Username cannot be blank'}).refine((val) => val.length > 3 , {message: 'Username must be between 3 and 20 characters'}),
  password: z.string({message: 'Password cannot be blank'})
      .min(6, {message: 'Password must be at least 6 characters long'})
      .regex(/[A-Z]/, {message: 'Password must contain at least one uppercase letter'})
      .regex(/[a-z]/, {message: 'Password must contain at least one lowercase letter'})
      .regex(/[0-9]/, {message: 'Password must contain at least one number'})
      .regex(/[^A-Za-z0-9]/, {message: 'Password must contain at least one special character'}),
})

export const updateUserRequestSchema = z.object({
  email: z.string({message: 'Email is required'})
    .email({message: 'Invalid email'})
})

export const updateMedicineRequestSchema = z.object({
  medicine: z.object({
   name: z.string({message: 'Medicine name cannot be blank'}),
   type: z.string({message: 'Medicine type cannot be blank'}),
   pronounciation: z.string({message: 'Medicine type cannot be blank'}), 
  }),
  medicineDetail: z.object({
    'Uses/Indications': z.string({message: 'Medicine detail (Uses/Indications) cannot be blank'}).optional(),
    'Pharmacology/Actions': z.string({message: 'Medicine detail (Pharmacology/Actions) cannot be blank'}).optional(),
    'Pharmacokinetics': z.string({message: 'Medicine detail (Pharmacokinetics) cannot be blank'}).optional(),
    'Contraindications/Precautions/Warnings': z.string({message: 'Medicine detail (Contraindications/Precautions/Warnings) cannot be blank'}).optional(),
    'Adverse Effects': z.string({message: 'Medicine detail (Adverse Effects) cannot be blank'}).optional(),
    'Reproductive/Nursing Safety': z.string({message: 'Medicine detail (Reproductive/Nursing Safety) cannot be blank'}).optional(), 
    'Overdosage/Acute Toxicity': z.string({message: 'Medicine detail (Overdosage/Acute Toxicity) cannot be blank'}).optional(), 
  })
})

export type TRegisterRequest = z.infer<typeof registerRequestSchema>;
export type TLoginRequest = z.infer<typeof loginRequestSchema>;
export type TUpdateUserRequest = z.infer<typeof updateUserRequestSchema>;