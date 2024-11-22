import {ComponentProps} from "react";
import styled from "styled-components";

const StyledBody = styled.div`
    display: flex;

		flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
		
		gap: 10px;
`

export const ContentDetailsLineBody = ({children, ...props}: ContentDetailsLineBodyProps) => {
	return (
		<StyledBody {...props}>
			{children}
		</StyledBody>
	)
}

type ContentDetailsLineBodyProps = {} & ComponentProps<"div">