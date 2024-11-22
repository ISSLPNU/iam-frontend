import {Controller, ControllerProps, FieldValues} from "react-hook-form";
import {FormField} from "../formField";

interface IFormFieldControllerProps<T extends FieldValues> extends ControllerProps<T> {
    labelText?: string;
    fieldType?: string;
}

export const FormFieldController = <T extends FieldValues>(
    {
        labelText,
        fieldType,
        ...props
    }: Omit<IFormFieldControllerProps<T>, "render">) => {

    return (
        <Controller<T>
            {...props}
            render={({field, fieldState}) => (
                <FormField
                    labelText={labelText}
                    errorMessage={fieldState.error?.message}
                    type={fieldType} {...field}
                    value={field.value || ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                />
            )}
        />
    )
}