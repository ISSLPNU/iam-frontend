import {ComponentProps} from "react";

export const TwoFactorPage = ({...props}: TwoFactorProps) => {
	return (
		<div {...props}>
			<h3>TwoFactor</h3>
		</div>
	)
}

type TwoFactorProps = {} & ComponentProps<"div">