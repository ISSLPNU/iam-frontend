import {FieldPath, FieldValues} from "react-hook-form";
import {FormField, FormFieldProps} from "../formField/formField.tsx";
import styled from "styled-components";
import {BaseFormFieldStyled} from "../formField/baseFormFieldStyles.tsx";

const StyledDataPicker = styled.input`
	${BaseFormFieldStyled};

		&::-webkit-calendar-picker-indicator{
        color-scheme: dark;
		}
`

const formatDate = (dateString: string) => {
	const date = new Date(dateString)
	if (!isNaN(date.getTime())) {
		return date.toISOString().split("T")[0]
	}
	return ""
};

export const DatePickerField = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(
	{
		...props
	}: IDatePickerFieldProps & Omit<FormFieldProps<TFieldValues, TName>, "render">) => {
	return (
		<FormField {...props} render={({id, field}) => (
			<StyledDataPicker
				type="date"
				id={id}
				{...field}
				value={field.value ? formatDate(field.value) : ""}
				onChange={field.onChange}
			/>
		)}/>
	)
}

type IDatePickerFieldProps = {
}