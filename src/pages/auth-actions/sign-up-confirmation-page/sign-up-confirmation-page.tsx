import {ComponentProps} from "react";

export const SignUpConfirmationPage = ({...props}: SignUpConfirmationProps) => {
	return (
		<div {...props}>
			<h3>SignUpConfirmation</h3>
		</div>
	)
}

type SignUpConfirmationProps = {} & ComponentProps<"div">