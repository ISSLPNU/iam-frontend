import {ComponentProps, useEffect, useState} from "react";
import {useConfirmSignUp} from "../../../api/hook/user-auth/use-confirm-signUp.tsx";
import {useAuthActionToken} from "../../../hook/use-auth-action-token.tsx";
import {useNavigate} from "react-router-dom";
import {authPages} from "../../auth/auth-routes.tsx";

export const SignUpConfirmationPage = ({...props}: SignUpConfirmationProps) => {
	const navigate = useNavigate();
	const {mutate} = useConfirmSignUp()
	const [message, setMessage] = useState("Mail confirmation...")
	const {token} = useAuthActionToken("token")

	useEffect(() => {
		mutate({token: token}, {
			onSuccess(data) {
				setMessage("Email successfully confirmed")

				setTimeout(() => {
					navigate(authPages.signInPage())
				}, 5000)
			},
			onError(error) {
				console.log(error)
				setMessage("Error occured")
			}
		})
	}, [mutate, navigate, token]);

	return (
		<div {...props}>
			<h3>{message}</h3>
		</div>
	)
}

type SignUpConfirmationProps = {} & ComponentProps<"div">