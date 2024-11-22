import styled from "styled-components";
import {Children, ComponentProps} from "react";

const StyledNavList = styled.div`
    display: flex;
    
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 5px;

    width: 100%;    
    height: max-content;
`

const StyledRow = styled.div`
    box-sizing: border-box;
    display: flex;

    width: 100%;

    &:not(:last-child) {
        border-bottom: 2px solid #101010;
    }
`

export const NavList = ({children, ...props}: ComponentProps<"div">) => {
  return (
    <StyledNavList {...props}>
      {Children.map(children, (child, index) => {
        return (
          <StyledRow key={index}>{child}</StyledRow>
        )
      })}
    </StyledNavList>
  )
}
