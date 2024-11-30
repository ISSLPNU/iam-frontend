import styled from "styled-components";
import {ReactElement, useId} from "react";
import {
	Controller,
	ControllerFieldState,
	ControllerProps,
	ControllerRenderProps,
	FieldPath,
	FieldValues,
	UseFormStateReturn
} from "react-hook-form";
import {Label} from "../../common/label";


const StyledFormField = styled.div`
    display: flex;

    flex-direction: column;
		align-items: flex-start;

    width: 100%;

    font-size: 24px;
`

const StyledErrorMessage = styled.span`
    box-sizing: border-box;
    color: #ffffff;

    font-size: 14px;
    line-height: 18px;
    min-height: 18px;

    padding: 0 2px;
		
		&:not(:last-child){
        margin: 0 0 10px 0;
		}
`

export const FormField = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(
	{
		labelText,
		render,
		...props
	}: IFormFieldProps<TFieldValues, TName>) => {
	const generatedId = useId();
	const inputId: string = props.id || generatedId;

	return (
		<Controller<TFieldValues, TName>
			{...props}
			render={({field, fieldState, formState}) => (
				<StyledFormField key={inputId} className={fieldState.error?.message ? "invalid" : ""}>
					{labelText && <Label htmlFor={inputId}>{labelText}</Label>}
					{render({id: inputId, field, fieldState, formState})}
					<StyledErrorMessage>{fieldState.error?.message}</StyledErrorMessage>
				</StyledFormField>
			)}
		/>
	)
}

export type FormFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = {
	labelText?: string;
	id?: string;
} & Omit<ControllerProps<TFieldValues, TName>, "render">;

interface IFormFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> extends Omit<ControllerProps<TFieldValues, TName>, 'render'> {
	labelText?: string;
	id?: string;
	render: ({field, fieldState, formState}: {
		id: string
		field: ControllerRenderProps<TFieldValues, TName>
		fieldState: ControllerFieldState
		formState: UseFormStateReturn<TFieldValues>
	}) => ReactElement;
}