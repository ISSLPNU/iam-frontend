import styled, {css} from "styled-components";
import {ComponentProps} from "react";


const StyledSpan = styled.span<{ $open: boolean }>`
    box-sizing: border-box;
    position: absolute;
    display: block;

    width: 25%;
    height: 25%;

    border-radius: 10px;

    transition: .2s ease-in-out;

    background-color: #d9d9d9;

    &:last-child {
        transform: translateY(-150%);
    }

    &:first-child {
        transform: translateY(150%);
    }

    ${(props) => props.$open && css`
        background-color: #c30000;

        width: 100%;
        height: 20%;


        &:last-child {
            transform: rotate(45deg);
        }

        &:nth-child(2) {
            opacity: 0;
            transform: rotate(-45deg);
        }

        &:first-child {
            transform: rotate(-45deg);
        }
    `}
`;

const StyledSettingButtonSpansWrapper = styled.div`
    position: relative;
    display: flex;
    
    justify-content: center;
    align-items: center;

    height: 85%;
    width: 85%;
`

const StyledSettingButton = styled.div`
    box-sizing: border-box;

    display: flex;
    justify-content: center;
    align-items: center;

    height: 100%;

    margin: 0 5px;

    aspect-ratio: 1/1;

    border-radius: 5px;

    transition: all 0.2s ease;

    &:hover {
        background-color: rgba(55, 55, 55, 0.3);
    }

    &:active {
        transform: scale(0.9);
    }
`;

interface ISettingButtonProps extends ComponentProps<"div"> {
  isOpen: boolean;
}

export const SettingButton = ({isOpen, ...props}: ISettingButtonProps) => {
  return (
    <StyledSettingButton {...props}>
      <StyledSettingButtonSpansWrapper>
        <StyledSpan $open={isOpen}/>
        <StyledSpan $open={isOpen}/>
        <StyledSpan $open={isOpen}/>
      </StyledSettingButtonSpansWrapper>
    </StyledSettingButton>
  );
};
