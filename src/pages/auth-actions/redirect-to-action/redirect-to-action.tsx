import {ComponentProps} from "react";
import {Navigate} from "react-router-dom";
import {authActionsPages} from "../auth-actions-routes.tsx";
import {useAuthActionToken} from "../../../hook/use-auth-action-token.tsx";

export const RedirectToAction = ({...props}: RedirectToActionProps) => {
	const {actionToken, token} = useAuthActionToken("token")

	return (
		<Navigate to={authActionsPages.getActionPath(actionToken.ACTION, token)} replace {...props}/>
	)
}

type RedirectToActionProps = {} & ComponentProps<"div">