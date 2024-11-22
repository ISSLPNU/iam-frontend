import {ComponentProps} from "react";
import styled from "styled-components";

const StyledLabel = styled.div`
    display: flex;

    justify-content: flex-start;
    align-items: center;

		gap: 4px;
		
    color: ${({theme}) => theme.colors.textFaint};
		font-size: 18px;

    & > svg path {
        stroke: ${({theme}) => theme.colors.textFaint};
    }
`

export const ContentDetailsLineLabel = ({children, ...props}: ContentDetailsLineLabelProps) => {
	return (
		<StyledLabel {...props}>
			{children}
		</StyledLabel>
	)
}

type ContentDetailsLineLabelProps = {} & ComponentProps<"div">