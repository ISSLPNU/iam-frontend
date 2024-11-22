import styled from "styled-components";
import {ComponentProps} from "react";


const StyledLink = styled.a`
    color: #fff;
    
    &:visited{
        color: #535bf2;
    }
`

export const Link = ({children, ...props}: ComponentProps<"a">) => {
  return (
    <StyledLink {...props}>
      {children}
    </StyledLink>
  )
}
