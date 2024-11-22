import {css} from "styled-components";

export const BaseFormFieldStyled = css`
    box-sizing: border-box;

    width: 100%;
    height: 40px;

    padding: 10px 12px 10px 12px;

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

    .invalid & {
        border-color: red;
    }

    &:disabled {
        background-color: #191919;
        color: #ccc;
    }
`