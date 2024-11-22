import styled from "styled-components";
import {ComponentProps} from "react";

const StyledSection = styled.section`
  box-sizing: border-box;
  padding: 10px;

  border-radius: 15px;

  background-color: #111111;

  overflow: auto;
`

export const Section = ({children, ...props}: ComponentProps<"section">) => {
  return (
    <StyledSection {...props}>
      {children}
    </StyledSection>
  )
}
