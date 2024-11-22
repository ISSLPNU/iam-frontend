import {createContext, RefObject, useContext} from "react";



type ContextType = {
	isOpen: boolean;
	toggle: (state?: boolean) => void;
	toggleRef?: RefObject<HTMLElement>
	setToggleRef(ref: RefObject<HTMLElement>): void
}

export const DropdownContext = createContext<ContextType>({
	isOpen: false,
	toggle: () => {throw new Error("Method not implemented")},
	setToggleRef: () => {throw new Error("Method not implemented")},
})

export const useDropdownContext = () => useContext(DropdownContext)