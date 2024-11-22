import {ComponentProps, useEffect, useRef} from "react";
import styled from "styled-components";
import {ChevronDownIcon} from "../../icons/mainIcons.tsx";
import {useDropdownContext} from "./dropdownContext.ts";


const StyledWrapper = styled.div`
    width: 100%;
`

const StyledDropdownIcon = styled(ChevronDownIcon)`
	
`

const DropdownButton = styled.button`
    display: flex;

		flex-direction: row;
		justify-content: space-between;
    align-items: center;

    box-sizing: border-box;
    padding: 5px 10px;
    border-radius: 5px;

    width: 100%;

    color: #fff;
    font-size: 18px;

    transition: .2s;

    gap: 5px;

    background: #101010;
    border: none;

		path{
				transition: ease-in-out  .2s;
		}
		
    &:hover {
        color: #0069ff;
        background-color: #0069ff22;
		    
		    path{
				    stroke: #0069ff;
		    }		    
		    // ${StyledDropdownIcon} path{
				//     stroke: #0069ff;
		    // }
    }
`

const StyledButtonMain = styled.div`
    display: flex;

    align-items: center;
    justify-content: flex-start;
		
    width: 100%;
`

const StyledDropdownRightPart = styled.div`
    display: flex;

    flex-direction: row;
    justify-content: center;
    align-items: center;

    min-width: max-content;
`



export const DropdownToggleButton = ({children, hideDropdownIcon, ...props}: DropdownToggleButtonProps) => {
	const {toggle, setToggleRef} = useDropdownContext()
	const toggleRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setToggleRef(toggleRef);
	}, [setToggleRef, toggleRef])

	return (
		<StyledWrapper ref={toggleRef}>
			<DropdownButton type="button"
			                onClick={(e) => {
				                const target = e.target as HTMLElement;
				                if (target.getAttribute('role') !== 'button') {
					                toggle(true);
				                }
			                }}
			                {...props}>
				<StyledButtonMain>
					{children}
				</StyledButtonMain>
				<StyledDropdownRightPart>
					{hideDropdownIcon || <StyledDropdownIcon/>}
				</StyledDropdownRightPart>
			</DropdownButton>
		</StyledWrapper>
	)
}

type DropdownToggleButtonProps = {
	hideDropdownIcon?: boolean;
} & ComponentProps<"button">;