import {ComponentProps} from "react";
import {useAuth} from "../../../components/auth/auth-context.tsx";
import styled from "styled-components";
import {SimpleForm} from "../../../components/shared-ui";
import {InputField} from "../../../components/shared-ui/form/fields/inputField/inputField.tsx";
import {IUser} from "../../../api/entity/user.ts";
import * as Yup from "yup";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {TFAField} from "../../../components/shared-ui/form/fields/tfaField/tfaField.tsx";

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

export const AuthUserSettingsPage = ({...props}: AuthUserPageProps) => {
	const {user} = useAuth()

	const {handleSubmit, control} = useForm<UserSettingForm>({
		mode: "onChange",
		resolver: yupResolver(schema),
		disabled: true,
		defaultValues: {
			firstName: user?.firstName || "Unknown",
			lastName: user?.lastName || "Unknown",
			email: user?.email || "Unknown",
			tfaEnabled: false,
		}
	})

	const onSubmit: SubmitHandler<UserSettingForm> = (data) => {
		console.log(data)
	}

	return (
		<StyledFormWrapper>
			<StyledForm formTitle="Settings"
			            onSubmit={handleSubmit(onSubmit)}
			            {...props}
			>
				<InputField disabled control={control} name="firstName" labelText="First Name"/>
				<InputField disabled control={control} name="lastName" labelText="Last Name"/>
				<InputField disabled control={control} name="email" labelText="Email"/>
				<TFAField control={control} name="tfaEnabled"/>
			</StyledForm>
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

