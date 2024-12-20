import styled from "styled-components";
import {StyledBaseButton, StyledSVGPath} from "../baseButtonStyles.tsx";
import {ButtonHTMLAttributes} from "react";

const StyledLikeButton = styled(StyledBaseButton)`
`

interface LikeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}

export const LikeButton = ({...props}: LikeButtonProps) => {
  return (
    <StyledLikeButton {...props}>
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <StyledSVGPath
          d="M7.18372 22V11H6.98372C5.30356 11 4.46348 11 3.82174 11.327C3.25726 11.6146 2.79832 12.0735 2.5107 12.638C2.18372 13.2798 2.18372 14.1198 2.18372 15.8V17.2C2.18372 18.8802 2.18372 19.7202 2.5107 20.362C2.79832 20.9265 3.25726 21.3854 3.82174 21.673C4.46348 22 5.30356 22 6.98372 22H7.18372ZM7.18372 22H12.5595C14.8376 22 15.9766 22 16.9421 21.6608C18.198 21.2196 19.2716 20.3732 19.9937 19.2549C20.5488 18.3953 20.8147 17.2877 21.3463 15.0725C21.7545 13.3719 21.9585 12.5216 21.8052 11.8409C21.6059 10.9557 21.0166 10.2083 20.2024 9.80792C19.5763 9.5 18.7001 9.5 16.9477 9.5C16.2362 9.5 15.8805 9.5 15.601 9.38221C15.2404 9.23019 14.9535 8.94328 14.8015 8.58267C14.6837 8.30324 14.6837 7.94818 14.6837 7.23806V3.6271C14.6837 3.50908 14.6837 3.45007 14.6804 3.40025C14.6304 2.65042 14.0333 2.05329 13.2835 2.00332C13.2336 2 13.1746 2 13.0566 2C12.9532 2 12.9016 2 12.8538 2.00228C12.1503 2.03594 11.5164 2.4371 11.1849 3.05843C11.1624 3.10061 11.1402 3.14732 11.096 3.24074L7.18372 11.5V22Z"
          stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </StyledLikeButton>
  )
}
