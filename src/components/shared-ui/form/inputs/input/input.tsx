import {ComponentProps, forwardRef} from "react";
import styled from "styled-components";

const StyledInput = styled.input<InputProps>`
    box-sizing: border-box;

    width: 100%;
    height: 40px;

    padding: 5px 37px 5px 12px;

    background-color: #202020;
    color: white;

    border: 1px solid transparent;
    border-radius: 10px;

    font-size: 16px;

    transition: ease .2s;

    outline: none;

    &:hover {
        background-color: #080808;
    }

    &:focus {
        outline: none;
        border-color: #0069ff;
        box-shadow: 0 0 0 3px #0069ff22;
        background-color: #080808;
    }

    &.invalid {
        border-color: red;
    }
		
		&:disabled {
        background-color: #080808;
        color: #c0c0c0;
		}
`


export const Input = forwardRef<HTMLInputElement, InputProps>((
	{
		invalid,
		onChange,
		readOnly = false,
		...props
	}, ref) => {
		return (
			<StyledInput
				className={invalid ? "invalid" : ""}
				{...props}
				ref={ref}
				value={props.value ?? ""} // TODO: Think about this
				onChange={(e) => {
					if (!readOnly && onChange){
						onChange(e)
					}
				}}
			/>
		)
	}
)

type InputProps = {
	invalid?: boolean
} & ComponentProps<"input">