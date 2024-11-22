import {FormField, FormFieldProps} from "../formField/formField.tsx";
import {FieldPath, FieldValues, useWatch} from "react-hook-form";
import styled from "styled-components";
import {useEffect, useRef} from "react";
import {BaseFormFieldStyled} from "../formField/baseFormFieldStyles.tsx";

const StyledTextArea = styled.textarea`
    ${BaseFormFieldStyled};

    resize: none;
    overflow: hidden;

    height: max-content;
`;

export const TextAreaField = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(
	{
		...props
	}: TextAreaFieldProps & Omit<FormFieldProps<TFieldValues, TName>, "render">) => {
	const fieldWatch = useWatch({name: props.name, control: props.control})
	const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

	const handleChange = () => {
		if (textAreaRef.current) {
			const area = textAreaRef.current;
			const styles = window.getComputedStyle(area);
			const borderWidth = parseFloat(styles.borderWidth);

			area.style.height = "auto"
			area.style.height = `${Math.round(area.scrollHeight + borderWidth + borderWidth)}px`;
		}
	}

	useEffect(handleChange, [fieldWatch]);

	return (
		<FormField {...props} render={({id, field}) => (
			<StyledTextArea
				id={id}
				{...field}
				ref={textAreaRef}
			/>
		)}/>
	);
}

type TextAreaFieldProps = {
}
