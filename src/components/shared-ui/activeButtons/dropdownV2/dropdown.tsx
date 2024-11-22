import {ComponentProps, RefObject, useCallback, useEffect, useRef, useState} from "react";
import {DropdownContext} from "./dropdownContext.ts";
import {DropdownToggle} from "./dropdownToggle.tsx";
import {DropdownMenu} from "./dropdownMenu.tsx";
import styled from "styled-components";
import {DropdownToggleButton} from "./dropdownToggleButton.tsx";

const StyledWrapper = styled.div`
    position: relative;
    display: inline-block;

    width: 100%;
`

const DropdownComponent = ({disabled, onClose, getProperties, children, ...props}: DropdownProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [toggleRef, setToggleRef] = useState<RefObject<HTMLElement>>()

	const toggle = useCallback((state?: boolean) => {
		if (disabled && !state) {
			setIsOpen(false)
			return;
		}
		setIsOpen(prev => state === undefined ? !prev : state)
	}, [disabled])

	useEffect(() => {
		if (getProperties) {
			getProperties({
				toggle: toggle,
			})
		}
	}, [getProperties, toggle]);

	useEffect(() => {
		if (!isOpen && onClose) onClose()
	}, [isOpen, onClose]);

	useEffect(() => {
		if (disabled) {
			toggle(false)
		}
	}, [disabled, toggle]);

	return (
		<DropdownContext.Provider value={{isOpen, toggle, toggleRef, setToggleRef}}>
			<StyledWrapper {...props} ref={dropdownRef}>
				{children}
			</StyledWrapper>
		</DropdownContext.Provider>
	)
}

type DropdownProps = {
	onClose?: () => void
	disabled?: boolean
	getProperties?: (properties: {
		toggle: (state?: boolean) => void
	}) => void
} & ComponentProps<"div">

export const Dropdown = Object.assign(DropdownComponent, {
	Toggle: DropdownToggle,
	ToggleButton: DropdownToggleButton,
	Menu: DropdownMenu
})