import styled from "styled-components";
import {StyledBaseButton, StyledSVGPath} from "../baseButtonStyles.tsx";
import {ButtonHTMLAttributes} from "react";

const StyledDislikeButton = styled(StyledBaseButton)`
`

interface DislikeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}

export const DislikeButton = ({...props}: DislikeButtonProps) => {
  return (
    <StyledDislikeButton {...props}>
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <StyledSVGPath
          d="M7.18359 2L7.18359 13H6.98359C5.30344 13 4.46336 13 3.82162 12.673C3.25714 12.3854 2.79819 11.9265 2.51057 11.362C2.18359 10.7202 2.18359 9.88016 2.18359 8.2L2.18359 6.8C2.18359 5.11984 2.18359 4.27976 2.51057 3.63803C2.79819 3.07354 3.25714 2.6146 3.82162 2.32698C4.46336 2 5.30344 2 6.98359 2L7.18359 2ZM7.18359 2L12.5594 2C14.8375 2 15.9765 2 16.942 2.33918C18.1979 2.78042 19.2714 3.6268 19.9936 4.74508C20.5487 5.60472 20.8145 6.7123 21.3462 8.92745C21.7543 10.6281 21.9584 11.4784 21.8051 12.1591C21.6058 13.0443 21.0165 13.7917 20.2023 14.1921C19.5762 14.5 18.7 14.5 16.9476 14.5C16.2361 14.5 15.8803 14.5 15.6009 14.6178C15.2403 14.7698 14.9534 15.0567 14.8014 15.4173C14.6836 15.6968 14.6836 16.0518 14.6836 16.7619V20.3729C14.6836 20.4909 14.6836 20.5499 14.6803 20.5997C14.6303 21.3496 14.0332 21.9467 13.2833 21.9967C13.2335 22 13.1745 22 13.0565 22C12.9531 22 12.9014 22 12.8537 21.9977C12.1502 21.9641 11.5163 21.5629 11.1848 20.9416C11.1622 20.8994 11.1401 20.8527 11.0959 20.7593L7.18359 12.5L7.18359 2Z"
          stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </StyledDislikeButton>
  )
}
