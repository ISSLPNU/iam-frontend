import {ComponentProps} from "react";
import {FormField, FormFieldProps} from "../../formField/formField.tsx";
import {Password} from "../../inputs/password/password.tsx";
import {FieldPath, FieldValues} from "react-hook-form";

export const PasswordField = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(
	{
		...props
	}: PasswordFieldProps & Omit<FormFieldProps<TFieldValues, TName>, "render">) => {
	return (
		<FormField {...props} render={({id, field, fieldState}) => (
			<Password id={id}
			          {...field}
			          invalid={fieldState.invalid}
			/>
		)}/>
	)
}

type PasswordFieldProps = {} & ComponentProps<"div">