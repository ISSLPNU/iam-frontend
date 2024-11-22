import styled from "styled-components";
import {StyledBaseButton, StyledSVGPath} from "../baseButtonStyles.tsx";
import {ButtonHTMLAttributes} from "react";

const StyledPlayButton = styled(StyledBaseButton)`
`

interface AddButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}

export const AddButton = ({...props}: AddButtonProps) => {
  return (
    <StyledPlayButton {...props}>
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <StyledSVGPath fillRule="evenodd" clipRule="evenodd"
                       d="M12.1345 5.08991C12.0895 5.14103 12.067 5.16659 12.0425 5.17526C12.0202 5.18314 11.9981 5.18314 11.9758 5.17527C11.9513 5.1666 11.9288 5.14105 11.8838 5.08995C9.87593 2.80969 6.63276 2.23462 4.18342 4.38808C1.68244 6.58695 1.33034 10.2633 3.29437 12.8639C4.65195 14.6615 8.29652 18.1166 10.4178 20.0789C10.9669 20.5867 11.2414 20.8407 11.5679 20.9412C11.8499 21.028 12.1684 21.028 12.4504 20.9412C12.7769 20.8407 13.0514 20.5867 13.6005 20.0789C15.7218 18.1166 19.3664 14.6615 20.7239 12.8639C22.688 10.2633 22.3788 6.56382 19.8349 4.38808C17.3435 2.25729 14.1407 2.81062 12.1345 5.08991Z"
                       stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </StyledPlayButton>
  )
}
