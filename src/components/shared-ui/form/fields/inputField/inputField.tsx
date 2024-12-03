import {ComponentProps} from "react";
import {FieldPath, FieldValues} from "react-hook-form";
import {FormField, FormFieldProps} from "../../formField/formField.tsx";
import {Input} from "../../inputs/input/input.tsx";

export const InputField = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(
	{
		...props
	}: InputFieldProps & Omit<FormFieldProps<TFieldValues, TName>, "render">) => {
	return (
		<FormField {...props} render={({id, field, fieldState}) => (
			<Input id={id}
			       {...field}
			       type={props.type}
			       readOnly={props.readOnly}
			       invalid={fieldState.invalid}
			/>
		)}/>
	)
}

type InputFieldProps = {} & ComponentProps<"input">