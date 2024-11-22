import React from "react";
import styled from "styled-components";


const StyledLabel = styled.label`
  font-size: 20px;

  color: #eee;

  align-content: end;
`

export const Label = ({...props}: React.ComponentProps<"label">) => {
  return (
    <StyledLabel {...props}></StyledLabel>
  )
}