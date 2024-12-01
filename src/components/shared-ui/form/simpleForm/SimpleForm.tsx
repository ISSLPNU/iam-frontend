import styled from "styled-components";
import React, {ComponentProps} from "react";

const StyledForm = styled.form`
    box-sizing: border-box;
    display: flex;

    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    padding: 20px;
    
    border-radius: 20px;

    background-color: #111111;
`

const StyledFormFields = styled.div`
    box-sizing: border-box;
    display: flex;
    
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
`

interface IFormFooterLinksProps{
  flexDirection?: "row" | "column";
}

const StyledFormFooterLinks = styled.div<IFormFooterLinksProps>`
    display: flex;
    
    flex-direction: ${props => props.flexDirection || "column"};
    flex-wrap: nowrap;
    justify-content: center;
    align-items: flex-start;
		
		width: 100%;
`

export const SimpleForm = ({flexDirection, formTitle, footerLinks, children, ...props}: SimpleFormProps) => {
  return (
    <>
      <StyledForm
        {...props}
      >
        {formTitle && (
          <h1>
            {formTitle}
          </h1>
        )}
        <StyledFormFields className="form-fields">
          {children}
        </StyledFormFields>
        <StyledFormFooterLinks flexDirection={flexDirection}>{footerLinks}</StyledFormFooterLinks>
      </StyledForm>
    </>
  )
}

export type SimpleFormProps = {
	formTitle?: string;
	footerLinks?: React.ReactNode;
	children?: React.ReactNode;
} & IFormFooterLinksProps & ComponentProps<"form">
