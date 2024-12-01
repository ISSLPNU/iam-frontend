import styled from "styled-components";
import {NavLinkProps, To, useNavigate} from "react-router-dom";
import {ReactNode} from "react";

const StyledRouteLink = styled.a`
    box-sizing: border-box;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 16px;
    transition: .2s;
    text-decoration: none;

    color: #0069ff;

    user-select: none;

    &:hover {
        color: #0d419b;
        cursor: pointer;
    }
`

const StyledLinkIconWrapper = styled.div`

`

export const RouteLink = ({children, icon, ...props}: IRouteLinkProps) => {
	const navigate = useNavigate();

	return (
		<StyledRouteLink
			onClick={(_) => {
				if (props.to) {
					navigate(props.to as string);
				}
			}}
		>
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
	icon?: ReactNode;
	children?: ReactNode;
	to?: To;
} & Omit<NavLinkProps, "to">;
