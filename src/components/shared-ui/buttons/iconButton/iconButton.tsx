
import {ComponentProps} from "react";
import styled from "styled-components";

const StyledButton = styled.button`
    box-sizing: border-box;
    position: relative;
    display: flex;

    justify-content: center;
    align-items: center;

    background-color: transparent;
    border: none;
    padding: 0;
    color: #fff;

    height: 100%;
    aspect-ratio: 1/1;

    border-radius: 5px;
    transition: all 0.2s ease-in-out;

    & > svg {
        width: inherit;
        height: inherit;
        
        & path {
            transition: ease-in-out 0.2s;
            filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.75));
        }
    }

    &:active{
        transform: scale(0.9);
    }
    
    &:hover {
        background-color: #ffffff11;

        & > svg path {
            stroke-width: 3px;
            filter: drop-shadow(0 0 10px rgba(0, 0, 0, 1));
        }
    }
`

export const IconButton = ({children, ...props}: IconButtonProps) => {
    return (
        <StyledButton {...props}>
	        {children}
        </StyledButton>
    )
}

type IconButtonProps = {

} & ComponentProps<"button">;

