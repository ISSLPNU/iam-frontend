import {ComponentProps} from "react";
import * as Yup from "yup";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button, RouteLink, SimpleForm} from "../../../components/shared-ui";
import styled from "styled-components";
import {useRestorePassword} from "../../../api/hook/user-auth/use-restore-password.tsx";
import {IUserRestorePasswordRequest} from "../../../api/entity/user.ts";
import {InputField} from "../../../components/shared-ui/form/fields/inputField/inputField.tsx";
import {authPages} from "../../auth/auth-routes.tsx";
import {toast} from "react-toastify";
import axios from "axios";

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


export const PasswordRestorePage = ({...props}: PasswordRestorePageProps) => {
	const {handleSubmit, control, formState} = useForm<UserPasswordRestoreForm>({
		mode: "onChange",
		resolver: yupResolver(schema),
		disabled: false,
		defaultValues: {
			email: "test@example.com",
		}
	})

	const {mutate} = useRestorePassword()

	const onSubmit: SubmitHandler<UserPasswordRestoreForm> = (data) => {
		mutate(data, {
			onSuccess: _ => {
				toast.success("Check your email for further password reset")
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
			<StyledForm formTitle="Restore password"
			            onSubmit={handleSubmit(onSubmit)}
			            footerLinks={(
				            <>
					            <RouteLink to={authPages.signUpPage()}>Sign Up</RouteLink>
					            <RouteLink to={authPages.signInPage()}>Sign In</RouteLink>
				            </>
			            )}
			            {...props}
			>
				<InputField control={control} name="email" labelText="Email"/>
				<Button
					disabled={!formState.isValid}
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

type PasswordRestorePageProps = {} & Omit<ComponentProps<"form">, "ref">

type UserPasswordRestoreForm = {} & IUserRestorePasswordRequest

const schema = Yup.object().shape({
	email: Yup.string().required(),
})