import {ComponentProps} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {InputField} from "../../../components/shared-ui/form/fields/inputField/inputField.tsx";
import {Button, SimpleForm} from "../../../components/shared-ui";
import {ModalCloseStatus} from "../../../components/shared-ui/modal/modal/modalCloseStatus.ts";
import styled from "styled-components";
import * as Yup from "yup";

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 30vw;
`

const StyledDetailsPart = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const StyledButtonsPart = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
		
    margin: 10px 0 0 0;
`

const StyledModalForm = styled(SimpleForm)`
    width: 100%;
`

export const TFACodeModal = (
	{
		onSubmit,
		close,
		...props
	}: TFACodeModalProps) => {
	const {handleSubmit, control, formState} = useForm<TFAFormType>({
		mode: "onChange",
		resolver: yupResolver(schema),
	})

	return (
		<StyledWrapper {...props}>
			<StyledDetailsPart>
				<h2>Enter TFA Code</h2>
				<div>Check your email and enter the received code</div>
			</StyledDetailsPart>
			<StyledModalForm>
				<InputField type="number" control={control} name="code" labelText="CODE"/>
				<StyledButtonsPart>
					<Button themeStyle="success" onClick={handleSubmit(onSubmit)} disabled={!formState.isValid}>
						Enter
					</Button>
					<Button themeStyle="danger" onClick={() => close(undefined, ModalCloseStatus.CANCELED)}>
						Cancel
					</Button>
				</StyledButtonsPart>
			</StyledModalForm>
		</StyledWrapper>
	)
}

type TFACodeModalProps = {
	onSubmit: SubmitHandler<TFAFormType>
	close: (returnValue: unknown, closeStatus?: ModalCloseStatus) => void
} & Omit<ComponentProps<"div">, "onSubmit">

type TFAFormType = {
	code: number
}

const schema = Yup.object().shape({
	code: Yup.number()
		.typeError("Code must be a number")
		.positive("Code must be a positive number")
		.integer("Code must be an integer")
		.required("TFA code is required")
		.test("len", "Code must be exactly 8 digits", value => {
			return value && value.toString().length === 8 ? true : new Yup.ValidationError("Code must be exactly 8 digits");
		})
});


