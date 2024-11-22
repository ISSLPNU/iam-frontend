import {ComponentProps} from "react";
import styled from "styled-components";

const StyledTitle = styled.div<{ $colors: { light?: string, dark?: string } }>`
    box-sizing: border-box;
    display: flex;

    flex-direction: row;

    justify-content: center;
    align-items: center;

    padding: 10px;
    border-radius: 10px;

    font-weight: 700;

    color: ${props => props.$colors.dark};
    background-color: ${props => props.$colors.light};

    user-select: none;
		
		text-wrap: nowrap;
`


export const ColoredSectionTitle = ({colors, children, ...props}: ColoredSectionTitleProps) => {
	return (
		<StyledTitle {...props} $colors={colors || {light: "#f84f4f33", dark: "#f84f4f"}}>
			{children}
		</StyledTitle>
	)
}

type ColoredSectionTitleProps = {
	colors?: {
		light?: string,
		dark?: string,
	}
} & ComponentProps<"div">