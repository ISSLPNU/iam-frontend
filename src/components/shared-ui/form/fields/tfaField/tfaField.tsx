import {FieldPath, FieldValues} from "react-hook-form";
import {FormField, FormFieldProps} from "../../formField/formField.tsx";
import {ComponentProps} from "react";
import styled, {css} from "styled-components";
import {Button} from "../../../common/button";

const StyledTFAField = styled.div`
    display: flex;

    flex-direction: row;

    justify-content: space-between;
    align-items: center;

    width: 100%;
`

const StyledTFAText = styled.span<{ $enabled: boolean }>`
    color: #f84f4f;

    font-weight: 500;
    font-size: 22px;

    ${({$enabled}) => $enabled && css`
        color: #38d963;
    `}
`

const StyledTFALabel = styled.span<{ $enabled: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;

    background: #f84f4f33;
    color: #f84f4f;

    padding: 2px 6px;
    border-radius: 6px;

    font-weight: 600;

    font-size: 16px;

    ${({$enabled}) => $enabled && css`
        background: #38d96333;
        color: #38d963;
    `}
`

const StyledSide = styled.div`
    display: flex;
    flex-direction: row;

    gap: 10px;
`

const StyledEnableTFAButton = styled(Button)`
    height: min-content;
    font-size: 14px;
    padding: 2px 15px
`

export const TFAField = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(
	{
		onToggleTFA,
		...props
	}: PasswordFieldProps & Omit<FormFieldProps<TFieldValues, TName>, "render">) => {
	return (
		<FormField {...props} render={({id, field}) => (
			<StyledTFAField id={id}>
				<StyledSide>
					<StyledTFAText $enabled={field.value === true}>TFA:</StyledTFAText>
					<StyledTFALabel $enabled={field.value === true}>
						{field.value === true ? "Enabled" : "Disabled"}
					</StyledTFALabel>
				</StyledSide>
				<StyledSide>
					<StyledEnableTFAButton themeStyle={field.value === false ? "success" : "danger"}
					                       onClick={() => onToggleTFA?.(!!field.value)}
					>
						{field.value === false ? "Enable TFA" : "Disable TFA"}
					</StyledEnableTFAButton>
				</StyledSide>
			</StyledTFAField>
		)}/>
	)
}

type PasswordFieldProps = {
	onToggleTFA?: (isTFAEnabled: boolean) => void
} & ComponentProps<"div">