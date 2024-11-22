import {ComponentProps} from "react";
import styled from "styled-components";
import {SimpleForm} from "../../../components/shared-ui";
import {IUserCreate} from "../../../api/entity/user.ts";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

import * as Yup from "yup";
import {TextAreaField} from "../../../components/shared-ui/form/fields/textAreaField/textAreaField.tsx";
import {authPages} from "../auth-routes.tsx";

const StyledForm = styled(SimpleForm)`
    background: transparent;

    padding: 0;
`

const schema = Yup.object().shape({
	firstName: Yup.string().required(),
	lastName: Yup.string().required(),
	email: Yup.string().required(),
	password: Yup.string().required(),
})

export const SignInPage = <T extends IUserCreate, >(
	{
		onSubmit,
		disabled,
		...props
	}: SignInPageProps<T>) => {
	const {handleSubmit, control, formState} = useForm<IUserCreate>({
		mode: "onChange",
		resolver: yupResolver(schema),
		disabled: disabled || false,
	})


	return (
		<StyledForm onSubmit={handleSubmit(onSubmit as SubmitHandler<IUserCreate>)} {...props}>
			<TextAreaField control={control} name="firstName" labelText="First name"/>
			<TextAreaField control={control} name="lastName" labelText="Last name"/>
			<TextAreaField control={control} name="email" labelText="Email"/>
			<TextAreaField control={control} name="password" labelText="Password"/>
		</StyledForm>
	)
}

type SignInPageProps<T extends IUserCreate> = {
	disabled?: boolean
	onSubmit?: SubmitHandler<T>
} & Omit<ComponentProps<"form">, "ref" | "onSubmit" | "children" | "defaultValue">