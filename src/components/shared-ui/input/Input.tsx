import styled from "styled-components";
import React, {forwardRef, useState} from "react";

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

interface InputProps extends React.ComponentProps<"input"> {
  invalid?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({invalid, type, ...props}, ref) => {
    const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);

    if (type !== "password") {
      return <StyledInput className={invalid ? "invalid" : ""} type={type} {...props} ref={ref}/>
    }

    return (
      <div style={{position: "relative"}}>
        <StyledInput
          type={type !== "password" ? type : isPasswordHidden ? "password" : "text"}
          className={invalid ? "invalid" : ""}
          {...props}
          ref={ref}
        />
        <StyledPasswordCheckBox
          onClick={() => setIsPasswordHidden(prev => !prev)}
        >
          {/*{isPasswordHidden ? <BsEye/> : <BsEyeSlash/>}*/}
        </StyledPasswordCheckBox>
      </div>
    );
  }
);