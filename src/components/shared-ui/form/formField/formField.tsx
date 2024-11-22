import {Label} from "../../common/label";
import {Input} from "../../input";
import styled from "styled-components";
import React, {forwardRef, useId} from "react";


const StyledFormField = styled.div`
    display: flex;

    flex-direction: column;

    width: 100%;

    font-size: 24px;
`

const StyledErrorMessage = styled.span`
    box-sizing: border-box;
    color: #ffffff;

    font-size: 14px;
    line-height: 18px;
    min-height: 18px;
    
    padding: 0 2px;
    margin: 0 0 10px 0;
`

interface FormFieldProps extends React.ComponentProps<"input"> {
  labelText?: string;
  errorMessage?: string;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(({labelText, errorMessage, ...props}, ref) => {
  const generatedId = useId();
  const inputId = props.id || generatedId;

  return (
    <StyledFormField>
      {labelText && <Label htmlFor={inputId}>{labelText}</Label>}
      <Input invalid={!!errorMessage} id={inputId} {...props} ref={ref}/>
      <StyledErrorMessage>{errorMessage}</StyledErrorMessage>
    </StyledFormField>
  )
})