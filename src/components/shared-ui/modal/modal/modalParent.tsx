import {ComponentProps, useState} from "react";
import styled from "styled-components";
import {ModalCloseStatus} from "./modalCloseStatus.ts";
import {ModalContext} from "./modalContext.tsx";

const StyledModalParent = styled.div`
    position: absolute;

    display: flex;

    justify-content: center;
    align-items: center;


    top: 0;
    left: 0;

    width: max-content;
    height: max-content;
		
		z-index: 200;
`

export const ModalParent = ({children, ...props}: IModalParentProps) => {
	return (
		<StyledModalParent {...props}>
			{children}
		</StyledModalParent>
	)
}

interface IModalParentProps extends ComponentProps<"div"> {

}

export const ModalProvider = <T, >({children, ...props}: ComponentProps<"div">) => {
	const [receivedValue, setReceivedValue] = useState<T | undefined>(undefined);
	const [handlers, setHandlers] = useState<((returnedValue: T, closeStatus: ModalCloseStatus) => void)[]>([]);

	const handleClose = (onClose: (returnedValue: T, closeStatus: ModalCloseStatus) => void) => {
		setHandlers(prev => [...prev, onClose]);
	};

	const close = (returnedValue: T, closeStatus?: ModalCloseStatus) => {
		handlers.forEach(handler => handler(returnedValue, closeStatus || ModalCloseStatus.CANCELED));
	};

	return (
		<ModalContext.Provider value={{receivedValue, setReceivedValue, close, handleClose}} {...props}>
			{children}
		</ModalContext.Provider>
	);
};