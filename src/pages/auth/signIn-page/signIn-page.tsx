import {ComponentProps} from "react";
import styled from "styled-components";
import {Button, SimpleForm} from "../../../components/shared-ui";
import {IUserSignIn} from "../../../api/entity/user.ts";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

import * as Yup from "yup";
import {InputField} from "../../../components/shared-ui/form/fields/inputField/inputField.tsx";
import {PasswordField} from "../../../components/shared-ui/form/fields/passwordField/passwordField.tsx";

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
			password: "test",
		}
	})

	const onSubmit: SubmitHandler<UserSignInFromType> = (data) => {
		console.log(data)
	}

	return (
		<StyledFormWrapper>
			<StyledForm formTitle="Sign In"
			            onSubmit={handleSubmit(onSubmit)}
			            {...props}
			>
				<InputField control={control} name="email" labelText="Email"/>
				<PasswordField control={control} name="password" labelText="Password"/>
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
