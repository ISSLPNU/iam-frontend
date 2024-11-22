import {ComponentProps} from "react";
import styled, {css} from "styled-components";
import {X2Icon} from "../../../icons/mainIcons.tsx";

const StyledItemWrapper = styled.div<{ $disabled: boolean }>`
    display: flex;

    flex-direction: row;

    justify-content: space-between;
    align-items: center;

    border-radius: 5px;

    background-color: #ffffff10;

    ${props => props.$disabled && css`

    `}
`

const StyledItem = styled.div`
    padding: 5px;
`

export const SelectedItem = ({children, disabled, onRemove, ...props}: SelectedItemProps) => {
	return (
		<StyledItemWrapper {...props} $disabled={disabled || false}>
			<StyledItem>
				{children}
			</StyledItem>
			{disabled || <X2Icon role="button" onClick={onRemove}/>}
		</StyledItemWrapper>
	)
}

type SelectedItemProps = {
	disabled?: boolean
	onRemove?: () => void;
} & ComponentProps<"div">