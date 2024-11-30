import {ComponentProps} from "react";
import {Outlet} from "react-router-dom";
import styled from "styled-components";

const StyledWrapper = styled.div`
    height: 100%;
    width: 100%;
`

export const AuthLayout = ({...props}: AuthLayoutProps) => {
	return (
		<StyledWrapper {...props}>
			<Outlet/>
		</StyledWrapper>
	)
}

type AuthLayoutProps = {} & ComponentProps<"div">