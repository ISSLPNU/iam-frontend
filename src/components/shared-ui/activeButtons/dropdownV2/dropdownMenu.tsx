import {ComponentProps, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {motion, MotionProps} from "framer-motion";
import {useDropdownContext} from "./dropdownContext.ts";
import {createPortal} from "react-dom";
import {useClickOutside} from "../../../hooks/useClickOutside.tsx";

const StyledMenu = styled(motion.div)`
    box-sizing: border-box;
    display: flex;

    flex-direction: column;

    position: absolute;

    width: max-content;
    height: 0;

    border: 1px solid #000;
    border-radius: 10px;

    background-color: ${({theme}) => theme.colors.main};

    overflow: auto;

    padding: 4px;

    z-index: 1000;
`

const StyledItemsWrapper = styled.div`
    display: flex;
		
		flex-direction: column;
`

export const DropdownMenu = ({children, ...props}: DropdownMenuProps) => {
	const dropdownParent = document.getElementById("dropdown-parent")

	const {isOpen, toggleRef, toggle} = useDropdownContext()
	const menuRef = useRef<HTMLDivElement>(null)
	const itemsWrapperRef = useRef<HTMLDivElement>(null)

	const [maxHeight, setMaxHeight] = useState("max-content")
	const [position, setPosition] = useState({top: 0, left: 0})
	const [toggleWidth, setToggleWidth] = useState(0)
	const [isOverflowing, setIsOverflowing] = useState(false)

	useEffect(() => {
		if (toggleRef?.current && isOpen) {
			const rect = toggleRef.current.getBoundingClientRect()
			setPosition({top: rect.bottom, left: rect.left})
			setToggleWidth(toggleRef.current.offsetWidth)

			const itemsHeight = itemsWrapperRef.current?.offsetHeight || 0

			if (itemsHeight < 400) {
				setIsOverflowing(false)
				setMaxHeight("max-content")
			} else {
				setIsOverflowing(true)
				const height = Math.min((window.innerHeight - rect.bottom) - 10, itemsHeight, 400);
				setMaxHeight(`${height}px`)
			}
		}
	}, [isOpen, toggleRef]);

	useClickOutside(menuRef, {
		ignoreEvents: !isOpen
	}, () => {
		toggle(false)
	})

	return (
		isOpen && dropdownParent && createPortal((
			<StyledMenu {...props}
			            ref={menuRef}
			            style={{
				            ...position,
				            maxHeight: maxHeight,
				            minWidth: toggleWidth,
				            overflow: isOverflowing ? "auto" : "hidden"
			            }}
			            animate={{
				            height: isOpen ? "max-content" : 0,
			            }}
			            transition={{duration: .1}}
			>
				<StyledItemsWrapper ref={itemsWrapperRef}>
					{children}
				</StyledItemsWrapper>
			</StyledMenu>
		), dropdownParent)
	)
}

type DropdownMenuProps = {} & Omit<ComponentProps<"div">, "ref"> & Omit<MotionProps, "animate">