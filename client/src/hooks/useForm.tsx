import { z, ZodObject, ZodRawShape } from "zod";

export const useForm = <T extends ZodRawShape>(
  schema: ZodObject<T>,
  formValue: z.infer<typeof schema>
) => {
const {success, error, data} = schema.safeParse(formValue);
const formattedError = error?.format()
return {success, error, formattedError, data}
} 


