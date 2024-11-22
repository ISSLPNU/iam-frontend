import {ComponentProps} from "react";
import styled, {css} from "styled-components";

const StyledItemWrapper = styled.div<{ $disabled: boolean, $colors?: { light?: string, dark?: string } }>`
    display: flex;

    flex-direction: row;

    justify-content: space-between;
    align-items: center;

    border-radius: 5px;

    color: ${props => props.$colors?.dark || "#fffff"};
    background-color: ${props => props.$colors?.light || "#ffffff10"};

    ${props => props.$disabled && css`

    `}
`

const StyledItem = styled.div`
    padding: 5px;
`

export const SelectedItem = ({children, disabled, colors, ...props}: SelectedItemProps) => {
	return (
		<StyledItemWrapper {...props} $disabled={disabled || false} $colors={colors}>
			<StyledItem>
				{children}
			</StyledItem>
		</StyledItemWrapper>
	)
}

type SelectedItemProps = {
	colors?: { light?: string, dark?: string }
	disabled?: boolean
} & ComponentProps<"div">