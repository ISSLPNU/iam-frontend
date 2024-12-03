import {ComponentProps, useState} from "react";
import styled from "styled-components";
import {Button, RouteLink, SimpleForm} from "../../../components/shared-ui";
import {IUserSignIn} from "../../../api/entity/user.ts";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

import * as Yup from "yup";
import {InputField} from "../../../components/shared-ui/form/fields/inputField/inputField.tsx";
import {PasswordField} from "../../../components/shared-ui/form/fields/passwordField/passwordField.tsx";
import {useSignIn} from "../../../api/hook/user-auth/use-signIn.tsx";
import {useAuth} from "../../../components/auth/auth-context.tsx";
import {useNavigate} from "react-router-dom";
import {authPages} from "../auth-routes.tsx";
import {toast} from "react-toastify";
import axios from "axios";
import {Modal} from "../../../components/shared-ui/modal/modal/modal.tsx";
import {TFACodeModal} from "./tfa-code-modal.tsx";
import {useTwoFactorConfirm} from "../../../api/hook/user-auth/use-two-factor-confirm.tsx";
import ReCAPTCHA from "react-google-recaptcha";


const StyledFormWrapper = styled.div`
    display: flex;

    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
`

const StyledForm = styled(SimpleForm)`
    background: #111111;

    min-width: 400px;
    padding: 0 20px 20px 20px;
`

export const SignInPage = (
	{
		disabled,
		...props
	}: SignInPageProps) => {
	const {handleSubmit, control, formState} = useForm<UserSignInFromType>({
		mode: "onChange",
		resolver: yupResolver(schema),
		disabled: disabled || false,
		defaultValues: {
			email: "test@example.com",
			password: "Aa1!aaaa",
		}
	})
	const [isTFAModalOpen, setIsTFAModalOpen] = useState(false)
	const [tfaToken, setTfaToken] = useState<string | undefined>(undefined)
	const navigate = useNavigate()
	const {mutate: signIn} = useSignIn()
	const {mutate: TFASignIn} = useTwoFactorConfirm()
	const {login} = useAuth()

	const onSubmit: SubmitHandler<UserSignInFromType> = (data) => {
		signIn(data, {
			onSuccess: data => {
				if (data.data.twoFactor) {
					setTfaToken(data.data.token)
					setIsTFAModalOpen(true)
				} else {
					login(data.data.token)
					toast.success("Login successful")
					navigate(authPages.user.settings())
				}
			},
			onError: error => {
				if (axios.isAxiosError(error)) {
					if (error.response && !error.response.data.errors && error.response.data.message) {
						toast.error(error.response?.data.message)
					}
				}
			}
		})
	}

	const onTFAModalSubmit: SubmitHandler<{ code: number }> = (data): void => {
		if (data.code && tfaToken) {
			TFASignIn({
				token: tfaToken,
				secret: data.code
			}, {
				onSuccess: data => {
					login(data.data.token)
					toast.success("Login successful")
					navigate(authPages.user.settings())
				},
				onError: error => {
					if (axios.isAxiosError(error)) {
						if (error.response && !error.response.data.errors && error.response.data.message) {
							toast.error(error.response?.data.message)
						}
					}
				}
			})
		}
	}

	return (
		<>
			<Modal isOpen={isTFAModalOpen}
			       render={(_, close) => <TFACodeModal close={close} onSubmit={onTFAModalSubmit}/>}
			       onClose={() => setIsTFAModalOpen(false)}
			/>
			<StyledFormWrapper>
				<StyledForm formTitle="Sign In"
				            onSubmit={handleSubmit(onSubmit)}
				            footerLinks={(
					            <>
						            <RouteLink to={authPages.signUpPage()}>Sign Up</RouteLink>
						            <RouteLink to={authPages.restorePassword()}>Forgot your password?</RouteLink>
					            </>
				            )}
				            {...props}
				>
					<InputField control={control} name="email" labelText="Email"/>
					<PasswordField control={control} name="password" labelText="Password"/>
					<ReCAPTCHA
						style={{ display: "inline-block" }}
						theme="dark"
						sitekey={"6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
					/>
					<Button
						disabled={!formState.isValid || disabled}
						themeStyle="success"
						style={{marginTop: "10px"}}
						type="submit"
					>
						Sign In
					</Button>
				</StyledForm>
			</StyledFormWrapper>
		</>
	)
}

type SignInPageProps = {
	disabled?: boolean
} & Omit<ComponentProps<"form">, "ref" | "onSubmit" | "children" | "defaultValue">

type UserSignInFromType = {} & IUserSignIn

const schema = Yup.object().shape({
	email: Yup.string().label("Email")
		.required(),
	password: Yup.string().label("Password")
		.required(),
})
