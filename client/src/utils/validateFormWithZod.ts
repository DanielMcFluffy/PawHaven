import { z, ZodObject, ZodRawShape } from "zod";
// intergrated as a part of useForm hook
export const validateFormWithZod = <T extends ZodRawShape>(
  schema: ZodObject<T>,
  formValue: z.infer<typeof schema>
) => {
const {success, error, data} = schema.safeParse(formValue);
const formattedError = error?.format()
return {success, error, formattedError, data}
} 


