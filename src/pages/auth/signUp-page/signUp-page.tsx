import {ComponentProps} from "react";
import styled from "styled-components";
import {Button, RouteLink, SimpleForm} from "../../../components/shared-ui";
import {IUserSignUp} from "../../../api/entity/user.ts";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

import * as Yup from "yup";
import {PasswordField} from "../../../components/shared-ui/form/fields/passwordField/passwordField.tsx";
import {InputField} from "../../../components/shared-ui/form/fields/inputField/inputField.tsx";
import {useSignUp} from "../../../api/hook/user-auth/use-signUp.tsx";
import {useNavigate} from "react-router-dom";
import {authPages} from "../auth-routes.tsx";
import axios from "axios";
import {toast} from "react-toastify";

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

    width: 400px;

    padding: 0 20px 20px 20px;
`

export const SignUpPage = (
	{
		disabled,
		...props
	}: SignUpPageProps) => {
	const {handleSubmit, control, formState} = useForm<UserCreateFromType>({
		mode: "onChange",
		resolver: yupResolver(schema),
		disabled: disabled || false,
		defaultValues: {
			firstName: "TestFirstName",
			lastName: "TestSecondName",
			email: "test@example.com",
			password: "Aa1!aaaa",
			repeatPassword: "Aa1!aaaa",
		}
	})
	const navigate = useNavigate();
	const {mutate} = useSignUp()

	const onSubmit: SubmitHandler<UserCreateFromType> = (data) => {
		mutate(data, {
			onSuccess: () => {
				navigate(authPages.user.settings())
				toast.success("You have successfully registered, please check your registration confirmation email")
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

	return (
		<StyledFormWrapper>
			<StyledForm formTitle="Sign Up"
			            onSubmit={handleSubmit(onSubmit)}
			            footerLinks={(
				            <>
					            <RouteLink to={authPages.signInPage()}>Sign In</RouteLink>
				            </>
			            )}
			            {...props}
			>
				<InputField control={control} name="firstName" labelText="First name"/>
				<InputField control={control} name="lastName" labelText="Last name"/>
				<InputField control={control} name="email" labelText="Email"/>
				<PasswordField control={control} name="password" labelText="Password"/>
				<PasswordField control={control} name="repeatPassword" labelText="Repeat Password"/>
				<Button
					disabled={!formState.isValid || disabled}
					themeStyle="success"
					style={{marginTop: "10px"}}
					type="submit"
				>
					Create account
				</Button>
			</StyledForm>
		</StyledFormWrapper>
	)
}

type SignUpPageProps = {
	disabled?: boolean
} & Omit<ComponentProps<"form">, "ref" | "onSubmit" | "children" | "defaultValue">

type UserCreateFromType = {
	repeatPassword: string
} & IUserSignUp

const schema = Yup.object().shape({
	firstName: Yup.string().label("First name")
		.required(),
	lastName: Yup.string().label("Last name")
		.required(),
	email: Yup.string().label("Email")
		.required(),
	password: Yup.string().label("Password").trim()
		.required()
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#\$!?])[a-zA-Z\d#\$!?]{8,}$/,
			"Password must be 8+ chars with upper, lower, number, and special (#$!?)"
		),
	repeatPassword: Yup.string().label("Repeat Password").trim()
		.required()
		.oneOf([Yup.ref('password')], "Your passwords do not match")
})
