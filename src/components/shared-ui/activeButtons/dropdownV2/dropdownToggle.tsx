import {ComponentProps, useEffect, useRef} from "react";
import {useDropdownContext} from "./dropdownContext.ts";
import styled from "styled-components";

const StyledWrapper = styled.div`
    width: 100%;
		
    //background-color: ${({theme}) => theme.colors.main};
`

export const DropdownToggle = ({children, ...props}: DropdownToggleProps) => {
	const {toggle, setToggleRef} = useDropdownContext()
	const toggleRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setToggleRef(toggleRef);
	}, [setToggleRef, toggleRef])

	return (
		<StyledWrapper {...props}
		     ref={toggleRef}
		     onClick={(e) => {
			     const target = e.target as HTMLElement;
			     if (target.getAttribute('role') !== 'button') {
				     toggle(true);
			     }
		     }}
		>
			{children}
		</StyledWrapper>
	)
}

type DropdownToggleProps = {} & ComponentProps<"div">