import styled from "styled-components";
import {NavLink, NavLinkProps} from "react-router-dom";
import {ReactNode} from "react";

const StyledRouteLink = styled(NavLink)`
    box-sizing: border-box;
    padding: 5px 10px;
    border-radius: 5px;

    width: 100%;

    font-size: 18px;

    color: #fff;

    transition: .2s;

    background: #101010;

    &:hover {
        color: #0069ff;
        background-color: #0069ff22;
    }
`

const StyledLinkIconWrapper = styled.div`

`

export const RouteLink = ({children, icon, ...props}: IRouteLinkProps) => {
  return (
    <StyledRouteLink {...props}>
      {icon && (
        <StyledLinkIconWrapper>
          {icon}
        </StyledLinkIconWrapper>
      )}
      {children}
    </StyledRouteLink>
  )
}

export type IRouteLinkProps = {
  icon?: ReactNode
  children?: ReactNode
} & NavLinkProps
