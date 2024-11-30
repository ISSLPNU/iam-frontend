import {ComponentProps} from "react";
import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../auth-context.tsx";

export const RequireAuth = ({...props}: RequireAuthProps) => {
	const {isAuthenticated} = useAuth();

	console.log(isAuthenticated());

	if (!isAuthenticated()) {
		return (
			<Navigate
				to={props.unauthenticatedRedirectPath || "/auth/signIn"}
				replace/>
		)
	}

	return <Outlet/>
}

type RequireAuthProps = {
	unauthenticatedRedirectPath?: string
} & ComponentProps<"div">