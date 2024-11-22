import styled from "styled-components";


export const StyledBaseButton = styled.button`
    box-sizing: border-box;
    position: relative;
    display: flex;

    justify-content: center;
    align-items: center;

    background-color: transparent;

    border: none;

    padding: 5px;

    height: 40px;
    width: 40px;

    border-radius: 5px;

    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: #222222;

        & > svg path {
            fill: #fff;
        }
    }
`

export const StyledSVGPath = styled.path`
    fill: transparent;
    transition: fill ease-in-out .2s;
`