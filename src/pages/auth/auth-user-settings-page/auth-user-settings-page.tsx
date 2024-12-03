import {ComponentProps, useCallback, useEffect} from "react";
import {useAuth} from "../../../components/auth/auth-context.tsx";
import styled from "styled-components";
import {Button, SimpleForm} from "../../../components/shared-ui";
import {InputField} from "../../../components/shared-ui/form/fields/inputField/inputField.tsx";
import {IUser} from "../../../api/entity/user.ts";
import * as Yup from "yup";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {TFAField} from "../../../components/shared-ui/form/fields/tfaField/tfaField.tsx";
import {useToggleTFA} from "../../../api/hook/user/use-toggle-tfa.tsx";
import {toast} from "react-toastify";
import axios from "axios";

const StyledFormWrapper = styled.div`
    display: flex;

    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;

    gap: 20px;
`

const StyledForm = styled(SimpleForm)`
    background: #111111;

    min-width: 400px;

    padding: 0 20px 20px 20px;
`

export const AuthUserSettingsPage = ({...props}: AuthUserPageProps) => {
	const {user} = useAuth()

	const {handleSubmit, control, reset, setValue} = useForm<UserSettingForm>({
		mode: "onChange",
		resolver: yupResolver(schema),
		disabled: true,
		defaultValues: {
			tfaEnabled: false,
		}
	})

	useEffect(() => {
		reset(user)
	}, [reset, user])

	const {logout} = useAuth()
	const onSubmit: SubmitHandler<UserSettingForm> = (data) => {
		console.log(data)
	}

	const {toggleTFA} = useToggleTFA()

	const toggleTFAEvent = useCallback((isTFAEnabled: boolean) => {
		toggleTFA(!isTFAEnabled, {
			onSuccess: () => {
				if (isTFAEnabled){
					toast.warning("TFA disabled")
				} else {
					toast.success("TFA enabled")
				}
				setValue("tfaEnabled", !isTFAEnabled)
			},
			onError: error => {
				if (axios.isAxiosError(error)) {
					if (error.response && !error.response.data.errors && error.response.data.message) {
						toast.error(error.response?.data.message)
					}
				}
			}
		})
	}, [toggleTFA])

	return (
		<StyledFormWrapper>
			<StyledForm formTitle="Settings"
			            onSubmit={handleSubmit(onSubmit)}
			            {...props}
			>
				<InputField disabled control={control} name="firstName" labelText="First Name"/>
				<InputField disabled control={control} name="lastName" labelText="Last Name"/>
				<InputField disabled control={control} name="email" labelText="Email"/>
				<TFAField control={control} name="tfaEnabled" onToggleTFA={toggleTFAEvent} />
			</StyledForm>
			<Button themeStyle="message" onClick={logout}>
				Logout
			</Button>
		</StyledFormWrapper>
	)
}

type AuthUserPageProps = {} & Omit<ComponentProps<"form">, "ref" | "onSubmit" | "children" | "defaultValue">


type UserSettingForm = {
	firstName: string;
	lastName: string;
	email: string;
	tfaEnabled: boolean;
} & Partial<IUser>

const schema = Yup.object().shape({
	firstName: Yup.string().required(),
	lastName: Yup.string().required(),
	email: Yup.string().required(),
	tfaEnabled: Yup.boolean().required(),
})

