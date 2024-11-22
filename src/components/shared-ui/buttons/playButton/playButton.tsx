import styled from "styled-components";
import {StyledBaseButton, StyledSVGPath} from "../baseButtonStyles.tsx";
import {ButtonHTMLAttributes} from "react";

const StyledPlayButton = styled(StyledBaseButton)`
`

interface PlayButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}


export const PlayButton = ({...props}: PlayButtonProps) => {
  return (
    <StyledPlayButton {...props}>
      <svg width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <StyledSVGPath
          d="M4.73926 9.41816C4.73926 6.46089 4.73926 4.98225 5.35451 4.17615C5.89035 3.4741 6.70831 3.04382 7.59041 3C8.60322 2.94969 9.82168 3.78738 12.2586 5.46276L16.0138 8.04445C17.9449 9.3721 18.9105 10.0359 19.2494 10.8665C19.5458 11.593 19.5458 12.4067 19.2494 13.1332C18.9105 13.9638 17.9449 14.6276 16.0138 15.9553L12.2586 18.5369C9.82168 20.2123 8.60322 21.05 7.59041 20.9997C6.70831 20.9559 5.89035 20.5256 5.35451 19.8235C4.73926 19.0175 4.73926 17.5388 4.73926 14.5815V9.41816Z"
          fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </StyledPlayButton>
  )
}
