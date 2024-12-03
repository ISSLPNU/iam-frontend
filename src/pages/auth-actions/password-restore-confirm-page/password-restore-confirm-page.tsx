import {ComponentProps} from "react";
import {useAuthActionToken} from "../../../hook/use-auth-action-token.tsx";
import {IUserRestorePassword} from "../../../api/entity/user.ts";
import * as Yup from "yup";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {PasswordField} from "../../../components/shared-ui/form/fields/passwordField/passwordField.tsx";
import {Button, SimpleForm} from "../../../components/shared-ui";
import styled from "styled-components";
import {useRestorePasswordConfirm} from "../../../api/hook/user-auth/use-restore-password-confirm.tsx";
import {useNavigate} from "react-router-dom";
import {authPages} from "../../auth/auth-routes.tsx";
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

    min-width: 400px;

    padding: 0 20px 20px 20px;
`

export const PasswordRestoreConfirmPage = (
	{
		disabled,
		...props
	}: PasswordRestoreProps) => {
	const {token} = useAuthActionToken("token")

	const {handleSubmit, control, formState} = useForm<UserPasswordRestoreForm>({
		mode: "onChange",
		resolver: yupResolver(schema),
		disabled: disabled || false,
		defaultValues: {
			token: token,
			password: "Aa1!aaaa",
			repeatPassword: "Aa1!aaaa"
		}
	})
	const navigate = useNavigate();
	const {mutate} = useRestorePasswordConfirm()

	const onSubmit: SubmitHandler<UserPasswordRestoreForm> = (data) => {
		mutate(data, {
			onSuccess: () => {
				navigate(authPages.signInPage())
				toast.success("New password successfully applied")
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
			<StyledForm formTitle="New password"
			            onSubmit={handleSubmit(onSubmit)}
			            {...props}
			>
				<PasswordField control={control} name="password" labelText="Password"/>
				<PasswordField control={control} name="repeatPassword" labelText="Repeat Password"/>
				<Button
					disabled={!formState.isValid || disabled}
					themeStyle="success"
					style={{marginTop: "10px"}}
					type="submit"
				>
					Restore
				</Button>
			</StyledForm>
		</StyledFormWrapper>
	)
}

type PasswordRestoreProps = {
	disabled?: boolean
} & Omit<ComponentProps<"form">, "ref" | "onSubmit" | "children" | "defaultValue">

type UserPasswordRestoreForm = {
	repeatPassword: string
} & IUserRestorePassword

const schema = Yup.object().shape({
	token: Yup.string().required(),
	password: Yup.string().label("Password").trim()
		.required(),
	repeatPassword: Yup.string().label("Repeat Password").trim()
		.required()
		.oneOf([Yup.ref('password')], "Your passwords do not match")
})

