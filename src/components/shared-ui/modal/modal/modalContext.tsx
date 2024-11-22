import {createContext, useContext} from "react";
import {ModalCloseStatus} from "./modalCloseStatus.ts";

interface ModalContentType<T> {
	receivedValue: T;

	setReceivedValue(value: T): void;

	close(returnValue: T, closeStatus?: ModalCloseStatus): void;

	handleClose(handleFunction: (returnedValue: T, closeStatus: ModalCloseStatus) => void): void;
}

export const ModalContext = createContext<ModalContentType<any> | undefined>(undefined);

export const useModalContext = <T, >() => {
	const context = useContext(ModalContext) as ModalContentType<T> | undefined;
	if (!context) {
		throw new Error('useModalContext must be used within a Modal');
	}
	return context;
}
