import {ComponentProps, forwardRef, useState} from "react";
import styled from "styled-components";
import {EyeIcon, EyeOffIcon} from "../../../icons/mainIcons.tsx";
import {Input} from "../input/input.tsx";

const StyledWrapper = styled.div`
    position: relative;
		
		width: 100%;
		height: 100%;
`

const StyledPasswordCheckBox = styled.span`
    position: absolute;
    display: flex;

    align-items: center;

    top: 50%;
    right: 5px;

    transform: translateY(-50%);

    height: 20px;
    width: 20px;

    padding: 5px;

    &:hover {
        cursor: pointer;
    }
`

export const Password = forwardRef<HTMLInputElement, PasswordProps>(({...props}, ref) => {
		const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);

		return (
			<StyledWrapper>
				<Input type={isPasswordHidden ? "password" : "text"} {...props} ref={ref}/>
				<StyledPasswordCheckBox
					onClick={() => setIsPasswordHidden(prev => !prev)}
				>
					{isPasswordHidden ? <EyeIcon/> : <EyeOffIcon/>}
				</StyledPasswordCheckBox>
			</StyledWrapper>
		)
	}
)

type PasswordProps = {
	invalid?: boolean
} & ComponentProps<"input">