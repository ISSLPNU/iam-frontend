import {ComponentProps} from "react";
import styled from "styled-components";
import {ContentDetailsLineBody} from "./contentDetailsLineBody.tsx";
import {ContentDetailsLineLabel} from "./contentDetailsLineLabel.tsx";

const StyledLineWrapper = styled.div`
		box-sizing: border-box;
    display: flex;

    flex-direction: column;
		
		gap: 8px;
`

const ContentDetailsLineComponent = ({children, ...props}: ContentDetailsLineProps) => {
	return (
		<StyledLineWrapper {...props}>
			{children}
		</StyledLineWrapper>
	)
}

type ContentDetailsLineProps = {

} & ComponentProps<"div">

export const ContentDetailsLine = Object.assign(ContentDetailsLineComponent, {
	Label: ContentDetailsLineLabel,
	Body: ContentDetailsLineBody,
})