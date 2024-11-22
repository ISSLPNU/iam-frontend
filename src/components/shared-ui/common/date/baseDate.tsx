import {ComponentProps} from "react";
import styled from "styled-components";
import {Calendar1Icon} from "../../icons/mainIcons.tsx";
import {dateUtils} from "../../../utils/dateUtils.ts";

const StyledDateContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: min-content;
    gap: 3px;
    font-size: 16px;
    line-height: 1;
    font-family: monospace;
`;

const StyledDataLabel = styled.div`
    display: flex;
    align-items: center;
`;

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    height: calc(1em + 6px);
    width: calc(1em + 6px);

    svg {
        height: 100%;
        width: 100%;
    }
`;

export const BaseDate = ({date, showHours, showIcon, style, children, ...props}: DateProps) => {
	return (
		<StyledDateContainer {...props} style={style}>
			{showIcon && (
				<IconWrapper>
					<Calendar1Icon/>
				</IconWrapper>
			)}
			{children &&
          <StyledDataLabel>
						{children}
          </StyledDataLabel>
			}
			{dateUtils.format(date, showHours)}
		</StyledDateContainer>
	);
};

type DateProps = {
	showHours?: boolean;
	showIcon?: boolean;
	date: Date;
} & ComponentProps<"div">;