import {ComponentProps} from "react";
import styled, {css} from "styled-components";

type ButtonColors = {
	bg: string;
	text: string;
	bgHovered: string;
};

const colors: Record<ButtonsTheme, ButtonColors> = {
	default: {bg: "#181818", text: "#fff", bgHovered: "#080808"},
	primary: {bg: "#38d96333", text: "#38d963", bgHovered: "#38d96355"},
	secondary: {bg: "#38d96333", text: "#38d963", bgHovered: "#38d96355"},
	success: {bg: "#38d96333", text: "#38d963", bgHovered: "#38d96355"},
	warning: {bg: "#deda0033", text: "#deda00", bgHovered: "#deda0055"},
	message: {bg: "#00a8de33", text: "#36aed7", bgHovered: "#00a8de55"},
	danger: {bg: "#f84f4f33", text: "#f84f4f", bgHovered: "#f84f4f55"},
	purple: {bg: "#9900ff33", text: "#b54ff8", bgHovered: "#9900ff55"}
};

const StyledButton = styled.button<{ $stretched?: boolean; $themeStyle: ButtonsTheme }>`
    box-sizing: border-box;

    display: flex;
    align-items: center;
    justify-content: center;

		width: max-content;
    height: 50px;
    max-height: 100%;

    color: ${props => colors[props.$themeStyle]?.text || "#000"};
    background-color: ${props => colors[props.$themeStyle]?.bg || "#fff"};

    border-radius: 10px;
    border: none;

    font-size: 16px;
    font-weight: 600;

    text-align: center;

    transition: ease-in-out 0.2s;

    gap: 4px;

    padding: 5px 30px;

    &:hover:not(:disabled) {
        background-color: ${props => colors[props.$themeStyle]?.bgHovered || "#fff"};
        cursor: pointer;
    }

    &:active:not(:disabled) {
        scale: 0.98;
    }

    &:disabled {
        color: #555555;
        background-color: #202020;
    }

    ${props => props.$stretched && css`
        width: 100%;
    `}
		
		& > svg path {
		    stroke: ${props => colors[props.$themeStyle]?.text || "#000"};
        transition: ease-in-out 0.2s;
    }
`;

export type ButtonsTheme =
	| "default"
	| "primary"
	| "secondary"
	| "success"
	| "warning"
	| "danger"
	| "purple"
	| "message";


export const Button = ({themeStyle, stretched, type, ...props}: IButtonProps) => {
	return (
		<StyledButton type={type || "button"} $stretched={stretched || false}
		              $themeStyle={themeStyle || "default"} {...props} />
	)
}

export type IButtonProps = {
	stretched?: boolean
	themeStyle?: ButtonsTheme
} & ComponentProps<"button">
