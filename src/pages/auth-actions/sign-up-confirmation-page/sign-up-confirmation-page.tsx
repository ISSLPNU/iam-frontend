import {ComponentProps, useEffect, useState} from "react";
import {useConfirmSignUp} from "../../../api/hook/user-auth/use-confirm-signUp.tsx";
import {useAuthActionToken} from "../../../hook/use-auth-action-token.tsx";
import {useNavigate} from "react-router-dom";
import {authPages} from "../../auth/auth-routes.tsx";
import axios from "axios";
import {toast} from "react-toastify";

export const SignUpConfirmationPage = ({...props}: SignUpConfirmationProps) => {
	const navigate = useNavigate();
	const {mutate} = useConfirmSignUp()
	const [message, setMessage] = useState("Mail confirmation...")
	const {token} = useAuthActionToken("token")

	useEffect(() => {
		mutate({token: token}, {
			onSuccess(data) {
				setMessage("Email successfully confirmed")
				toast.success("Email successfully confirmed")
				setTimeout(() => {
					navigate(authPages.signInPage())
				}, 5000)
			},
			onError: error => {
				setMessage("Error occured")
				if (axios.isAxiosError(error)) {
					if (error.response && !error.response.data.errors && error.response.data.message) {
						toast.error(error.response?.data.message)
					}
				}
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