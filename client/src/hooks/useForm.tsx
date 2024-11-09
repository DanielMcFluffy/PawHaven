import React from "react"
import { z, ZodObject, ZodRawShape } from "zod"

export const useForm = <T extends ZodRawShape>(schema: ZodObject<T>, initialValue?: z.infer<typeof schema>) => {
    const initialFormValue =
     initialValue ? 
     initialValue : 
     Object.keys(schema.shape).reduce((acc, key) => {
        (acc as Record<string, string>)[key] = "";  
        return acc;
    }, {} as z.infer<typeof schema>);

    const [formValue, setFormValue] = React.useState<
    z.infer<typeof schema>
    >(initialFormValue);

    const initialTouchedValue = Object.keys(schema.shape).reduce((acc, key) => {
        (acc as Record<string, boolean>)[key] = false;
        return acc
    }, {} as Record<keyof z.infer<typeof schema>, boolean>)

    const [formInputsTouched, setFormInputsTouched] = React.useState<Record<keyof z.infer<typeof schema>, boolean>>(initialTouchedValue);
   
    const resetFormInputsTouched = () => setFormInputsTouched(initialTouchedValue);
    const onBlurHandler = (
        property: keyof z.infer<typeof schema>
    ) => {
        setFormInputsTouched(x => ({
            ...x as Record<keyof z.infer<typeof schema>, boolean>,
            [property]: true
        }))
    }
    const onChangeHandler = (
        e: React.ChangeEvent<HTMLInputElement>,
        property: keyof z.infer<typeof schema>
    ) => {
        setFormValue(x => ({
            ...x,
            [property]: e.target.value
        }))
    }
    const {success, error, data} = schema.safeParse(formValue);
    const formattedError = error?.format();
    
    return {
        formValue, 
        setFormValue,
        formInputsTouched,
        resetFormInputsTouched,
        onBlurHandler,
        onChangeHandler, 
        success, 
        error, 
        formattedError, 
        data};
}