import {ComponentProps} from "react";
import styled from "styled-components";
import {IOption} from "../../commonTypes.ts";

const StyledLabel = styled.span<{ $colors: { light?: string, dark?: string } }>`
    background: ${(props) => props.$colors.light || "#00000088"};
    color: ${(props) => props.$colors.dark || "#fff"};

    font-size: 12px;
    line-height: 12px;
    font-weight: 800;
    padding: 6px 8px;
    border-radius: 5px;
    white-space: nowrap;
    letter-spacing: 1px;
`

export const StateLabel = <T extends string, >({state, ...props}: StateLabelProps<T>) => {
	return (
		<StyledLabel {...props} $colors={state?.color || {}}>
			{state?.name || "Unknown"}
		</StyledLabel>
	)
}

type StateLabelProps<T extends string> = {
	state?: IOption<T>
} & ComponentProps<"span">
